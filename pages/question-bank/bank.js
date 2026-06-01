const storage = require('../../utils/storage');

Page({
  data: {
    chapters: [],
    pastExams: [],
    lastMockScore: 0
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const qData = storage.getQuestionData();
    const stats = storage.getLearningStats();
    const records = storage.getAnswerRecords();

    if (!qData || !qData.chapters) return;

    // 计算各章节进度
    const chapters = qData.chapters.map(ch => {
      let doneCount = 0;
      ch.questions.forEach(q => {
        if (records[q.id] && records[q.id].totalAttempts > 0) doneCount++;
      });
      const totalCount = ch.questions.length;
      const percent = totalCount > 0 ? Math.round(doneCount / totalCount * 100) : 0;
      return {
        id: ch.id,
        order: ch.order,
        title: ch.title,
        doneCount,
        totalCount,
        percent
      };
    });

    // 真题
    const examPages = { exam2019: 4, exam2020: 2, exam2021: 5, exam2022: 6, exam2023: 2 };
    const examStructs = {
      exam2019: '多选题8+判断12+名解4+填空6+计算2',
      exam2020: '判断10+简答3+计算3',
      exam2021: '单选7+填空6+判断10+计算2+简答2',
      exam2022: '判断10+单选9+绘图3+计算2',
      exam2023: '名解5+判断9+填空10+计算3'
    };
    const pastExams = (qData.pastExams || []).map((exam, idx) => ({
      id: exam.id,
      icon: ['📄', '📃', '📋', '📜', '📑'][idx % 5],
      title: exam.title,
      count: (exam.questions || []).length,
      totalQ: exam.totalQ || 0,
      pages: examPages[exam.id] || 2,
      struct: examStructs[exam.id] || ''
    }));

    // 上次模拟考成绩
    const history = stats.mockExamHistory || [];
    const lastScore = history.length > 0 ? history[history.length - 1].score : 0;

    this.setData({ chapters, pastExams, lastMockScore: lastScore });
  },

  startChapter(e) {
    const { id, title } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/question-practice/practice?mode=chapter&chapterId=${id}&chapterTitle=${encodeURIComponent(title)}`
    });
  },

  startExam(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/question-practice/practice?mode=exam&examId=${id}`
    });
  },

  startMock() {
    wx.navigateTo({
      url: '/pages/question-practice/practice?mode=mock'
    });
  },

  viewExam(e) {
    const { id, title, pages } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/exam-viewer/viewer?examId=${id}&title=${encodeURIComponent(title)}&total=${pages}`
    });
  }
});
