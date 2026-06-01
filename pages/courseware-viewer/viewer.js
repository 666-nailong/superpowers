const storage = require('../../utils/storage');
const { pdfUrls } = require('../../utils/pdf-content');

Page({
  data: {
    fileId: '',
    title: '课件',
    currentPage: 1,
    totalPages: 1,
    pageAnnotationCount: 0,
    currentAnnotations: [],
    showAnnotationPanel: false,
    annotationInput: '',
    replyInputs: {}
  },

  onLoad(options) {
    const fileId = options.fileId || '';
    const title = decodeURIComponent(options.title || '课件');

    this.setData({ fileId, title });

    // 直接打开PDF
    this.openPdf(fileId, title);
  },

  openPdf(fileId, title) {
    const pdfUrl = pdfUrls[fileId];
    if (!pdfUrl) {
      wx.showToast({ title: '课件地址不存在', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '下载课件中...', mask: true });

    wx.downloadFile({
      url: pdfUrl,
      success: (res) => {
        if (res.statusCode === 200) {
          // 下载完成，用微信内置阅读器打开
          wx.openDocument({
            filePath: res.tempFilePath,
            showMenu: true,
            fileType: 'pdf',
            success: () => { wx.hideLoading(); },
            fail: (e) => {
              wx.hideLoading();
              wx.showModal({
                title: '打开失败',
                content: 'PDF文件下载成功但打开失败',
                showCancel: false
              });
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({ title: '课件下载失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('downloadFile fail:', err);
        wx.showModal({
          title: '无法连接PDF服务器',
          content: '请确认本地PDF服务器是否在运行（127.0.0.1:8765）',
          showCancel: false
        });
      }
    });
  },

  goBack() {
    wx.navigateBack();
  },

  showAnnotations() {
    this.setData({ showAnnotationPanel: true });
    this.loadAnnotations();
  },

  hideAnnotations() {
    this.setData({ showAnnotationPanel: false });
  },

  loadAnnotations() {
    const key = `${this.data.fileId}_${this.data.currentPage}`;
    const allAnnotations = storage.getAnnotations();
    const pageAnns = allAnnotations[key] || { annotations: [] };
    const sorted = (pageAnns.annotations || []).sort((a, b) => b.likes - a.likes);
    const formatted = sorted.map(a => ({
      ...a,
      time: new Date(a.createdAt).toLocaleDateString('zh-CN'),
      liked: (a.likedBy || []).includes('default_user'),
      replies: (a.replies || []).map(r => ({
        ...r,
        time: new Date(r.createdAt).toLocaleDateString('zh-CN')
      }))
    }));
    this.setData({
      pageAnnotationCount: sorted.length,
      currentAnnotations: formatted
    });
  },

  onAnnotationInput(e) {
    this.setData({ annotationInput: e.detail.value });
  },

  submitAnnotation() {
    const content = this.data.annotationInput.trim();
    if (!content) return;

    const key = `${this.data.fileId}_${this.data.currentPage}`;
    const allAnnotations = storage.getAnnotations();
    if (!allAnnotations[key]) {
      allAnnotations[key] = { fileId: this.data.fileId, pageNum: this.data.currentPage, annotations: [] };
    }

    const newAnn = {
      id: 'ann_' + Date.now(),
      userId: 'default_user',
      userName: '匿名同学',
      content,
      createdAt: Date.now(),
      likes: 0,
      likedBy: [],
      replies: []
    };

    allAnnotations[key].annotations.push(newAnn);
    storage.setAnnotations(allAnnotations);

    const myAnnotations = storage.getMyAnnotations();
    myAnnotations.push({
      annotationId: newAnn.id,
      fileId: this.data.fileId,
      pageNum: this.data.currentPage,
      content,
      createdAt: Date.now()
    });
    storage.setMyAnnotations(myAnnotations);

    this.setData({ annotationInput: '' });
    wx.showToast({ title: '批注已添加', icon: 'success' });
    this.loadAnnotations();
  },

  likeAnnotation(e) {
    const { id } = e.currentTarget.dataset;
    const key = `${this.data.fileId}_${this.data.currentPage}`;
    const allAnnotations = storage.getAnnotations();
    const anns = allAnnotations[key];
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
    storage.setAnnotations(allAnnotations);
    this.loadAnnotations();
  },

  onReplyInput(e) {
    const { id } = e.currentTarget.dataset;
    const inputs = { ...this.data.replyInputs, [id]: e.detail.value };
    this.setData({ replyInputs: inputs });
  },

  sendReply(e) {
    const { id } = e.currentTarget.dataset;
    const content = (this.data.replyInputs[id] || '').trim();
    if (!content) return;

    const key = `${this.data.fileId}_${this.data.currentPage}`;
    const allAnnotations = storage.getAnnotations();
    const anns = allAnnotations[key];
    if (!anns) return;
    const target = anns.annotations.find(a => a.id === id);
    if (!target) return;
    if (!target.replies) target.replies = [];
    target.replies.push({
      id: 'rep_' + Date.now(),
      userId: 'default_user',
      userName: '匿名同学',
      content,
      createdAt: Date.now(),
      likes: 0
    });
    storage.setAnnotations(allAnnotations);
    const inputs = { ...this.data.replyInputs, [id]: '' };
    this.setData({ replyInputs: inputs });
    wx.showToast({ title: '回复成功', icon: 'success' });
    this.loadAnnotations();
  },

  askAI() {
    wx.switchTab({ url: '/pages/ai-assistant/assistant' });
    setTimeout(() => {
      const context = `我在学习「${this.data.title}」，能帮我讲解一下这部分吗？`;
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
  }
});
