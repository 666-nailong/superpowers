const storage = require('../../utils/storage');
const { findAnswer } = require('../../utils/preset-answers');
const { findInPdfContent } = require('../../utils/local-qa');
const { mdToHtml } = require('../../utils/md-to-html');

Page({
  data: {
    msgList: [], imgList: [], inputValue: '',
    hasApiKey: false, showSettingsPanel: false,
    apiUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    apiKey: '', apiModel: 'GLM-4.6', showKey: false,
    apiSelected: 6, apiCustomUrl: false, canSend: false,
    imgPreview: '', imgFile: '',
    apiOptions: ['DeepSeek','OpenAI','阿里通义千问','硅基流动','百度文心','月之暗面Kimi','智谱GLM-4.6','智谱GLM-4.5-Air','自定义'],
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
    suggestions: ['叠加定理内容？','用三要素法求解一阶电路','解释戴维南定理','串联谐振特点？']
  },
  _busy: false, _retry: 0,

  onShow() {
    const history = storage.getChatHistory();
    const apiKey = wx.getStorageSync('ai_api_key') || '';
    const apiUrl = wx.getStorageSync('ai_api_url') || 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    const apiModel = wx.getStorageSync('ai_api_model') || 'GLM-4.6';
    const apiSelected = wx.getStorageSync('ai_api_selected') || 6;
    this.setData({ msgList: history, hasApiKey: !!apiKey, apiKey, apiUrl, apiModel, apiSelected, apiCustomUrl: apiSelected === 8 });
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
    if (!text) return;
    this.addMsg('user', text);
    this.setData({ inputValue: '', canSend: false });
    this.getAnswer(text);
  },
  sendSuggestion(e) { const text = e.currentTarget.dataset.item; this.addMsg('user', text); this.getAnswer(text); },
  addMsg(role, content) {
    const msg = { id: 'm'+Date.now(), role, content, html: role==='assistant' ? mdToHtml(content) : '', time: this.getTime() };
    const list = [...this.data.msgList, msg];
    this.setData({ msgList: list });
    storage.setChatHistory(list);
  },
  getTime() { return new Date().toLocaleTimeString('zh-CN', { hour:'2-digit', minute:'2-digit' }); },

  // === AI ===
  getAnswer(q) {
    if (this.data.hasApiKey && this.data.apiKey) {
      if (this._busy) { wx.showToast({ title: '⏳ 等待回复', icon:'none' }); return; }
      this.addMsg('assistant', '🤔 思考中...');
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
    const t = setTimeout(() => { this._busy=false; this.updMsg('⚠️ 超时，请重试'); }, 60000);
    wx.request({
      url: this.data.apiUrl, method:'POST',
      header: { 'Content-Type':'application/json', 'Authorization':'Bearer '+this.data.apiKey },
      data: {
        model: this.data.apiModel,
        messages: [{ role:'system', content:'你是全能AI助手。用中文回答，**重点**加粗、- 列表分项、```代码```块。公式用纯文本（U=IR、R=U/I）。回答简洁有条理。' }, { role:'user', content:q }],
        temperature:0.6, max_tokens:1500
      },
      success: (res) => {
        clearTimeout(t);
        if (res.statusCode === 429 && this._retry < 3) {
          this._retry++;
          const w = this._retry * 5000;
          this.updMsg(`⏳ 繁忙，${w/1000}秒后重试...`);
          setTimeout(() => this.reqAI(q), w);
          return;
        }
        this._busy = false;
        let a;
        if (res.statusCode === 429) a = '⚠️ 请求太频繁，等30秒再试。可切到DeepSeek API（免费量大）';
        else if (res.statusCode === 401) a = '⚠️ API Key无效，去⚙️设置中检查';
        else if (res.statusCode !== 200) a = '⚠️ 错误' + res.statusCode + '，可切换其他服务商';
        else if (res.data?.choices?.[0]) a = res.data.choices[0].message.content;
        else a = '⚠️ 返回异常';
        this.updMsg(a);
      },
      fail: (e) => { clearTimeout(t); this._busy = false; this.updMsg('⚠️ 网络错误，检查设置'); }
    });
  },

  updMsg(c) {
    const list = [...this.data.msgList];
    list[list.length-1] = { id:'m'+Date.now(), role:'assistant', content:c, html:mdToHtml(c), time:this.getTime() };
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
    if (preset) this.setData({ apiSelected: idx, apiUrl: preset.path, apiModel: preset.model, apiCustomUrl: idx===8 });
    else this.setData({ apiSelected: idx, apiCustomUrl: idx===8 });
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
