// 云函数：AI 聊天代理
// 通过智谱 GLM-4V-Flash（免费模型）处理文字和图片问答
const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 智谱 API 配置
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const API_KEY = process.env.ZHIPU_API_KEY; // 在云环境变量中设置

// 系统提示词（固定）
const SYSTEM_PROMPT = '你是一位专业的大学电路分析老师。请仔细分析用户提供的电路图片和问题，给出清晰、详细的解题步骤。重点说明使用了哪些电路定律（如基尔霍夫定律、戴维南定理、叠加定理等），并解释每一步的计算过程。语言要通俗易懂，适合大一学生理解。如果图片中有电路图，请先描述电路图的结构，再进行分析。用中文回答，**重点**加粗、- 列表。公式用纯文本（U=IR、∑u=0）。';

exports.main = async (event, context) => {
  const { text, imgUrl } = event;
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;

  // 1. 检查 API Key 是否配置
  if (!API_KEY) {
    return { code: 500, message: '服务未配置API密钥，请联系管理员' };
  }

  // 2. 频率限制：每用户每天最多 50 次
  try {
    const today = new Date().toISOString().slice(0, 10);
    const countRes = await db.collection('ai_usage').where({
      openId, date: today
    }).count();
    if (countRes.total >= 50) {
      return { code: 429, message: '今日提问次数已用完（上限50次），明天再来吧' };
    }
  } catch (e) {
    // 集合不存在时忽略限制
  }

  // 3. base64 前缀自动补齐（前端直接传原始base64，没有data:image前缀）
  if (imgUrl && typeof imgUrl === 'string' && !imgUrl.startsWith('data:image/')) {
    imgUrl = 'data:image/jpeg;base64,' + imgUrl;
  }

  // 4. 构造消息体（统一用数组格式，智谱API支持）
  const userContent = [];
  if (text) userContent.push({ type: 'text', text });
  if (imgUrl) userContent.push({ type: 'image_url', image_url: { url: imgUrl } });
  if (userContent.length === 0) userContent.push({ type: 'text', text: '请详细分析这张电路图片，给出解题步骤' });

  // 4. 调用智谱 API
  try {
    const response = await axios.post(API_URL, {
      model: 'glm-4v-flash',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent } // 修复：直接传数组，不再判断长度
      ],
      temperature: 0.3,
      max_tokens: 2048
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      timeout: 30000
    });

    const answer = response.data?.choices?.[0]?.message?.content || '';
    if (!answer) {
      return { code: 500, message: 'AI返回为空，请重试' };
    }

    // 5. 记录调用次数
    try {
      await db.collection('ai_usage').add({
        data: { openId, date: new Date().toISOString().slice(0, 10), time: Date.now() }
      });
    } catch (e) { /* 记录失败不影响回答 */ }

    return { code: 0, data: answer };

  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      return { code: 504, message: 'AI服务超时，请稍后重试' };
    }
    if (err.response) {
      const status = err.response.status;
      if (status === 429) return { code: 429, message: 'AI服务繁忙，请等10秒后再试' };
      if (status === 401) return { code: 401, message: 'API密钥无效，请联系管理员' };
      return { code: status, message: `AI服务错误(${status})` };
    }
    return { code: 500, message: '网络错误，请检查网络后重试' };
  }
};
