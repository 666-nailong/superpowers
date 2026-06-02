const storage = require('../../utils/storage');
const { findAnswer } = require('../../utils/preset-answers');
const { findInPdfContent } = require('../../utils/local-qa');
const { mdToHtml } = require('../../utils/md-to-html');

Page({
  data: {
    msgList: [], imgList: [], inputValue: '',
    hasApiKey: false, showSettingsPanel: false,
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    apiKey: '', apiModel: 'deepseek-chat', showKey: false,
    apiSelected: 0, apiCustomUrl: false, canSend: false,
    imgPreview: '', imgFile: '',
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
    const history = storage.getChatHistory();
    const apiKey = wx.getStorageSync('ai_api_key') || '';
    const apiUrl = wx.getStorageSync('ai_api_url') || 'https://api.deepseek.com/v1/chat/completions';
    const apiModel = wx.getStorageSync('ai_api_model') || 'deepseek-chat';
    const apiSelected = wx.getStorageSync('ai_api_selected') || 0;
    this.setData({ msgList: history, hasApiKey: !!apiKey, apiKey, apiUrl, apiModel, apiSelected, apiCustomUrl: apiSelected === 9 });
  },

  onInput(e) { const val = e.detail.value; this.setData({ inputValue: val, canSend: !!(val.trim() || this.data.imgFile) }); },

  pickImage() {
    wx.chooseImage({ count: 1, sizeType: ['compressed'],
      success: (res) => { this.setData({ imgPreview: res.tempFilePaths[0], imgFile: res.tempFilePaths[0], canSend: true }); }
    });
  },
  clearImage() { this.setData({ imgPreview: '', imgFile: '', canSend: !!(this.data.inputValue.trim()) }); },

  sendMessage() {
    const text = this.data.inputValue.trim();
    if (!text && !this.data.imgFile) return;
    this.addMsg('user', text || '[图片]');
    if (this.data.imgFile) {
      wx.getFileSystemManager().readFile({ filePath: this.data.imgFile, encoding:'base64', success: (r) => {} }); // 预加载图片
    }
    this.setData({ inputValue: '', imgPreview: '', imgFile: '', canSend: false });
    this.getAnswer(text || '描述一下这张图片中的内容');
  },
  sendSuggestion(e) { const text = e.currentTarget.dataset.item; this.addMsg('user', text); this.getAnswer(text); },
  addMsg(role, content) {
    const id = 'm'+Date.now()+Math.random().toString(36).slice(2,5);
    const msg = { id, role, content, html: role==='assistant' ? (()=>{ try{return mdToHtml(content)}catch(e){return ''} })() : '', time: this.getTime() };
    const list = [...this.data.msgList, msg];
    this.setData({ msgList: list });
    storage.setChatHistory(list);
  },
  getTime() { return new Date().toLocaleTimeString('zh-CN', { hour:'2-digit', minute:'2-digit' }); },

  // === AI ===
  getAnswer(q) {
    if (this.data.hasApiKey && this.data.apiKey) {
      if (this._busy) { wx.showToast({ title: '⏳ 请等待上一条回复', icon:'none' }); return; }
      this.addMsg('assistant', '🧠 思考中...');
      this._busy = true; this._retry = 0;
      this.reqAI(q);
      return;
    }
    this.addMsg('assistant', '🤔 思考中...');
    setTimeout(() => {
      const r = findInPdfContent(q) || findAnswer(q);
      this.updMsg(r || '试试设置API Key启用AI大模型来回答。');
    }, 200);
  },

  reqAI(q) {
    const t = setTimeout(() => { this.doneAI('⚠️ 请求超时，60秒无响应'); }, 60000);
    wx.request({
      url: this.data.apiUrl, method:'POST',
      header: { 'Content-Type':'application/json', 'Authorization':'Bearer '+this.data.apiKey },
      data: {
        model: this.data.apiModel,
        messages: [{ role:'system', content:'你是AI助手。用中文回答，**重点**加粗、- 列表。公式用纯文本（U=IR）。回答简洁。' }, { role:'user', content:q }],
        temperature:0.6, max_tokens:1500
      },
      success: (res) => {
        clearTimeout(t);
        if (res.statusCode === 429 && this._retry < 3) {
          this._retry++;
          const s = this._retry * 10;
          wx.showToast({ title: `繁忙，${s}秒后重试(${this._retry}/3)`, icon:'none', duration:s*1000 });
          setTimeout(() => this.reqAI(q), s * 1000);
          return; // 不更新消息，保持"思考中..."
        }
        this.doneAI(
          res.statusCode === 429 ? '⚠️ 请求太频繁，等1分钟再试。或切换到DeepSeek API（免费额度大）' :
          res.statusCode === 401 ? '⚠️ API Key无效，去⚙️设置中检查' :
          res.statusCode !== 200 ? '⚠️ 错误'+res.statusCode+'，可切换其他服务商' :
          res.data?.choices?.[0] ? res.data.choices[0].message.content :
          '⚠️ 返回异常'
        );
      },
      fail: () => { clearTimeout(t); this.doneAI('⚠️ 网络错误，请检查API地址和Key'); }
    });
  },

  doneAI(c) {
    this._busy = false;
    this.updMsg(c);
  },

  updMsg(c) {
    const list = [...this.data.msgList];
    if (list.length === 0) return;
    const last = list[list.length-1];
    let html = ''; try { html = mdToHtml(c); } catch(e) {}
    list[list.length-1] = { id: last.id, role:'assistant', content:c, html, time:this.getTime() };
    this.setData({ msgList: list });
    storage.setChatHistory(list);
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
    if (preset) this.setData({ apiSelected: idx, apiUrl: preset.path, apiModel: preset.model, apiCustomUrl: idx===9 });
    else this.setData({ apiSelected: idx, apiCustomUrl: idx===9 });
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
    wx.showModal({ title: '清空对话', content: '确定？',
      success: (r) => { if (r.confirm) { this.setData({ msgList: [], imgList: [] }); storage.setChatHistory([]); } }
    });
  },
  showFreeApiGuide() {
    wx.showActionSheet({
      itemList: ['⭐ 智谱AI 注册（推荐）','智谱AI 使用教程','DeepSeek 注册','DeepSeek 使用教程','硅基流动 注册'],
      success: (r) => {
        const urls = [
          'https://open.bigmodel.cn/usercenter/apikeys',
          'https://open.bigmodel.cn/dev/api/native-api/glm-4',
          'https://platform.deepseek.com/api_keys',
          'https://platform.deepseek.com/api-docs',
          'https://cloud.siliconflow.cn'
        ];
        wx.setClipboardData({ data: urls[r.tapIndex], success: () => wx.showToast({ title: '链接已复制', icon:'success' }) });
      }
    });
  }
});
