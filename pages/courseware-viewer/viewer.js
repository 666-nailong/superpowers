const storage = require('../../utils/storage');
const pageMap = require('../../utils/page-map');

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
    showAnnListPage: false,
    allAnnotations: [],
    fullScreen: false,
    fullScreenSrc: ''
  },

  onLoad(options) {
    const fileId = options.fileId || '';
    const title = decodeURIComponent(options.title || '课件');
    const totalPages = getPageCount(fileId) || 1;
    const pageList = [];
    for (let i = 1; i <= totalPages; i++) {
      pageList.push({ page: i, src: `../../assets/pdf_pages/${fileId}/${i}.jpg` });
    }
    this.setData({ fileId, title, totalPages, pageList, currentPage: 1, currentIndex: 0 });
    this.loadAnnCount();
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
    if (this.data.showAnnListPage) this.loadAllAnnotations();
  },

  // ===== 批注列表 =====
  showAnnList() {
    this.setData({ showAnnListPage: true });
    this.loadAllAnnotations();
  },

  closeAnnList() {
    this.setData({ showAnnListPage: false });
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

  // ===== AI提问 =====
  askAI() {
    wx.switchTab({ url: '/pages/ai-assistant/assistant' });
    setTimeout(() => {
      const context = `我在学习「${this.data.title}」第${this.data.currentPage}页，能帮我讲解一下吗？`;
      const history = storage.getChatHistory();
      if (history.length === 0 || history[history.length - 1].content !== context) {
        history.push({
          id: 'msg_' + Date.now(),
          role: 'user',
          content: context,
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        });
        storage.setChatHistory(history);
      }
    }, 300);
  },

  // ===== 全屏查看 =====
  enterFullScreen(e) {
    const src = e.currentTarget.dataset.src;
    this.setData({ fullScreen: true, fullScreenSrc: src });
  },
  exitFullScreen() {
    this.setData({ fullScreen: false, fullScreenSrc: '' });
  },

  goBack() { wx.navigateBack(); }
});
