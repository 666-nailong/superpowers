// 云函数：AI 聊天代理
// 通过智谱 GLM-4V-Flash（免费模型）处理文字和图片问答
const cloud = require('wx-server-sdk');
const axios = require('axios');
const fs = require('fs');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 智谱 API 配置
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const API_KEY = process.env.ZHIPU_API_KEY;

// 系统提示词
const SYSTEM_PROMPT = '你是电路分析老师，回答必须遵守以下硬性规则：\n'
  + '【公式规则】绝对禁止任何LaTeX语法。禁止出现\\、$、{、}、frac、pi、Omega、sum、int、sqrt、angle、rightarrow等所有公式标记符号。所有公式用纯文本和四则运算符(+-*/)书写，括号用普通圆括号()。\n'
  + '示例：容抗=1/(2*圆周率*f*C)，感抗=2*圆周率*f*L，阻抗模=根号下(R平方+(XL-XC)平方)，节点电压方程用U1/R1+(U1-U2)/R2=0这种形式。\n'
  + '【单位规则】单位写中文：欧姆、法拉、赫兹、伏特、安培、瓦特、亨利、秒，禁止用Ω、F、Hz、V、A、W、H、s等字母符号。\n'
  + '【格式规则】重点内容用**加粗**，解题步骤用-列表分项，先说电路图结构再分步解题，每步说明用了什么定律，用大一学生能看懂的大白话。';

exports.main = async (event, context) => {
  const { text, imgUrl } = event; // imgUrl 可能是 fileID 或 base64 字符串
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;

  // 1. API Key 检查
  if (!API_KEY) {
    return { code: 500, message: '服务未配置API密钥，请联系管理员' };
  }

  // 2. 每日 50 次限流
  try {
    const today = new Date().toISOString().slice(0, 10);
    const countRes = await db.collection('ai_usage').where({
      openId, date: today
    }).count();
    if (countRes.total >= 50) {
      return { code: 429, message: '今日提问次数已用完（上限50次），明天再来吧' };
    }
  } catch (e) { /* 集合不存在忽略限制 */ }

  // 3. 图片处理：优先从云存储 fileID 下载转 base64，兼容直接传入 base64
  let imageBase64 = '';
  if (imgUrl) {
    if (imgUrl.startsWith('cloud://') || imgUrl.startsWith('wxfile://')) {
      // 云存储 fileID → 云函数内下载 → 转 base64（绕过前端1MB传输限制）
      try {
        const tmpRes = await cloud.downloadFile({ fileID: imgUrl });
        const tmpPath = tmpRes.fileContent; // Buffer
        imageBase64 = tmpPath.toString('base64');
      } catch (e) {
        console.error('[aiChat] downloadFile error:', e.message);
      }
    } else if (imgUrl.startsWith('data:image/') || imgUrl.startsWith('/')) {
      // 已带前缀的 base64 或本地路径
      imageBase64 = imgUrl;
    } else {
      // 裸 base64（无前缀）→ 补前缀
      imageBase64 = 'data:image/jpeg;base64,' + imgUrl;
    }
    // 清洗无效字符
    if (imageBase64) imageBase64 = imageBase64.replace(/[\n\r]/g, '');
  }

  // 4. 构造消息体
  const userContent = imageBase64
    ? [
        { type: 'text', text: text || '请详细分析这张电路图片，给出解题步骤' },
        { type: 'image_url', image_url: { url: imageBase64 } }
      ]
    : text || '请详细分析这张电路图片，给出解题步骤';

  // 5. 调用智谱 API
  try {
    const body = {
      model: 'glm-4v-flash',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent }
      ],
      temperature: 0.3,
      max_tokens: 2048
    };
    const bodySize = JSON.stringify(body).length;
    console.log('[aiChat] request body size:', bodySize, 'bytes, hasImage:', !!imageBase64, 'openId:', openId);

    const response = await axios.post(API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      timeout: 90000,
      maxContentLength: 10 * 1024 * 1024
    });

    const answer = response.data?.choices?.[0]?.message?.content || '';
    if (!answer) {
      return { code: 500, message: 'AI返回为空，请重试' };
    }

    // 6. 记录调用次数
    try {
      await db.collection('ai_usage').add({
        data: { openId, date: new Date().toISOString().slice(0, 10), time: Date.now() }
      });
    } catch (e) { /* 记录失败不影响回答 */ }

    return { code: 0, data: answer };

  } catch (err) {
    // 7. 细化异常分类
    if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
      return { code: 504, message: 'AI服务超时，图片可能过大或网络慢，请重试' };
    }
    if (err.code === 'ERR_NETWORK' || err.message?.includes('Network')) {
      return { code: 502, message: '网络连接失败，请检查云函数网络配置' };
    }
    if (err.response) {
      const status = err.response.status;
      const errData = err.response.data;
      const detail = errData?.error?.message || errData?.message || '';
      if (status === 400) return { code: 400, message: '图片格式或请求有误' + (detail ? '：' + detail : '') };
      if (status === 429) return { code: 429, message: 'AI服务繁忙，请等10秒后再试' };
      if (status === 401) return { code: 401, message: 'API密钥无效，请检查云函数环境变量 ZHIPU_API_KEY' };
      return { code: status, message: 'AI服务错误(' + status + ')' + (detail ? '：' + detail : '') };
    }
    return { code: 500, message: '请求异常：' + (err.message || '未知错误') };
  }
};
