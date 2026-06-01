// 每套真题的页面结构与答案
const examConfig = {
  exam2019: {
    pages: [
      { qs: [{id:'2019m1',label:'多选1'},{id:'2019m2',label:'多选2'},{id:'2019m3',label:'多选3'},{id:'2019m4',label:'多选4'},{id:'2019m5',label:'多选5'},{id:'2019m6',label:'多选6'},{id:'2019m7',label:'多选7'},{id:'2019m8',label:'多选8'}], answers: {}},
      { qs: [{id:'2019j1',label:'判断1'},{id:'2019j2',label:'判断2'},{id:'2019j3',label:'判断3'}], answers: {}},
      { qs: [{id:'2019j4',label:'判断4'},{id:'2019j5',label:'判断5'},{id:'2019j6',label:'判断6'},{id:'2019j7',label:'判断7'},{id:'2019j8',label:'判断8'},{id:'2019j9',label:'判断9'},{id:'2019j10',label:'判断10'},{id:'2019j11',label:'判断11'},{id:'2019j12',label:'判断12'},{id:'2019m1',label:'名解1'},{id:'2019m2',label:'名解2'},{id:'2019m3',label:'名解3'},{id:'2019m4',label:'名解4'}], answers: {}},
      { qs: [{id:'2019t1',label:'填空1'},{id:'2019t2',label:'填空2'},{id:'2019t3',label:'填空3'},{id:'2019t4',label:'填空4'},{id:'2019t5',label:'填空5'},{id:'2019t6',label:'填空6'},{id:'2019c1',label:'计算1'},{id:'2019c2',label:'计算2'}], answers: {}}
    ]
  },
  exam2020: {
    pages: [
      { qs: [{id:'2020j1',label:'判断1'},{id:'2020j2',label:'判断2'},{id:'2020j3',label:'判断3'},{id:'2020j4',label:'判断4'},{id:'2020j5',label:'判断5'},{id:'2020j6',label:'判断6'},{id:'2020j7',label:'判断7'},{id:'2020j8',label:'判断8'},{id:'2020j9',label:'判断9'},{id:'2020j10',label:'判断10'}], answers: {}},
      { qs: [{id:'2020s1',label:'简答1'},{id:'2020s2',label:'简答2'},{id:'2020s3',label:'简答3'},{id:'2020c1',label:'计算1'},{id:'2020c2',label:'计算2'},{id:'2020c3',label:'计算3'}], answers: {}}
    ]
  },
  exam2021: {
    pages: [
      { qs: [{id:'2021x1',label:'单选1'},{id:'2021x2',label:'单选2'},{id:'2021x3',label:'单选3'},{id:'2021x4',label:'单选4'},{id:'2021x5',label:'单选5'},{id:'2021x6',label:'单选6'},{id:'2021x7',label:'单选7'}], answers: {}},
      { qs: [{id:'2021t1',label:'填空1'},{id:'2021t2',label:'填空2'},{id:'2021t3',label:'填空3'},{id:'2021t4',label:'填空4'},{id:'2021t5',label:'填空5'},{id:'2021t6',label:'填空6'}], answers: {}},
      { qs: [{id:'2021j1',label:'判断1'},{id:'2021j2',label:'判断2'},{id:'2021j3',label:'判断3'}], answers: {}},
      { qs: [{id:'2021j4',label:'判断4'},{id:'2021j5',label:'判断5'},{id:'2021j6',label:'判断6'},{id:'2021j7',label:'判断7'}], answers: {}},
      { qs: [{id:'2021c1',label:'计算1'},{id:'2021c2',label:'计算2'},{id:'2021q1',label:'简答1'},{id:'2021q2',label:'简答2'}], answers: {}}
    ]
  },
  exam2022: {
    pages: [
      { qs: [{id:'2022j1',label:'判断1'},{id:'2022j2',label:'判断2'},{id:'2022j3',label:'判断3'},{id:'2022j4',label:'判断4'},{id:'2022j5',label:'判断5'},{id:'2022j6',label:'判断6'},{id:'2022j7',label:'判断7'},{id:'2022j8',label:'判断8'},{id:'2022j9',label:'判断9'},{id:'2022j10',label:'判断10'}], answers: {}},
      { qs: [{id:'2022d1',label:'单选1'},{id:'2022d2',label:'单选2'},{id:'2022d3',label:'单选3'},{id:'2022d4',label:'单选4'},{id:'2022d5',label:'单选5'},{id:'2022d6',label:'单选6'},{id:'2022d7',label:'单选7'},{id:'2022d8',label:'单选8'},{id:'2022d9',label:'单选9'}], answers: {}},
      { qs: [{id:'2022h1',label:'绘图1'},{id:'2022h2',label:'绘图2'},{id:'2022h3',label:'绘图3'},{id:'2022c1',label:'计算1'},{id:'2022c2',label:'计算2'}], answers: {}}
    ]
  },
  exam2023: {
    pages: [
      { qs: [{id:'2023m1',label:'名解1'},{id:'2023m2',label:'名解2'},{id:'2023m3',label:'名解3'},{id:'2023m4',label:'名解4'},{id:'2023m5',label:'名解5'},{id:'2023j1',label:'判断1'},{id:'2023j2',label:'判断2'},{id:'2023j3',label:'判断3'}], answers: {}},
      { qs: [{id:'2023j4',label:'判断4'},{id:'2023j5',label:'判断5'},{id:'2023j6',label:'判断6'},{id:'2023j7',label:'判断7'},{id:'2023j8',label:'判断8'},{id:'2023j9',label:'判断9'},{id:'2023t1',label:'填空1'},{id:'2023t2',label:'填空2'},{id:'2023t3',label:'填空3'},{id:'2023t4',label:'填空4'},{id:'2023t5',label:'填空5'},{id:'2023t6',label:'填空6'},{id:'2023t7',label:'填空7'},{id:'2023t8',label:'填空8'},{id:'2023t9',label:'填空9'},{id:'2023t10',label:'填空10'},{id:'2023c1',label:'计算1'},{id:'2023c2',label:'计算2'},{id:'2023c3',label:'计算3'}], answers: {}}
    ]
  }
};

