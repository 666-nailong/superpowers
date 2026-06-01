const storage = require('../../utils/storage');

Page({
  data: {
    score: 0,
    correctCount: 0,
    totalCount: 0,
    accuracy: 0,
    stars: '',
    resultData: [],
    mode: 'practice'
  },

  onLoad(options) {
    const { correctCount, totalCount, mode, data } = options;
    const resultData = JSON.parse(decodeURIComponent(data || '[]'));
    const score = totalCount > 0 ? Math.round(parseInt(correctCount) / parseInt(totalCount) * 100) : 0;

    let stars = '';
    if (score >= 90) stars = '⭐⭐⭐⭐⭐';
    else if (score >= 75) stars = '⭐⭐⭐⭐';
    else if (score >= 60) stars = '⭐⭐⭐';
    else if (score >= 40) stars = '⭐⭐';
    else stars = '⭐';

    this.setData({
      score,
      correctCount: parseInt(correctCount),
      totalCount: parseInt(totalCount),
      accuracy: score,
      stars,
      resultData,
      mode
    });
  },

  getAnswerText(question, answerIndex) {
    if (answerIndex === -1 || answerIndex === undefined) return '未作答';
    if (question.type === 'judge') return answerIndex ? '正确' : '错误';
    if (question.options && question.options[answerIndex]) {
      const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
      return labels[answerIndex] + '. ' + question.options[answerIndex];
    }
    return answerIndex;
  },

  addToWrong(e) {
    const { index } = e.currentTarget.dataset;
    const item = this.data.resultData[index];
    if (!item || item.isCorrect) return;

    const wrongBook = storage.getWrongBook();
    const exists = wrongBook.some(w => w.questionId === item.question.id);
    if (exists) {
      wx.showToast({ title: '已在错题本中', icon: 'none' });
      return;
    }
    wrongBook.push({
      questionId: item.question.id,
      wrongAnswer: item.userAnswer,
      chapterId: item.question.chapter || '',
      addedAt: Date.now(),
      mastered: false
    });
    storage.setWrongBook(wrongBook);
    wx.showToast({ title: '已加入错题本', icon: 'success' });
  },

  toggleFav(e) {
    const { index } = e.currentTarget.dataset;
    const item = this.data.resultData[index];
    const fav = storage.getFavorites();
    if (fav.questions.includes(item.question.id)) {
      wx.showToast({ title: '已收藏过', icon: 'none' });
      return;
    }
    fav.questions.push(item.question.id);
    storage.setFavorites(fav);
    wx.showToast({ title: '已收藏', icon: 'success' });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  retry() {
    wx.navigateBack();
  }
});
