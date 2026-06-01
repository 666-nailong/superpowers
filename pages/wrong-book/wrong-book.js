const storage = require('../../utils/storage');

Page({
  data: {
    wrongBook: [],
    filteredList: [],
    currentFilter: 'all',
    filterOptions: [
      { id: 'all', label: '全部' },
      { id: 'not_mastered', label: '未掌握' },
      { id: 'mastered', label: '已掌握' }
    ],
    chapterPicker: ['全部章节'],
    selectedChapter: 'all',
    selectedChapterLabel: '全部章节 ▾',
    masteredCount: 0
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const wrongBook = storage.getWrongBook();
    const qData = storage.getQuestionData();
    const allQuestions = [];
    (qData.chapters || []).forEach(ch => { allQuestions.push(...ch.questions); });

    // 组装完整数据
    const list = wrongBook.map(w => {
      const q = allQuestions.find(q => q.id === w.questionId);
      if (!q) return null;
      const starCnt = q.difficulty || 1;
      let diffStars = '';
      for (let s = 0; s < starCnt; s++) diffStars += '⭐';
      return {
        questionId: w.questionId,
        question: q.question,
        difficulty: starCnt,
        diffStars,
        chapter: q.chapter || '',
        wrongAnswer: w.wrongAnswer,
        wrongTimes: (storage.getAnswerRecords()[w.questionId] || {}).wrongCount || 1,
        lastWrongDate: new Date(w.addedAt).toLocaleDateString('zh-CN'),
        mastered: w.mastered || false
      };
    }).filter(Boolean);

    const masteredCount = list.filter(w => w.mastered).length;
    const chapters = new Set(list.map(w => w.chapter).filter(Boolean));
    const chapterPicker = ['全部章节', ...Array.from(chapters)];

    this.setData({
      wrongBook: list,
      chapterPicker,
      masteredCount,
      selectedChapter: 'all',
      selectedChapterLabel: '全部章节 ▾'
    });

    this.applyFilter();
  },

  changeFilter(e) {
    this.setData({ currentFilter: e.currentTarget.dataset.id });
    this.applyFilter();
  },

  changeChapter(e) {
    const picker = this.data.chapterPicker;
    const idx = e.detail.value;
    const label = picker[idx];
    this.setData({
      selectedChapter: idx === 0 ? 'all' : label,
      selectedChapterLabel: label + ' ▾'
    });
    this.applyFilter();
  },

  applyFilter() {
    let list = [...this.data.wrongBook];

    // 按掌握状态筛选
    if (this.data.currentFilter === 'mastered') {
      list = list.filter(w => w.mastered);
    } else if (this.data.currentFilter === 'not_mastered') {
      list = list.filter(w => !w.mastered);
    }

    // 按章节筛选
    if (this.data.selectedChapter !== 'all') {
      list = list.filter(w => w.chapter === this.data.selectedChapter);
    }

    this.setData({ filteredList: list });
  },

  toggleMastered(e) {
    const { id } = e.currentTarget.dataset;
    const wrongBook = storage.getWrongBook();
    const item = wrongBook.find(w => w.questionId === id);
    if (item) {
      item.mastered = !item.mastered;
      storage.setWrongBook(wrongBook);
      this.loadData();
    }
  },

  removeWrong(e) {
    const { id } = e.currentTarget.dataset;
    let wrongBook = storage.getWrongBook();
    wrongBook = wrongBook.filter(w => w.questionId !== id);
    storage.setWrongBook(wrongBook);
    wx.showToast({ title: '已移除', icon: 'success' });
    this.loadData();
  },

  retryOne(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/question-practice/practice?mode=wrong&chapterId=${id}`
    });
  },

  retryAll() {
    const ids = this.data.filteredList.map(w => w.questionId).join(',');
    wx.navigateTo({
      url: `/pages/question-practice/practice?mode=wrong`
    });
  }
});
