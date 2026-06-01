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
    const pastExams = (qData.pastExams || []).map((exam, idx) => ({
      id: exam.id,
      icon: ['📄', '📃', '📋', '📜', '📑'][idx % 5],
      title: exam.title,
      count: (exam.questions || []).length
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
  }
});
