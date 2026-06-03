// 云函数：AI 聊天代理
// 通过智谱 GLM-4V-Flash（免费模型）处理文字和图片问答
const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 智谱 API 配置
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const API_KEY = process.env.ZHIPU_API_KEY;

// 系统提示词
const SYSTEM_PROMPT = '你是一位专业的大学电路分析老师。请仔细分析用户提供的电路图片和问题，给出清晰、详细的解题步骤。重点说明使用了哪些电路定律（如基尔霍夫定律、戴维南定理、叠加定理等），并解释每一步的计算过程。语言要通俗易懂，适合大一学生理解。如果图片中有电路图，请先描述电路图的结构，再进行分析。用中文回答，**重点**加粗、- 列表。公式用纯文本（U=IR、∑u=0）。';

exports.main = async (event, context) => {
  const { text, imgUrl } = event;
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

  // 3. Base64 前缀自动补齐
  const fullImgUrl = imgUrl && typeof imgUrl === 'string' && !imgUrl.startsWith('data:image/')
    ? 'data:image/jpeg;base64,' + imgUrl
    : imgUrl;

  // 4. 构造消息体
  //    纯文字 → content 传字符串；有图片 → content 传数组（智谱API规范）
  const userContent = fullImgUrl
    ? [
        { type: 'text', text: text || '请详细分析这张电路图片，给出解题步骤' },
        { type: 'image_url', image_url: { url: fullImgUrl } }
      ]
    : text || '请详细分析这张电路图片，给出解题步骤';

  // 5. 调用智谱 API
  try {
    const response = await axios.post(API_URL, {
      model: 'glm-4v-flash',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent }
      ],
      temperature: 0.3,
      max_tokens: 2048
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      timeout: 30000,
      maxContentLength: 10 * 1024 * 1024 // 最大 10MB（防止大图base64超限）
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
