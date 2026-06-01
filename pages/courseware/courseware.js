const storage = require('../../utils/storage');

Page({
  data: {
    chapters: []
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const cwData = storage.getCoursewareData();
    if (!cwData || !cwData.chapters) return;

    const chapters = cwData.chapters.map(ch => ({
      ...ch,
      expanded: false
    }));

    this.setData({ chapters });
  },

  toggleChapter(e) {
    const { id } = e.currentTarget.dataset;
    const chapters = this.data.chapters.map(ch => ({
      ...ch,
      expanded: ch.id === id ? !ch.expanded : ch.expanded
    }));
    this.setData({ chapters });
  },

  openFile(e) {
    const { fileid, title } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/courseware-viewer/viewer?fileId=${fileid}&title=${encodeURIComponent(title || '课件')}`
    });
  }
});
