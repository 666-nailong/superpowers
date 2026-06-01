const storage = require('../../utils/storage');
const { findAnswer } = require('../../utils/preset-answers');

Page({
  data: {
    msgList: [],
    inputValue: '',
    hasApiKey: false,
    showSettingsPanel: false,
    apiUrl: 'https://api.deepseek.com',
    apiKey: '',
    apiModel: 'deepseek-chat',
    showKey: false,
    suggestions: [
      '叠加定理的内容是什么？',
      '怎么用三要素法求解一阶电路？',
      '解释一下戴维南定理',
      '串联谐振有什么特点？',
      'KVL 和 KCL 的本质区别？',
      'Y-Δ等效变换怎么记？'
    ]
  },

  onShow() {
    const history = storage.getChatHistory();
    const apiKey = wx.getStorageSync('ai_api_key') || '';
    const apiUrl = wx.getStorageSync('ai_api_url') || 'https://api.deepseek.com';
    const apiModel = wx.getStorageSync('ai_api_model') || 'deepseek-chat';
    this.setData({
      msgList: history,
      hasApiKey: !!apiKey,
      apiKey, apiUrl, apiModel
    });
  },

  onInput(e) { this.setData({ inputValue: e.detail.value }); },

  sendMessage() {
    const content = this.data.inputValue.trim();
    if (!content) return;
    this.addMessage('user', content);
    this.setData({ inputValue: '' });
    this.getAIResponse(content);
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
    const msg = { id: 'msg_' + Date.now(), role, content, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) };
    const list = [...this.data.msgList, msg];
    this.setData({ msgList: list });
    storage.setChatHistory(list);
  },

  async getAIResponse(question) {
    // 如果有API Key，调用AI接口
    if (this.data.hasApiKey && this.data.apiKey) {
      this.addMessage('assistant', '🤔 思考中...');
      try {
        const answer = await this.callAIAPI(question);
        // 替换"思考中..."消息
        const list = [...this.data.msgList];
        list[list.length - 1] = { id: 'msg_' + Date.now(), role: 'assistant', content: answer, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) };
        this.setData({ msgList: list });
        storage.setChatHistory(list);
      } catch (e) {
        const list = [...this.data.msgList];
        list[list.length - 1] = { id: 'msg_' + Date.now(), role: 'assistant', content: '⚠️ 调用失败：' + (e.errMsg || e.message || '请检查API设置'), time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) };
        this.setData({ msgList: list });
        storage.setChatHistory(list);
      }
      return;
    }

    // 无API Key时使用预置问答库
    wx.showLoading({ title: '思考中...', mask: true });
    setTimeout(() => {
      wx.hideLoading();
      const answer = findAnswer(question);
      this.addMessage('assistant', answer || '🤔 关于"' + question + '"\n\n这是一个很好的问题！目前知识库中还没有直接匹配的答案。\n\n💡 建议设置 API Key 启用AI大模型回答，或换个问法试试。');
    }, 500);
  },

  callAIAPI(question) {
    return new Promise((resolve, reject) => {
      const messages = [
        { role: 'system', content: '你是一个电路分析课程的专业辅导老师。请用中文回答学生的电路分析问题，回答要详细、准确、有条理，可以包含公式推导。' },
        { role: 'user', content: question }
      ];

      wx.request({
        url: this.data.apiUrl + '/v1/chat/completions',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.data.apiKey
        },
        data: {
          model: this.data.apiModel,
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000
        },
        success: (res) => {
          if (res.data && res.data.choices && res.data.choices[0]) {
            resolve(res.data.choices[0].message.content);
          } else if (res.data && res.data.error) {
            reject(new Error(res.data.error.message || JSON.stringify(res.data.error)));
          } else {
            reject(new Error('返回格式异常'));
          }
        },
        fail: (err) => reject(err)
      });
    });
  },

  // 设置面板
  showSettings() { this.setData({ showSettingsPanel: true }); },
  hideSettings() { this.setData({ showSettingsPanel: false }); },
  onApiUrlInput(e) { this.setData({ apiUrl: e.detail.value }); },
  onApiKeyInput(e) { this.setData({ apiKey: e.detail.value }); },
  onApiModelInput(e) { this.setData({ apiModel: e.detail.value }); },
  toggleKeyShow() { this.setData({ showKey: !this.data.showKey }); },

  saveSettings() {
    wx.setStorageSync('ai_api_url', this.data.apiUrl);
    wx.setStorageSync('ai_api_key', this.data.apiKey);
    wx.setStorageSync('ai_api_model', this.data.apiModel);
    this.setData({ hasApiKey: !!this.data.apiKey, showSettingsPanel: false });
    wx.showToast({ title: '设置已保存', icon: 'success' });
  },

  clearApiKey() {
    wx.removeStorageSync('ai_api_key');
    this.setData({ apiKey: '', hasApiKey: false, showSettingsPanel: false });
    wx.showToast({ title: 'API Key 已清除', icon: 'success' });
  }
});
