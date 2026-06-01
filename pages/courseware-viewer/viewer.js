const storage = require('../../utils/storage');
const pageMap = require('../../utils/page-map');

// 从 page-map.json 获取章节页数
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
    currentAnnotations: [],
    showAnnPanel: false,
    replyInputs: {}
  },

  onLoad(options) {
    const fileId = options.fileId || '';
    const title = decodeURIComponent(options.title || '课件');
    const totalPages = getPageCount(fileId) || 1;

    // 构建页面列表
    const pageList = [];
    for (let i = 1; i <= totalPages; i++) {
      pageList.push({
        page: i,
        src: `../../assets/pdf_pages/${fileId}/${i}.jpg`,
        annotations: []
      });
    }

    this.setData({ fileId, title, totalPages, pageList, currentPage: 1, currentIndex: 0 });
    this.loadAnnotations(1);
  },

  onSwiperChange(e) {
    const page = e.detail.current + 1;
    this.setData({ currentPage: page, currentIndex: e.detail.current });
    this.loadAnnotations(page);
  },

  prevPage() {
    if (this.data.currentPage > 1) {
      const p = this.data.currentPage - 1;
      this.setData({ currentPage: p, currentIndex: p - 1 });
      this.loadAnnotations(p);
    }
  },

  nextPage() {
    if (this.data.currentPage < this.data.totalPages) {
      const p = this.data.currentPage + 1;
      this.setData({ currentPage: p, currentIndex: p - 1 });
      this.loadAnnotations(p);
    }
  },

  onPageTap(e) {
    // 点击页面添加批注（获取点击位置）
    const page = e.currentTarget.dataset.page;
    const touch = e.touches && e.touches[0];
    if (touch) {
      wx.showModal({
        title: '在此页添加批注',
        content: '确定要在第' + page + '页添加批注吗？',
        success: (res) => {
          if (res.confirm) {
            this.setData({ showAnnPanel: true });
          }
        }
      });
    }
  },

  loadAnnotations(pageNum) {
    const key = `${this.data.fileId}_${pageNum}`;
    const allAnn = storage.getAnnotations();
    const anns = (allAnn[key] || { annotations: [] }).annotations || [];

    // 统计总数
    let totalAnn = 0;
    for (const k in allAnn) {
      if (k.startsWith(this.data.fileId + '_')) {
        totalAnn += (allAnn[k].annotations || []).length;
      }
    }

    const sorted = [...anns].sort((a, b) => b.likes - a.likes);
    const formatted = sorted.map(a => ({
      ...a,
      time: new Date(a.createdAt).toLocaleDateString('zh-CN'),
      liked: (a.likedBy || []).includes('default_user'),
      replies: (a.replies || []).map(r => ({
        ...r,
        time: new Date(r.createdAt).toLocaleDateString('zh-CN')
      }))
    }));

    // 更新页面列表中的批注标记
    const pageList = this.data.pageList.map(p => ({
      ...p,
      annotations: p.page === pageNum ? formatted.slice(0, 5).map(a => ({
        id: a.id,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        likes: a.likes
      })) : p.annotations
    }));

    this.setData({
      currentAnnotations: formatted,
      pageList,
      annCount: totalAnn
    });
  },

  showAnnPanel() { this.setData({ showAnnPanel: true }); },
  closeAnnPanel() { this.setData({ showAnnPanel: false }); },

  onMarkerTap(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({ showAnnPanel: true });
  },

  submitAnnotation() {
    const query = wx.createSelectorQuery();
    query.select('#annInput').fields({ value: true }, (res) => {
      const content = (res && res.value || '').trim();
      if (!content) {
        wx.showToast({ title: '请输入批注', icon: 'none' });
        return;
      }
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
      this.loadAnnotations(this.data.currentPage);
      // 清空输入
      const q2 = wx.createSelectorQuery();
      q2.select('#annInput').node(n => { if (n && n.node) n.node.value = ''; }).exec();
    });
    query.exec();
  },

  likeAnnotation(e) {
    const { id } = e.currentTarget.dataset;
    const key = `${this.data.fileId}_${this.data.currentPage}`;
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
    this.loadAnnotations(this.data.currentPage);
  },

  onReplyInput(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({ replyInputs: { ...this.data.replyInputs, [id]: e.detail.value } });
  },

  sendReply(e) {
    const { id } = e.currentTarget.dataset;
    const content = (this.data.replyInputs[id] || '').trim();
    if (!content) return;
    const key = `${this.data.fileId}_${this.data.currentPage}`;
    const allAnn = storage.getAnnotations();
    const anns = allAnn[key];
    if (!anns) return;
    const target = anns.annotations.find(a => a.id === id);
    if (!target) return;
    if (!target.replies) target.replies = [];
    target.replies.push({ id: 'rep_' + Date.now(), userId: 'default_user', userName: '匿名同学', content, createdAt: Date.now(), likes: 0 });
    storage.setAnnotations(allAnn);
    this.setData({ replyInputs: { ...this.data.replyInputs, [id]: '' } });
    wx.showToast({ title: '回复成功', icon: 'success' });
    this.loadAnnotations(this.data.currentPage);
  },

  askAI() {
    wx.switchTab({ url: '/pages/ai-assistant/assistant' });
    setTimeout(() => {
      const context = `我在学习「${this.data.title}」第${this.data.currentPage}页，能帮我讲解一下吗？`;
      const history = storage.getChatHistory();
      if (history.length === 0 || history[history.length - 1].content !== context) {
        history.push({ id: 'msg_' + Date.now(), role: 'user', content: context, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) });
        storage.setChatHistory(history);
      }
    }, 300);
  },

  goBack() { wx.navigateBack(); }
});
