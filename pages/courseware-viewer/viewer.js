const storage = require('../../utils/storage');
const { findInPdfContent } = require('../../utils/local-qa');
const { getPageImageUrl } = require('../../utils/pdf-content');
const { mdToHtml } = require('../../utils/md-to-html');

const pageCounts = { ch01_01:47, ch01_02:78, ch02_01:42, ch03_01:60, ch04_01:55, ch05_01:63, ch06_01:42, ch07_01:35, ch08_01:82 };
function getPageCount(fileId) { return pageCounts[fileId] || 0; }

Page({
  data: {
    fileId: '',
    title: '课件',
    currentPage: 1,
    totalPages: 1,
    currentIndex: 0,
    pageList: [],
    annCount: 0,
    showAnnPanel: false,
    allAnnotations: [],
    fullScreen: false,
    fullScreenSrc: '',
    showAIChat: false, aiMsgs: [], aiInputVal: ''
  },

  onLoad(options) {
    const fileId = options.fileId || '';
    const title = decodeURIComponent(options.title || '课件');
    const totalPages = getPageCount(fileId) || 1;
    const pageList = [];
    for (let i = 1; i <= totalPages; i++) {
      pageList.push({ page: i, src: getPageImageUrl(fileId, i), loaded: false });
    }
    this.setData({ fileId, title, totalPages, pageList, currentPage: 1, currentIndex: 0 });
    this.loadAnnCount();
  },

  onImgLoad(e) {
    const idx = e.currentTarget.dataset.index;
    if (idx === undefined) return;
    this.setData({ [`pageList[${idx}].loaded`]: true });
  },

  onSwiperChange(e) {
    this.setData({ currentPage: e.detail.current + 1, currentIndex: e.detail.current });
  },

  // ===== 批注计数 =====
  loadAnnCount() {
    const allAnn = storage.getAnnotations();
    let total = 0;
    for (const k in allAnn) {
      if (k.startsWith(this.data.fileId + '_')) {
        total += (allAnn[k].annotations || []).length;
      }
    }
    this.setData({ annCount: total });
  },

  // ===== 添加批注（微信原生弹窗） =====
  addAnnotation() {
    wx.showModal({
      title: '添加批注 - 第' + this.data.currentPage + '页',
      editable: true,
      placeholderText: '输入批注内容...',
      success: (res) => {
        if (res.confirm && res.content && res.content.trim()) {
          this.saveAnnotation(res.content.trim());
        }
      }
    });
  },

  saveAnnotation(content) {
    const key = `${this.data.fileId}_${this.data.currentPage}`;
    const allAnn = storage.getAnnotations();
    if (!allAnn[key]) {
      allAnn[key] = { fileId: this.data.fileId, pageNum: this.data.currentPage, annotations: [] };
    }
    allAnn[key].annotations.push({
      id: 'ann_' + Date.now(),
      userId: 'default_user',
      userName: '匿名同学',
      content,
      pageNum: this.data.currentPage,
      createdAt: Date.now(),
      likes: 0,
      likedBy: [],
      replies: []
    });
    storage.setAnnotations(allAnn);
    const myAnn = storage.getMyAnnotations();
    myAnn.push({ annotationId: 'ann_' + Date.now(), fileId: this.data.fileId, pageNum: this.data.currentPage, content, createdAt: Date.now() });
    storage.setMyAnnotations(myAnn);
    wx.showToast({ title: '批注已添加', icon: 'success' });
    this.loadAnnCount();
    if (this.data.showAnnPanel) this.loadAllAnnotations();
  },

  // ===== 批注列表 =====
  showAnnList() {
    this.setData({ showAnnPanel: true });
    this.loadAllAnnotations();
  },

  closeAnnPanel() {
    this.setData({ showAnnPanel: false });
  },

  loadAllAnnotations() {
    const allAnn = storage.getAnnotations();
    const all = [];
    for (const k in allAnn) {
      if (k.startsWith(this.data.fileId + '_')) {
        const anns = allAnn[k].annotations || [];
        anns.forEach(a => {
          all.push({
            ...a,
            time: new Date(a.createdAt).toLocaleDateString('zh-CN'),
            liked: (a.likedBy || []).includes('default_user'),
            replies: (a.replies || []).map(r => ({
              ...r,
              time: new Date(r.createdAt).toLocaleDateString('zh-CN')
            }))
          });
        });
      }
    }
    all.sort((a, b) => b.createdAt - a.createdAt);
    this.setData({ allAnnotations: all, annCount: all.length });
  },

  // ===== 点赞 =====
  likeAnnotation(e) {
    const { id, page } = e.currentTarget.dataset;
    const key = `${this.data.fileId}_${page || this.data.currentPage}`;
    const allAnn = storage.getAnnotations();
    const anns = allAnn[key];
    if (!anns) return;
    const target = anns.annotations.find(a => a.id === id);
    if (!target) return;
    if ((target.likedBy || []).includes('default_user')) {
      target.likedBy = target.likedBy.filter(u => u !== 'default_user');
      target.likes = Math.max(0, target.likes - 1);
    } else {
      if (!target.likedBy) target.likedBy = [];
      target.likedBy.push('default_user');
      target.likes++;
    }
    storage.setAnnotations(allAnn);
    this.loadAllAnnotations();
  },

  // ===== 回复（微信原生弹窗） =====
  replyAnnotation(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '回复批注',
      editable: true,
      placeholderText: '输入回复内容...',
      success: (res) => {
        if (res.confirm && res.content && res.content.trim()) {
          this.saveReply(id, res.content.trim());
        }
      }
    });
  },

  saveReply(annId, content) {
    const allAnn = storage.getAnnotations();
    for (const k in allAnn) {
      const target = (allAnn[k].annotations || []).find(a => a.id === annId);
      if (target) {
        if (!target.replies) target.replies = [];
        target.replies.push({
          id: 'rep_' + Date.now(),
          userId: 'default_user',
          userName: '匿名同学',
          content,
          createdAt: Date.now(),
          likes: 0
        });
        storage.setAnnotations(allAnn);
        wx.showToast({ title: '回复成功', icon: 'success' });
        this.loadAllAnnotations();
        return;
      }
    }
    wx.showToast({ title: '批注不存在', icon: 'none' });
  },

  // ===== AI 内联聊天 =====
  toggleAIChat() { this.setData({ showAIChat: !this.data.showAIChat, aiInputVal: '' }); if (!this.data.showAIChat) this.setData({ aiMsgs: [] }); },
  onAiInput(e) { this.setData({ aiInputVal: e.detail.value }); },
  aiSendSuggestion(e) { this.aiSendText(e.currentTarget.dataset.q); },
  aiSendMessage() { const t = this.data.aiInputVal.trim(); if (t) this.aiSendText(t); },

  aiSendText(text) {
    const thinkingId = 'think_' + Date.now();
    this.setData({ aiMsgs: [...this.data.aiMsgs, { id: 'u'+Date.now(), role: 'user', content: text }, { id: thinkingId, role: 'ai', content: '🤔 思考中...' }], aiInputVal: '' });
    const apiKey = wx.getStorageSync('ai_api_key') || '';
    if (apiKey) this.aiCall2(text, thinkingId);
    else this.usePreset2(text, thinkingId);
  },

  _busy: false, _retry: 0, _lastReq: 0,
  aiCall2(question, thinkingId) {
    const u = wx.getStorageSync('ai_api_url') || 'https://api.deepseek.com/v1/chat/completions';
    const k = wx.getStorageSync('ai_api_key') || '';
    const m = wx.getStorageSync('ai_api_model') || 'deepseek-chat';
    if (!k) { this.usePreset2(question, thinkingId); return; }
    if (this._busy) { wx.showToast({ title: '⏳ 等待回复', icon:'none' }); return; }
    this._busy = true; this._retry = 0;
    const delay = Math.max(0, 3000 - (Date.now() - this._lastReq));
    setTimeout(() => this.doReq(u, k, m, question, thinkingId), delay);
  },

  doReq(u, k, m, q, tid) {
    const timer = setTimeout(() => { this._busy = false; this._lastReq = Date.now(); this.replaceMsg(tid, '⚠️ 超时'); }, 60000);
    wx.request({
      url: u, method:'POST',
      header: { 'Content-Type':'application/json', 'Authorization':'Bearer '+k },
      data: { model:m, messages:[{ role:'system', content:'你是AI助手。用中文回答，**重点**加粗、- 列表。公式用纯文本（U=IR）。当前：'+this.data.title+'第'+this.data.currentPage+'页。' }, { role:'user', content:q }], temperature:0.6, max_tokens:1500 },
      success: (r) => {
        clearTimeout(timer);
        if (r.statusCode === 429 && this._retry < 3) {
          this._retry++; const s = this._retry * 10;
          wx.showToast({ title: `繁忙，${s}秒后(${this._retry}/3)`, icon:'none', duration:s*1000 });
          setTimeout(() => this.doReq(u, k, m, q, tid), s*1000); return;
        }
        this._busy = false; this._lastReq = Date.now();
        this.replaceMsg(tid,
          r.statusCode === 429 ? '⚠️ 太频繁，等1分钟再试。可切DeepSeek API' :
          r.statusCode === 401 ? '⚠️ Key无效，去AI答疑页检查' :
          r.statusCode !== 200 ? '⚠️ 错误'+r.statusCode+'，可切换其他服务商' :
          r.data?.choices?.[0] ? r.data.choices[0].message.content : '⚠️ 返回异常');
      },
      fail: () => { clearTimeout(timer); this._busy = false; this._lastReq = Date.now(); this.replaceMsg(tid, '⚠️ 网络错误'); }
    });
  },

  usePreset2(question, thinkingId) {
    setTimeout(() => {
      const r = findInPdfContent(question) || require('../../utils/preset-answers').findAnswer(question) || '关于第' + this.data.currentPage + '页，建议查看课件或设置API Key。';
      this.replaceMsg(thinkingId, r);
    }, 300);
  },

  replaceMsg(id, content) {
    let html = '';
    try { html = mdToHtml(content); } catch(e) {}
    const msgs = this.data.aiMsgs.map(m => m.id === id ? { id, role:'ai', content, html } : m);
    this.setData({ aiMsgs: msgs });
  },

  // ===== 全屏查看 =====
  enterFullScreen(e) {
    const src = e.currentTarget.dataset.src;
    this.setData({ fullScreen: true, fullScreenSrc: src });
  },
  exitFullScreen() {
    this.setData({ fullScreen: false, fullScreenSrc: '' });
  },
  fsGoPage(page) {
    const p = Math.max(1, Math.min(page, this.data.totalPages));
    this.setData({
      currentPage: p,
      currentIndex: p - 1,
      fullScreenSrc: getPageImageUrl(this.data.fileId, p)
    });
  },
  fsPrevPage() {
    if (this.data.currentPage > 1) this.fsGoPage(this.data.currentPage - 1);
  },
  fsNextPage() {
    if (this.data.currentPage < this.data.totalPages) this.fsGoPage(this.data.currentPage + 1);
  },

  goBack() { wx.navigateBack(); }
});
