const storage = require('../../utils/storage');

Page({
  data: {
    stats: {},
    accuracy: 0,
    studyHours: 0,
    wrongBookCount: 0,
    totalChapters: 0,
    mockHistory: []
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const stats = storage.getLearningStats();
    const wrongBook = storage.getWrongBook();
    const cwData = storage.getCoursewareData();

    const total = stats.totalQuestionsAnswered || 0;
    const correct = stats.totalCorrect || 0;
    const accuracy = total > 0 ? Math.round(correct / total * 100) : 0;
    const studyHours = Math.round(stats.totalStudyTime / 3600 * 10) / 10;
    const totalChapters = (cwData && cwData.chapters) ? cwData.chapters.length : 8;

    // 模拟考记录
    const mockHistory = (stats.mockExamHistory || []).map(m => ({
      date: new Date(m.date).toLocaleDateString('zh-CN'),
      score: m.score,
      totalQuestions: m.totalQuestions,
      correctCount: m.correctCount
    })).reverse();

    this.setData({
      stats,
      accuracy,
      studyHours,
      wrongBookCount: wrongBook.length,
      totalChapters,
      mockHistory
    });
  },

  goWrongBook() {
    wx.navigateTo({ url: '/pages/wrong-book/wrong-book' });
  },
  goFavorites() {
    wx.navigateTo({ url: '/pages/favorites/favorites' });
  },
  goMyAnnotations() {
    wx.navigateTo({ url: '/pages/my-annotations/annotations' });
  },
  goCourseware() {
    wx.navigateTo({ url: '/pages/courseware/courseware' });
  },

  clearCache() {
    wx.showModal({
      title: '确认清除',
      content: '将清除所有学习数据（答题记录、错题本、收藏等），但课件和题库内容不受影响。确定继续？',
      success: (res) => {
        if (res.confirm) {
          const keys = Object.values(storage.STORAGE_KEYS).filter(k => k !== 'courseware_data' && k !== 'question_data' && k !== 'formula_data' && k !== 'data_init_flag');
          keys.forEach(k => wx.removeStorageSync(k));
          wx.showToast({ title: '已清除', icon: 'success' });
          this.loadData();
        }
      }
    });
  }
});
