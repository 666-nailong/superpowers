const storage = require('../../utils/storage');
const { findAnswer } = require('../../utils/preset-answers');
const { findInPdfContent } = require('../../utils/local-qa');

Page({
  data: {
    msgList: [], imgList: [], inputValue: '',
    hasApiKey: false, showSettingsPanel: false,
    apiUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    apiKey: '', apiModel: 'GLM-4.6', showKey: false,
    apiSelected: 6, apiCustomUrl: false, canSend: false,
    imgPreview: '', imgFile: '',
    lastRequestTime: 0,
    apiOptions: [
      'DeepSeek', 'OpenAI', '阿里通义千问', '硅基流动',
      '百度文心', '月之暗面Kimi',
      '智谱GLM-4.6', '智谱GLM-4.5-Air', '自定义'
    ],
    apiPresets: {
      'DeepSeek': { path: 'https://api.deepseek.com/v1/chat/completions', model: 'deepseek-chat' },
      'OpenAI': { path: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini' },
      '阿里通义千问': { path: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', model: 'qwen-turbo' },
      '硅基流动': { path: 'https://api.siliconflow.cn/v1/chat/completions', model: 'Qwen/Qwen2.5-7B-Instruct' },
      '百度文心': { path: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions', model: 'ernie-3.5-8k' },
      '月之暗面Kimi': { path: 'https://api.moonshot.cn/v1/chat/completions', model: 'moonshot-v1-8k' },
      '智谱GLM-4.6': { path: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', model: 'GLM-4.6' },
      '智谱GLM-4.5-Air': { path: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', model: 'GLM-4.5-Air' }
    },
    suggestions: [
      '叠加定理的内容是什么？', '用三要素法求解一阶电路',
      '解释戴维南定理', '串联谐振有什么特点？'
    ]
  },

  onShow() {
    const history = storage.getChatHistory();
    const apiKey = wx.getStorageSync('ai_api_key') || '';
    const apiUrl = wx.getStorageSync('ai_api_url') || 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    const apiModel = wx.getStorageSync('ai_api_model') || 'GLM-4.6';
    const apiSelected = wx.getStorageSync('ai_api_selected') || 6;
    this.setData({
      msgList: history, hasApiKey: !!apiKey,
      apiKey, apiUrl, apiModel, apiSelected,
      apiCustomUrl: apiSelected === 8
    });
  },

  onInput(e) {
    const val = e.detail.value;
    this.setData({ inputValue: val, canSend: !!(val.trim() || this.data.imgFile) });
  },

  // ===== 图片上传 =====
  pickImage() {
    wx.chooseImage({
      count: 1, sizeType: ['compressed'],
      success: (res) => {
        const path = res.tempFilePaths[0];
        this.setData({ imgPreview: path, imgFile: path, canSend: true });
      }
    });
  },

  clearImage() { this.setData({ imgPreview: '', imgFile: '', canSend: !!(this.data.inputValue.trim()) }); },

  // ===== 发送 =====
  sendMessage() {
    const text = this.data.inputValue.trim();
    const img = this.data.imgFile;
    if (!text && !img) return;

    if (text) this.addMessage('user', text);
    if (img) {
      const imgList = [...this.data.imgList, { id: 'img_' + Date.now(), src: img, text: text || '', time: this.getTime() }];
      this.setData({ imgList });
    }
    this.setData({ inputValue: '', imgPreview: '', imgFile: '', canSend: false });
    this.getAIResponse(text || '这张图片中有什么？');
  },

  sendSuggestion(e) {
    const text = e.currentTarget.dataset.item;
    this.sendMessageWithText(text);
  },

  sendMessageWithText(text) {
    this.addMessage('user', text);
    this.getAIResponse(text);
  },

  addMessage(role, content) {
    const msg = { id: 'msg_' + Date.now(), role, content, time: this.getTime() };
    const list = [...this.data.msgList, msg];
    this.setData({ msgList: list });
    storage.setChatHistory(list);
  },

  getTime() { return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }); },

  // ===== AI响应 =====
  async getAIResponse(question) {
    // 限流：每2秒最多1次请求
    const now = Date.now();
    if (now - this.data.lastRequestTime < 2000) {
      await new Promise(r => setTimeout(r, 2000 - (now - this.data.lastRequestTime)));
    }

    if (this.data.hasApiKey && this.data.apiKey) {
      this.addMessage('assistant', '🤔 思考中...');
      try {
        const answer = await this.callAIAPI(question);
        const list = [...this.data.msgList];
        list[list.length - 1] = { id: 'msg_' + Date.now(), role: 'assistant', content: answer, time: this.getTime() };
        this.setData({ msgList: list, lastRequestTime: Date.now() });
        storage.setChatHistory(list);
      } catch (e) {
        const list = [...this.data.msgList];
        list[list.length - 1] = { id: 'msg_' + Date.now(), role: 'assistant', content: '⚠️ ' + (e.message || '调用失败'), time: this.getTime() };
        this.setData({ msgList: list });
        storage.setChatHistory(list);
      }
      return;
    }

    // 无API Key用本地问答
    this.addMessage('assistant', '🤔 思考中...');
    setTimeout(() => {
      const pdfAnswer = findInPdfContent(question);
      if (pdfAnswer) { this.updateLastMsg(pdfAnswer); return; }
      const presetAnswer = findAnswer(question);
      if (presetAnswer) { this.updateLastMsg(presetAnswer); return; }
      this.updateLastMsg('这个问题我暂时没有现成答案。试试设置API Key启用AI大模型来回答。');
    }, 300);
  },

  updateLastMsg(content) {
    const list = [...this.data.msgList];
    list[list.length - 1] = { id: 'msg_' + Date.now(), role: 'assistant', content, time: this.getTime() };
    this.setData({ msgList: list });
    storage.setChatHistory(list);
  },

  callAIAPI(question) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('请求超时')), 45000);
      wx.request({
        url: this.data.apiUrl,
        method: 'POST',
        header: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.data.apiKey },
        data: {
          model: this.data.apiModel,
          messages: [
            { role: 'system', content: '你是全能AI助手，擅长电路分析但不限于此。可以用中文回答任何问题。公式用纯文本（如U=IR、∑u=0、P=UI·cosφ）。不要用LaTeX或Markdown格式。' },
            { role: 'user', content: question }
          ],
          temperature: 0.8, max_tokens: 2000
        },
        success: (res) => {
          clearTimeout(timer);
          if (res.statusCode === 429) reject(new Error('请求频繁，等几秒再试'));
          else if (res.statusCode === 401 || res.statusCode === 403) reject(new Error('API Key无效'));
          else if (res.statusCode !== 200) reject(new Error('错误码' + res.statusCode));
          else if (res.data?.choices?.[0]) resolve(res.data.choices[0].message.content);
          else if (res.data?.error) reject(new Error(res.data.error.message || 'API错误'));
          else reject(new Error('返回格式异常'));
        },
        fail: (err) => { clearTimeout(timer); reject(err); }
      });
    });
  },

  // ===== 设置面板 =====
  showSettings() { this.setData({ showSettingsPanel: true }); },
  hideSettings() { this.setData({ showSettingsPanel: false }); },
  onApiUrlInput(e) { this.setData({ apiUrl: e.detail.value }); },
  onApiKeyInput(e) { this.setData({ apiKey: e.detail.value }); },
  onApiModelInput(e) { this.setData({ apiModel: e.detail.value }); },
  toggleKeyShow() { this.setData({ showKey: !this.data.showKey }); },

  onApiSelect(e) {
    const idx = parseInt(e.detail.value);
    const name = this.data.apiOptions[idx];
    const preset = this.data.apiPresets[name];
    const isCustom = idx === 8;
    if (preset) this.setData({ apiSelected: idx, apiUrl: preset.path, apiModel: preset.model, apiCustomUrl: isCustom });
    else this.setData({ apiSelected: idx, apiCustomUrl: isCustom });
  },

  saveSettings() {
    wx.setStorageSync('ai_api_url', this.data.apiUrl);
    wx.setStorageSync('ai_api_key', this.data.apiKey);
    wx.setStorageSync('ai_api_model', this.data.apiModel);
    wx.setStorageSync('ai_api_selected', this.data.apiSelected);
    this.setData({ hasApiKey: !!this.data.apiKey, showSettingsPanel: false });
    wx.showToast({ title: '已保存', icon: 'success' });
  },

  clearApiKey() {
    wx.removeStorageSync('ai_api_key');
    this.setData({ apiKey: '', hasApiKey: false, showSettingsPanel: false });
    wx.showToast({ title: 'API Key已清除', icon: 'success' });
  },

  clearChat() {
    wx.showModal({
      title: '清空对话',
      content: '确定清空所有聊天记录？',
      success: (r) => {
        if (r.confirm) {
          this.setData({ msgList: [], imgList: [] });
          storage.setChatHistory([]);
        }
      }
    });
  },

  showFreeApiGuide() {
    const links = [
      { name: '⭐ 智谱AI（推荐）', url: 'https://open.bigmodel.cn/usercenter/apikeys' },
      { name: 'DeepSeek', url: 'https://platform.deepseek.com/api_keys' },
      { name: '硅基流动', url: 'https://cloud.siliconflow.cn' },
      { name: '阿里通义千问', url: 'https://bailian.console.aliyun.com/?tab=model#/model-market' }
    ];
    wx.showActionSheet({
      itemList: links.map(l => l.name + ' - 复制链接'),
      success: (r) => {
        const link = links[r.tapIndex];
        wx.setClipboardData({
          data: link.url,
          success: () => wx.showToast({ title: link.name + ' 链接已复制', icon: 'success' })
        });
      }
    });
  }
});
