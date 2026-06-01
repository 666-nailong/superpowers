const storage = require('../../utils/storage');

Page({
  data: {
    greeting: '你好',
    accuracy: 0,
    wrongCount: 0,
    studyHours: 0,
    recentActivities: [],
    chapters: [],
    helpExpanded: { ai: false, study: false, feature: false }
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const cwData = storage.getCoursewareData();
    const stats = storage.getLearningStats();
    const wrongBook = storage.getWrongBook();
    const hour = new Date().getHours();
    let greeting = '你好';
    if (hour < 12) greeting = '早上好';
    else if (hour < 18) greeting = '下午好';
    else greeting = '晚上好';

    const total = stats.totalQuestionsAnswered || 0;
    const correct = stats.totalCorrect || 0;
    const accuracy = total > 0 ? Math.round(correct / total * 100) : 0;
    const studyHours = Math.round((stats.totalStudyTime || 0) / 3600 * 10) / 10;

    const activities = [];
    if (stats.lastStudyDate) {
      activities.push({ icon: '📅', text: '最近一次学习', time: stats.lastStudyDate });
    }
    if (total > 0) {
      activities.push({ icon: '📝', text: `已做 ${total} 题，正确 ${correct} 题`, time: `正确率 ${accuracy}%` });
    }

    const chapters = cwData.chapters.map(ch => ({
      ...ch,
      completed: (stats.chaptersCompleted || []).includes(ch.id)
    }));

    this.setData({
      greeting,
      accuracy,
      wrongCount: wrongBook.length,
      studyHours,
      recentActivities: activities,
      chapters
    });
  },

  toggleHelp(e) {
    const key = e.currentTarget.dataset.key;
    const expanded = { ...this.data.helpExpanded, [key]: !this.data.helpExpanded[key] };
    this.setData({ helpExpanded: expanded });
  },

  showFreeApiGuide() {
    wx.showModal({
      title: '🔑 免费获取API Key',
      content: '以下平台注册即送免费额度：\n\n① DeepSeek（推荐）\ndeepseek.com → 注册 → 500万tokens\n\n② 硅基流动\nsiliconflow.cn → 注册 → 2000万tokens\n\n③ 阿里通义千问\ndashscope.aliyun.com → 注册 → 100万tokens\n\n④ 月之暗面Kimi\nkimi.moonshot.cn → 注册 → 赠送额度\n\n获得API Key后，在AI答疑页面 → ⚙️设置 → 填入即可。',
      showCancel: true,
      cancelText: '复制DeepSeek链接',
      confirmText: '知道了',
      success: (res) => {
        if (res.cancel) {
          wx.setClipboardData({
            data: 'https://platform.deepseek.com/',
            success: () => { wx.showToast({ title: '链接已复制', icon: 'success' }); }
          });
        }
      }
    });
  },

  goCourseware() { wx.navigateTo({ url: '/pages/courseware/courseware' }); },
  goPractice() { wx.switchTab({ url: '/pages/question-bank/bank' }); },
  goWrongBook() { wx.navigateTo({ url: '/pages/wrong-book/wrong-book' }); },
  goMockExam() { wx.navigateTo({ url: '/pages/question-practice/practice?mode=mock' }); },
  goChapter(e) {
    wx.navigateTo({ url: `/pages/courseware/courseware?chapterId=${e.currentTarget.dataset.id}` });
  }
});
