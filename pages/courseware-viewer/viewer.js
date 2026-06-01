const storage = require('../../utils/storage');
const pageMap = require('../../utils/page-map');
const { findInPdfContent } = require('../../utils/local-qa');
const { getPageImageUrl } = require('../../utils/pdf-content');

function getPageCount(fileId) {
  const info = pageMap[fileId];
  return info ? info.pages : 0;
}

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

  onSwiperChange(e) {
    this.setData({ currentPage: e.detail.current + 1, currentIndex: e.detail.current });
  },

  onImgLoad(e) {
    const idx = e.currentTarget.dataset.index;
    const key = `pageList[${idx}].loaded`;
    this.setData({ [key]: true });
  },

  onImgError(e) {
    const idx = e.currentTarget.dataset.index;
    const key = `pageList[${idx}].loaded`;
    this.setData({ [key]: true }); // hide loading even on error
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
    if (this.data.showAnnListPage) this.loadAllAnnotations();
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
  toggleAIChat() {
    this.setData({ showAIChat: !this.data.showAIChat, aiInputVal: '' });
    if (!this.data.showAIChat) {
      // 关闭时清空对话
      this.setData({ aiMsgs: [] });
    }
  },

  onAiInput(e) { this.setData({ aiInputVal: e.detail.value }); },

  aiSendSuggestion(e) {
    const q = e.currentTarget.dataset.q;
    this.aiSendMessageWithText(q);
  },

  aiSendMessage() {
    const text = this.data.aiInputVal.trim();
    if (!text) return;
    this.aiSendMessageWithText(text);
  },

  aiSendMessageWithText(text) {
    const msgs = [...this.data.aiMsgs, { role: 'user', content: text }];
    this.setData({ aiMsgs: msgs, aiInputVal: '' });

    // 加一条"思考中"
    const msgs2 = [...msgs, { role: 'ai', content: '🤔 思考中...' }];
    this.setData({ aiMsgs: msgs2 });

    // 调用AI（与AI助手页相同的逻辑）
    const apiKey = wx.getStorageSync('ai_api_key') || '';
    const apiUrl = wx.getStorageSync('ai_api_url') || 'https://api.deepseek.com';
    const apiModel = wx.getStorageSync('ai_api_model') || 'deepseek-chat';

    if (apiKey) {
      this.callAI(apiUrl, apiKey, apiModel, text);
    } else {
      this.usePreset(text);
    }
  },

  callAI(apiUrl, apiKey, apiModel, question) {
    wx.request({
      url: apiUrl + '/v1/chat/completions',
      method: 'POST',
      header: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      data: {
        model: apiModel,
        messages: [
          { role: 'system', content: '你是电路分析课程的辅导老师。用中文回答，可以包含公式推导。当前课件：' + this.data.title + '，第' + this.data.currentPage + '页。' },
          { role: 'user', content: question }
        ],
        temperature: 0.7, max_tokens: 1500
      },
      success: (res) => {
        const answer = (res.data && res.data.choices && res.data.choices[0]) ? res.data.choices[0].message.content : '（AI返回异常）';
        this.updateAiLastMessage(answer);
      },
      fail: () => { this.updateAiLastMessage('⚠️ AI调用失败，请检查API设置'); }
    });
  },

  usePreset(question) {
    const { findAnswer } = require('../../utils/preset-answers');
    setTimeout(() => {
      const pdfAnswer = findInPdfContent(question);
      if (pdfAnswer) { this.updateAiLastMessage(pdfAnswer); return; }
      const presetAnswer = findAnswer(question);
      if (presetAnswer) { this.updateAiLastMessage(presetAnswer); return; }
      this.updateAiLastMessage('关于第' + this.data.currentPage + '页的内容，建议查看课件或设置API Key获取更详细的解答。');
    }, 300);
  },

  updateAiLastMessage(content) {
    const msgs = [...this.data.aiMsgs];
    msgs[msgs.length - 1] = { role: 'ai', content };
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
