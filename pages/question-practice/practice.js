const storage = require('../../utils/storage');

Page({
  data: {
    mode: 'practice',          // practice | exam | mock | wrong
    chapterId: '',
    chapterTitle: '刷题',
    questions: [],
    currentIndex: 0,
    selectedIndex: -1,
    isCorrect: null,
    correctAnswerText: '',
    answers: [],               // 考试模式：记录每道题的选择
    timerDisplay: '00:00',
    timerSeconds: 0,
    timerInterval: null,
    showAnswerSheet: false,
    answeredMap: {},
    isBookmarked: false,
    questionTypeLabel: '单选题',
    question: {}
  },

  onLoad(options) {
    const mode = options.mode || 'practice';
    const chapterId = (options.chapterId && options.chapterId !== 'undefined') ? options.chapterId : '';
    const chapterTitle = (options.chapterTitle && options.chapterTitle !== 'undefined') ? decodeURIComponent(options.chapterTitle) : '刷题';
    const examId = (options.examId && options.examId !== 'undefined') ? options.examId : '';
    const qData = storage.getQuestionData();
    let questions = [];

    if (mode === 'wrong') {
      const wrongBook = storage.getWrongBook();
      const allQuestions = [];
      (qData.chapters || []).forEach(ch => { allQuestions.push(...ch.questions); });
      if (chapterId && chapterId !== '') {
        // 单题重做
        const q = allQuestions.find(q => q.id === chapterId);
        questions = q ? [{ ...q }] : [];
      } else {
        questions = wrongBook.map(w => {
          const q = allQuestions.find(q => q.id === w.questionId);
          return q ? { ...q } : null;
        }).filter(Boolean);
      }
    } else if (mode === 'mock') {
      const config = qData.mockExamConfig || { questionCount: 10, timeLimit: 30 };
      questions = this.generateMockQuestions(qData, config);
    } else if (mode === 'exam' && examId) {
      const exam = (qData.pastExams || []).find(e => e.id === examId);
      if (exam) {
        const allQuestions = [];
        (qData.chapters || []).forEach(ch => { allQuestions.push(...ch.questions); });
        questions = exam.questions.map(qid => {
          const q = allQuestions.find(q => q.id === qid);
          return q ? { ...q } : null;
        }).filter(Boolean);
      }
    } else {
      // 章节练习
      const cid = chapterId || 'qch01';
      const chapter = (qData.chapters || []).find(ch => ch.id === cid);
      if (chapter) {
        questions = chapter.questions.map(q => ({ ...q }));
      }
    }

    // 如果没有题目，给个提示
    if (questions.length === 0) {
      wx.showToast({ title: '该章节暂无题目', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    const favorites = storage.getFavorites();
    const answers = new Array(questions.length).fill(-1);

    this.setData({
      mode: mode || 'practice',
      chapterId: chapterId || '',
      chapterTitle: chapterTitle || '刷题',
      questions,
      answers,
      answeredMap: {},
      currentIndex: 0,
      selectedIndex: -1,
      isCorrect: null
    });

    this.loadQuestion(0);

    // 考试模式开始计时
    if (mode === 'exam' || mode === 'mock') {
      const timeLimit = (qData.mockExamConfig && qData.mockExamConfig.timeLimit) || 60;
      this.startTimer(timeLimit * 60);
    }
  },

  onUnload() {
    if (this.data.timerInterval) {
      clearInterval(this.data.timerInterval);
    }
  },

  generateMockQuestions(qData, config) {
    const allChapters = qData.chapters || [];
    const totalCount = config.questionCount || 20;
    const selected = [];
    const usedIds = new Set();

    allChapters.forEach(ch => {
      const ratio = (config.chapterRatio && config.chapterRatio[ch.id]) || (1 / allChapters.length);
      const count = Math.max(1, Math.round(totalCount * ratio));
      const shuffled = [...ch.questions].sort(() => Math.random() - 0.5);
      shuffled.forEach(q => {
        if (selected.length < totalCount && !usedIds.has(q.id)) {
          selected.push({ ...q });
          usedIds.add(q.id);
        }
      });
    });

    // 补满
    if (selected.length < totalCount) {
      const allQuestions = [];
      allChapters.forEach(ch => allQuestions.push(...ch.questions));
      const remaining = allQuestions.filter(q => !usedIds.has(q.id));
      remaining.slice(0, totalCount - selected.length).forEach(q => {
        selected.push({ ...q });
      });
    }

    return selected.sort(() => Math.random() - 0.5);
  },

  loadQuestion(index) {
    const { questions, answers, mode, isCorrect } = this.data;
    if (index < 0 || index >= questions.length) return;
    const q = questions[index];
    if (!q) return;

    const typeLabels = { choice: '单选题', fill: '填空题', judge: '判断题' };
    const favorites = storage.getFavorites();
    const isBookmarked = favorites.questions.includes(q.id);
    const starCount = q.difficulty || 1;
    let difficultyStars = '';
    for (let i = 0; i < starCount; i++) difficultyStars += '⭐';

    // 获取正确答案文本
    let correctAnswerText = '';
    if (q.type === 'choice' && q.options && q.options[q.answer] !== undefined) {
      const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
      correctAnswerText = labels[q.answer] + '. ' + q.options[q.answer];
    } else if (q.type === 'judge') {
      correctAnswerText = q.answer ? '正确' : '错误';
    } else {
      correctAnswerText = q.answer || '';
    }

    this.setData({
      question: q,
      currentIndex: index,
      selectedIndex: mode === 'exam' || mode === 'mock' ? answers[index] : -1,
      isCorrect: mode === 'exam' || mode === 'mock' ? null : isCorrect,
      correctAnswerText,
      questionTypeLabel: typeLabels[q.type] || '单选题',
      isBookmarked,
      difficultyStars,
      showAnswerSheet: false
    });
  },

  selectOption(e) {
    const { mode, question, currentIndex, answers, answeredMap, questions } = this.data;
    const index = e.currentTarget.dataset.index;

    if (mode === 'practice' && this.data.isCorrect !== null) return;

    const isCorrect = index === question.answer;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    const newAnsweredMap = { ...answeredMap, [currentIndex]: true };

    if (mode === 'practice') {
      this.setData({
        selectedIndex: index,
        isCorrect,
        answers: newAnswers,
        answeredMap: newAnsweredMap
      });
      // 记录答题结果
      storage.recordAnswer(question.id, index, isCorrect, question.chapter || '', mode);
    } else {
      // 考试模式：只记录选择
      this.setData({
        selectedIndex: index,
        answers: newAnswers,
        answeredMap: newAnsweredMap
      });
    }
  },

  prevQuestion() {
    if (this.data.currentIndex > 0) {
      this.loadQuestion(this.data.currentIndex - 1);
    }
  },

  nextQuestion() {
    const { currentIndex, questions, mode } = this.data;
    if (currentIndex < questions.length - 1) {
      this.loadQuestion(currentIndex + 1);
    } else {
      if (mode === 'exam' || mode === 'mock') {
        this.showAnswerSheet();
      } else {
        wx.showToast({ title: '已完成所有题目', icon: 'success' });
        setTimeout(() => wx.navigateBack(), 1500);
      }
    }
  },

  toggleBookmark() {
    const { question, isBookmarked } = this.data;
    const favorites = storage.getFavorites();
    if (isBookmarked) {
      favorites.questions = favorites.questions.filter(id => id !== question.id);
      wx.showToast({ title: '已取消收藏', icon: 'none' });
    } else {
      favorites.questions.push(question.id);
      wx.showToast({ title: '已收藏', icon: 'success' });
    }
    storage.setFavorites(favorites);
    this.setData({ isBookmarked: !isBookmarked });
  },

  showAnswerSheet() {
    this.setData({ showAnswerSheet: true });
  },

  hideSheet() {
    this.setData({ showAnswerSheet: false });
  },

  jumpToQuestion(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ showAnswerSheet: false });
    this.loadQuestion(index);
  },

  submitExam() {
    const { answers, questions, mode, timerSeconds } = this.data;
    const unanswered = answers.filter(a => a === -1).length;

    if (unanswered > 0) {
      wx.showModal({
        title: '还有未答题目',
        content: `${unanswered} 道题未作答，确定交卷吗？`,
        success: (res) => {
          if (res.confirm) this.finishExam(answers, questions, mode, timerSeconds);
        }
      });
    } else {
      this.finishExam(answers, questions, mode, timerSeconds);
    }
  },

  finishExam(answers, questions, mode, timerSeconds) {
    if (this.data.timerInterval) {
      clearInterval(this.data.timerInterval);
    }

    let correctCount = 0;
    const resultData = questions.map((q, i) => ({
      question: q,
      userAnswer: answers[i],
      isCorrect: answers[i] === q.answer,
      correctAnswer: q.answer
    }));
    correctCount = resultData.filter(r => r.isCorrect).length;

    // 记录每道题的答题结果
    resultData.forEach(r => {
      storage.recordAnswer(r.question.id, r.userAnswer, r.isCorrect, r.question.chapter || '', mode);
    });

    // 更新模拟考历史
    if (mode === 'mock') {
      const stats = storage.getLearningStats();
      if (!stats.mockExamHistory) stats.mockExamHistory = [];
      stats.mockExamHistory.push({
        date: Date.now(),
        score: Math.round(correctCount / questions.length * 100),
        totalQuestions: questions.length,
        correctCount,
        timeUsed: Math.round((timerSeconds) / 60)
      });
      storage.setLearningStats(stats);
    }

    wx.redirectTo({
      url: `/pages/question-result/result?correctCount=${correctCount}&totalCount=${questions.length}&mode=${mode}&data=${encodeURIComponent(JSON.stringify(resultData))}`
    });
  },

  startTimer(totalSeconds) {
    this.setData({ timerSeconds: totalSeconds });
    this.updateTimerDisplay();
    const interval = setInterval(() => {
      const sec = this.data.timerSeconds - 1;
      if (sec <= 0) {
        clearInterval(interval);
        wx.showToast({ title: '时间到！', icon: 'none' });
        this.submitExam();
        return;
      }
      this.setData({ timerSeconds: sec });
      this.updateTimerDisplay();
    }, 1000);
    this.setData({ timerInterval: interval });
  },

  updateTimerDisplay() {
    const sec = this.data.timerSeconds;
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    this.setData({
      timerDisplay: `${String(min).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    });
  }
});
