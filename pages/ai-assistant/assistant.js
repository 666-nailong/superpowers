const storage = require('../../utils/storage');
const { findAnswer } = require('../../utils/preset-answers');

Page({
  data: {
    msgList: [],
    inputValue: '',
    suggestions: [
      '叠加定理的内容是什么？',
      '怎么用三要素法求解一阶电路？',
      '解释一下戴维南定理',
      '串联谐振有什么特点？',
      'KVL 和 KCL 的本质区别？',
      'Y-Δ等效变换怎么记？'
    ]
  },

  onShow() {
    const history = storage.getChatHistory();
    this.setData({ msgList: history });
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  sendMessage() {
    const content = this.data.inputValue.trim();
    if (!content) return;

    this.addMessage('user', content);
    this.setData({ inputValue: '' });

    // 模拟 AI 思考
    wx.showLoading({ title: '思考中...', mask: true });
    setTimeout(() => {
      wx.hideLoading();
      this.getAIResponse(content);
    }, 500);
  },

  sendSuggestion(e) {
    const text = e.currentTarget.dataset.item;
    this.setData({ inputValue: text });
    this.sendMessage();
  },

  addMessage(role, content) {
    const msg = {
      id: 'msg_' + Date.now(),
      role,
      content,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    const list = [...this.data.msgList, msg];
    this.setData({ msgList: list });
    storage.setChatHistory(list);
  },

  getAIResponse(question) {
    const answer = findAnswer(question);
    let response;
    if (answer) {
      response = answer;
    } else {
      response = '🤔 关于"' + question + '"\n\n这是一个很好的问题！目前我的知识库中还没有直接匹配的答案。你可以尝试换个问法，或者查看以下资源：\n\n📖 建议：\n1. 在「公式速查」中搜索相关知识点\n2. 查看对应章节的课件内容\n3. 在题库中做相关练习\n\n你也可以在「课件」页面对具体页面向我提问，我可以结合上下文回答～';
    }
    this.addMessage('assistant', response);
  }
});
