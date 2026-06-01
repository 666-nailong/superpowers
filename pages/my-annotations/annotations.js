const storage = require('../../utils/storage');

Page({
  data: {
    annotations: []
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const myAnnotations = storage.getMyAnnotations();
    const cwData = storage.getCoursewareData();

    // 获取文件标题
    const fileTitleMap = {};
    if (cwData && cwData.chapters) {
      cwData.chapters.forEach(ch => {
        (ch.files || []).forEach(f => {
          fileTitleMap[f.id] = f.title;
        });
      });
    }

    const list = myAnnotations
      .map(a => ({
        ...a,
        date: new Date(a.createdAt).toLocaleDateString('zh-CN'),
        fileTitle: fileTitleMap[a.fileId] || a.fileId
      }))
      .reverse();

    this.setData({ annotations: list });
  },

  gotoPage(e) {
    const { fileid, pagenum } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/courseware-viewer/viewer?fileId=${fileid}&page=${pagenum}`
    });
  },

  deleteAnnotation(e) {
    const { id, fileid, pagenum } = e.currentTarget.dataset;

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条批注吗？',
      success: (res) => {
        if (!res.confirm) return;

        // 从我的批注索引中删除
        let myAnnotations = storage.getMyAnnotations();
        myAnnotations = myAnnotations.filter(a => a.annotationId !== id);
        storage.setMyAnnotations(myAnnotations);

        // 从课件批注中删除
        const key = `${fileid}_${pagenum}`;
        const allAnnotations = storage.getAnnotations();
        if (allAnnotations[key]) {
          allAnnotations[key].annotations = allAnnotations[key].annotations.filter(a => a.id !== id);
          if (allAnnotations[key].annotations.length === 0) {
            delete allAnnotations[key];
          }
          storage.setAnnotations(allAnnotations);
        }

        wx.showToast({ title: '已删除', icon: 'success' });
        this.loadData();
      }
    });
  }
});
