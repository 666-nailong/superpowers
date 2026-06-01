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

  showQualityPicker() {
    const { setQuality, QUALITY_MAP } = require('../../utils/pdf-content');
    const items = ['高清（画质优先）', '标准（推荐）', '省流（节省流量）'];
    const keys = ['high', 'medium', 'low'];
    wx.showActionSheet({
      itemList: items,
      success: (res) => {
        setQuality(keys[res.tapIndex]);
        wx.showToast({ title: '已切换为' + items[res.tapIndex], icon: 'success' });
      }
    });
  },

  showFreeApiGuide() {
    const links = [
      { name: '① DeepSeek（推荐）', desc: '注册送500万tokens', url: 'https://platform.deepseek.com/api_keys' },
      { name: '② 硅基流动', desc: '注册送2000万tokens', url: 'https://cloud.siliconflow.cn' },
      { name: '③ 阿里通义千问', desc: '注册送100万tokens', url: 'https://bailian.console.aliyun.com/?tab=model#/model-market' },
      { name: '④ 月之暗面Kimi', desc: '注册送额度', url: 'https://kimi.moonshot.cn/' }
    ];
    let content = '点击下方平台名称复制注册链接：\n\n';
    links.forEach((l, i) => {
      content += `${l.name} ${l.desc}\n${l.url}\n\n`;
    });
    content += '复制链接后粘贴到浏览器打开注册，获取API Key后在AI答疑 → ⚙️设置中填入。';
    wx.showModal({
      title: '🔑 免费获取API Key',
      content: content,
      confirmText: '复制DeepSeek链接',
      cancelText: '复制硅基流动',
      success: (res) => {
        let url = '';
        if (res.confirm) url = links[0].url;
        else if (res.cancel) url = links[1].url;
        if (url) {
          wx.setClipboardData({
            data: url,
            success: () => { wx.showToast({ title: '链接已复制！', icon: 'success' }); }
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
