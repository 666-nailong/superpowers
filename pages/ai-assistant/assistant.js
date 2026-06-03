const storage = require('../../utils/storage');
const { findAnswer } = require('../../utils/preset-answers');
const { findInPdfContent } = require('../../utils/local-qa');
const { mdToHtml } = require('../../utils/md-to-html');

Page({
  data: {
    msgList: [], inputValue: '',
    hasApiKey: false, showSettingsPanel: false,
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    apiKey: '', apiModel: 'deepseek-chat', showKey: false,
    apiSelected: 0, apiCustomUrl: false,
    apiOptions: ['DeepSeek（推荐⭐）','智谱GLM-4-Flash（免费不限速）','硅基流动（多模型聚合）','智谱GLM-4.6','智谱GLM-4.5-Air','阿里通义千问','OpenAI','百度文心','月之暗面Kimi','自定义'],
    apiPresets: {
      'DeepSeek（推荐⭐）': { path: 'https://api.deepseek.com/v1/chat/completions', model: 'deepseek-chat' },
      '智谱GLM-4-Flash（免费不限速）': { path: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', model: 'GLM-4-Flash' },
      '硅基流动（多模型聚合）': { path: 'https://api.siliconflow.cn/v1/chat/completions', model: 'deepseek-ai/DeepSeek-V3' },
      '智谱GLM-4.6': { path: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', model: 'GLM-4.6' },
      '智谱GLM-4.5-Air': { path: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', model: 'GLM-4.5-Air' },
      '阿里通义千问': { path: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', model: 'qwen-turbo' },
      'OpenAI': { path: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini' },
      '百度文心': { path: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions', model: 'ernie-3.5-8k' },
      '月之暗面Kimi': { path: 'https://api.moonshot.cn/v1/chat/completions', model: 'moonshot-v1-8k' }
    },
    suggestions: ['叠加定理内容？','用三要素法求解一阶电路','解释戴维南定理','串联谐振特点？']
  },
  _busy: false, _retry: 0,

  onShow() {
    this.setData({
      msgList: storage.getChatHistory(),
      hasApiKey: !!wx.getStorageSync('ai_api_key'),
      apiKey: wx.getStorageSync('ai_api_key') || '',
      apiUrl: wx.getStorageSync('ai_api_url') || 'https://api.deepseek.com/v1/chat/completions',
      apiModel: wx.getStorageSync('ai_api_model') || 'deepseek-chat',
      apiSelected: wx.getStorageSync('ai_api_selected') || 0,
      apiCustomUrl: (wx.getStorageSync('ai_api_selected') || 0) === 9
    });
  },

  onInput(e) { this.setData({ inputValue: e.detail.value }); },

  sendMessage() {
    const text = this.data.inputValue.trim();
    if (!text) return;
    this.pushMsg('user', text);
    this.setData({ inputValue: '' });
    this.getAnswer(text);
  },

  sendSuggestion(e) {
    const text = e.currentTarget.dataset.item;
    this.pushMsg('user', text);
    this.getAnswer(text);
  },

  pushMsg(role, content) {
    const id = 'm' + Date.now() + Math.random().toString(36).slice(2,6);
    let html = '';
    if (role === 'assistant') try { html = mdToHtml(content); } catch(e) {}
    const msgs = [...this.data.msgList, { id, role, content, html, time: this.now() }];
    this.setData({ msgList: msgs });
    storage.setChatHistory(msgs);
  },

  now() { return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }); },

  // === AI ===
  getAnswer(q) {
    if (this.data.hasApiKey && this.data.apiKey) {
      if (this._busy) { wx.showToast({ title: '⏳ 请等待上一条回复', icon: 'none' }); return; }
      this.pushMsg('assistant', '🧠 思考中...');
      this._busy = true; this._retry = 0;
      this.reqAI(q);
      return;
    }
    this.pushMsg('assistant', '🤔 思考中...');
    setTimeout(() => {
      const r = findInPdfContent(q) || findAnswer(q) || '试试设置API Key启用AI大模型来回答。';
      this.updMsg(r);
    }, 200);
  },

  reqAI(q) {
    const timer = setTimeout(() => { this._busy = false; this.updMsg('⚠️ 请求超时'); }, 60000);
    wx.request({
      url: this.data.apiUrl, method: 'POST',
      header: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.data.apiKey },
      data: {
        model: this.data.apiModel,
        messages: [{ role: 'system', content: '你是AI助手。用中文回答，**重点**加粗、- 列表。公式用纯文本（U=IR）。回答简洁。' }, { role: 'user', content: q }],
        temperature: 0.6, max_tokens: 1500
      },
      success: (res) => {
        clearTimeout(timer);
        if (res.statusCode === 429 && this._retry < 3) {
          this._retry++;
          const s = this._retry * 10;
          wx.showToast({ title: `繁忙，${s}秒后重试(${this._retry}/3)`, icon: 'none', duration: s * 1000 });
          setTimeout(() => this.reqAI(q), s * 1000);
          return;
        }
        this._busy = false;
        this.updMsg(
          res.statusCode === 429 ? '⚠️ 太频繁，等1分钟再试。或切换到DeepSeek' :
          res.statusCode === 401 ? '⚠️ API Key无效，去⚙️设置中检查' :
          res.statusCode !== 200 ? '⚠️ 错误' + res.statusCode + '，可切换其他服务商' :
          res.data?.choices?.[0] ? res.data.choices[0].message.content :
          '⚠️ 返回异常'
        );
      },
      fail: () => { clearTimeout(timer); this._busy = false; this.updMsg('⚠️ 网络错误'); }
    });
  },

  updMsg(c) {
    const msgs = [...this.data.msgList];
    if (msgs.length === 0) return;
    const last = msgs[msgs.length - 1];
    let html = '';
    try { html = mdToHtml(c); } catch(e) {}
    msgs[msgs.length - 1] = { id: last.id, role: 'assistant', content: c, html, time: this.now() };
    this.setData({ msgList: msgs });
    storage.setChatHistory(msgs);
  },

  // === 设置 ===
  showSettings() { this.setData({ showSettingsPanel: true }); },
  hideSettings() { this.setData({ showSettingsPanel: false }); },
  onApiUrlInput(e) { this.setData({ apiUrl: e.detail.value }); },
  onApiKeyInput(e) { this.setData({ apiKey: e.detail.value }); },
  onApiModelInput(e) { this.setData({ apiModel: e.detail.value }); },
  toggleKeyShow() { this.setData({ showKey: !this.data.showKey }); },
  onApiSelect(e) {
    const idx = parseInt(e.detail.value);
    const preset = this.data.apiPresets[this.data.apiOptions[idx]];
    if (preset) this.setData({ apiSelected: idx, apiUrl: preset.path, apiModel: preset.model, apiCustomUrl: idx === 9 });
    else this.setData({ apiSelected: idx, apiCustomUrl: idx === 9 });
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
    wx.showToast({ title: 'Key已清除', icon: 'success' });
  },
  clearChat() {
    wx.showModal({
      title: '清空对话', content: '确定？',
      success: (r) => { if (r.confirm) { this.setData({ msgList: [] }); storage.setChatHistory([]); } }
    });
  },
  showFreeApiGuide() {
    wx.showActionSheet({
      itemList: ['⭐ 智谱AI 注册（推荐）', '智谱AI 使用教程', 'DeepSeek 注册', 'DeepSeek 使用教程', '硅基流动 注册'],
      success: (r) => {
        const urls = [
          'https://open.bigmodel.cn/usercenter/apikeys',
          'https://open.bigmodel.cn/dev/api/native-api/glm-4',
          'https://platform.deepseek.com/api_keys',
          'https://platform.deepseek.com/api-docs',
          'https://cloud.siliconflow.cn'
        ];
        wx.setClipboardData({ data: urls[r.tapIndex], success: () => wx.showToast({ title: '链接已复制', icon: 'success' }) });
      }
    });
  }
});
