const storage = require('../../utils/storage');

Page({
  data: {
    activeTab: 'questions',
    favQuestions: [],
    favFormulas: []
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const favorites = storage.getFavorites();
    const qData = storage.getQuestionData();
    const fData = storage.getFormulaData();

    // 收藏的题目
    const allQuestions = [];
    (qData.chapters || []).forEach(ch => allQuestions.push(...ch.questions));
    const favQuestions = favorites.questions.map(id => {
      const q = allQuestions.find(q => q.id === id);
      return q ? { ...q, favDate: new Date().toLocaleDateString('zh-CN') } : null;
    }).filter(Boolean);

    // 收藏的公式
    const allFormulas = [];
    (fData.categories || []).forEach(cat => allFormulas.push(...cat.formulas));
    const favFormulas = favorites.formulas.map(id => {
      const f = allFormulas.find(f => f.id === id);
      return f || null;
    }).filter(Boolean);

    this.setData({ favQuestions, favFormulas });
  },

  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab });
  },

  doQuestion(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/question-practice/practice?mode=wrong&chapterId=${id}`
    });
  },

  removeFav(e) {
    const { id } = e.currentTarget.dataset;
    const favorites = storage.getFavorites();
    favorites.questions = favorites.questions.filter(q => q !== id);
    storage.setFavorites(favorites);
    wx.showToast({ title: '已取消收藏', icon: 'success' });
    this.loadData();
  },

  removeFavFormula(e) {
    const { id } = e.currentTarget.dataset;
    const favorites = storage.getFavorites();
    favorites.formulas = favorites.formulas.filter(f => f !== id);
    storage.setFavorites(favorites);
    wx.showToast({ title: '已取消收藏', icon: 'success' });
    this.loadData();
  }
});