Page({
  data: {
    examId: '', title: '真题', total: 1, page: 1, index: 0,
    currentSrc: '', totalQ: 0, answers: [], results: [], showResult: false
  },

  onLoad(o) {
    const examId = o.examId || '';
    const cfg = examConfig[examId];
    if (!cfg) { wx.showToast({title:'未找到试卷',icon:'none'}); return; }
    const total = cfg.pages.length;
    const totalQ = cfg.pages.reduce((s,p) => s + p.qs.length, 0);
    this.setData({ examId, title: decodeURIComponent(o.title || '真题'), total, totalQ, page: 1, index: 0 });
    this.loadPage(0);
  },

  loadPage(idx) {
    const cfg = examConfig[this.data.examId];
    if (!cfg) return;
    const p = cfg.pages[idx];
    const pageNum = idx + 1;
    const answers = p.qs.map((q, i) => ({
      index: i,
      id: q.id,
      label: q.label,
      value: '',
      placeholder: '输入第' + (i+1) + '题答案'
    }));
    this.setData({
      page: pageNum, index: idx,
      currentSrc: `/assets/exam_pages/${this.data.examId}/${pageNum}.jpg`,
      answers, results: [], showResult: false
    });
  },

  onChange(e) { this.loadPage(e.detail.current); },
  prev() { if (this.data.index > 0) this.loadPage(this.data.index - 1); },
  next() { if (this.data.index < this.data.total - 1) this.loadPage(this.data.index + 1); },

  onInput(e) {
    const idx = e.currentTarget.dataset.index;
    const val = e.detail.value;
    const answers = [...this.data.answers];
    answers[idx].value = val;
    this.setData({ answers });
  },

  submitPage() {
    const results = this.data.answers.map(a => ({
      label: a.label,
      userAnswer: a.value || '(未作答)',
      correct: false,
      correctAnswer: ''
    }));
    this.setData({ results, showResult: true });
    wx.showToast({ title: '答案已记录，翻页继续', icon: 'none' });
  },

  goBack() { wx.navigateBack(); }
});
