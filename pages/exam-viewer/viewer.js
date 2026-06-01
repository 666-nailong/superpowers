const examDB = {
  exam2019: {
    title: '2019-2020年期末试卷', totalQ: 32, pages: 4,
    questions: [
      { page: 1, type: '多选题', text: '在简单电路中,电阻器的电流和电压关系为', answer: 'A' },
      { page: 1, type: '多选题', text: '电流与电压,电阻之间的关系遵循', answer: 'C' },
      { page: 1, type: '多选题', text: '如果两个电阻器并联,总电阻为', answer: 'C' },
      { page: 1, type: '多选题', text: '如果两个电阻器串联,总电阻是', answer: 'A' },
      { page: 1, type: '多选题', text: '电流测量一般使用的电气仪表是', answer: 'B' },
      { page: 1, type: '多选题', text: '电压源接在一个回路上,但回路中没有电阻器,电流会是', answer: 'A' },
      { page: 2, type: '多选题', text: '当一个电容器充电时,其电流逐渐', answer: 'A' },
      { page: 2, type: '多选题', text: '在交流电路中,电压和电流之间的相位关系由以下哪些定律描述', answer: 'D' },
      { page: 3, type: '判断题', text: '电感器存储电能的方式是通过磁场', answer: '对' },
      { page: 3, type: '判断题', text: '串联电阻器的总电阻大于等于任一串联电阻器的电阻值', answer: '对' },
      { page: 3, type: '判断题', text: '电压源的正极是高电势的位置', answer: '对' },
      { page: 3, type: '判断题', text: '容抗是电容器对电流的阻碍程度', answer: '对' },
      { page: 3, type: '判断题', text: '电容器可以存储电能,类似于电池', answer: '对' },
      { page: 3, type: '判断题', text: '电流源产生的电流是独立于电路中其他元件的', answer: '对' },
      { page: 3, type: '判断题', text: '电压和电流的相位差永远是零', answer: '错' },
      { page: 3, type: '判断题', text: '并联电阻器的总电阻小于等于任一并联电阻器的电阻值', answer: '对' },
      { page: 3, type: '判断题', text: '单相交流电路中,功率的计算公式为 P = VI', answer: '错' },
      { page: 3, type: '判断题', text: '电感器的电流和电压之间的相位差为π/2', answer: '对' },
      { page: 3, type: '判断题', text: '电阻器的电流与其电压的相位差始终是零', answer: '对' },
      { page: 3, type: '判断题', text: '理想电流源的内部电阻为零', answer: '错' },
      { page: 3, type: '名词解释', text: '欧姆定律', answer: '电压与电流成正比,U=IR' },
      { page: 3, type: '名词解释', text: '基尔霍夫电流定律KCL', answer: '节点电流代数和为零' },
      { page: 3, type: '名词解释', text: '等效电阻', answer: '端口VCR相同的等效电阻' },
      { page: 3, type: '名词解释', text: '电位', answer: '某点相对于参考点的电压' },
      { page: 4, type: '填空题', text: '在一个简单直流电路中,电流和电压之间遵循______定律', answer: '欧姆' },
      { page: 4, type: '填空题', text: '交流电路中电阻器是对电流的______', answer: '阻碍作用' },
      { page: 4, type: '填空题', text: '并联电路总电阻______任何一个并联电阻的电阻值', answer: '小于' },
      { page: 4, type: '填空题', text: '电感器对______的电压具有阻碍作用', answer: '变化' },
      { page: 4, type: '填空题', text: '电容器对______的电压具有阻碍作用', answer: '变化' },
      { page: 4, type: '填空题', text: '在交流电路中,阻抗是由电阻和______两个参数组成', answer: '电抗' },
      { page: 4, type: '计算题', text: '计算图示电路中的电流i和电压U', answer: '见原卷电路图', img: true },
      { page: 4, type: '计算题', text: '计算图示电路中负载电阻获得的最大功率', answer: '见原卷电路图', img: true }
    ]
  },
  exam2020: {
    title: '2020-2021年期末试卷', totalQ: 16, pages: 2,
    questions: [
      { page: 1, type: '判断题', text: '当元件两端电压与通过元件的电流取关联参考方向时,且通过计算功率为正,则该元件是发出功率', answer: '错' },
      { page: 1, type: '判断题', text: '诺顿定理可将复杂的有源线性二端口电路等效为一个电流源与电阻并联的电路模型', answer: '对' },
      { page: 1, type: '判断题', text: '叠加定理适用任何电路,电压、电流、功率都可叠加', answer: '错' },
      { page: 1, type: '判断题', text: '各种等效变换,"等效"二字的含义是对内、外部电路都等效', answer: '错' },
      { page: 1, type: '判断题', text: '电容元件和电感元件消耗的平均功率总为零,电阻元件消耗的无功功率总为零', answer: '对' },
      { page: 1, type: '判断题', text: '有功功率和无功功率都满足功率守恒定律,视在功率不满足功率守恒定律', answer: '对' },
      { page: 1, type: '判断题', text: '若电压与电流取关联参考方向,则感性负载的电压相量一定滞后其电流相量', answer: '错' },
      { page: 1, type: '判断题', text: '两个同频率正弦量的相位差等于他们的初相位之差,是一个与时间无关的常数', answer: '对' },
      { page: 1, type: '判断题', text: '对于RLC串联电路,发生谐振时,电路阻抗最小,且为电阻性', answer: '对' },
      { page: 1, type: '判断题', text: '理想电压源不允许开路', answer: '错' },
      { page: 2, type: '简答题', text: '说明有功功率和无功功率的必要条件及特点', answer: 'P=UIcosφ需有电阻;Q=UIsinφ需有电抗' },
      { page: 2, type: '简答题', text: '说明串联谐振和并联谐振的显著特点', answer: '串联谐振Z最小;并联谐振Z最大' },
      { page: 2, type: '计算题', text: '试用支路电流法求电路各支路电流', answer: '见原卷电路图', img: true },
      { page: 2, type: '计算题', text: '试应用节点分析法求各支路电流', answer: '见原卷电路图', img: true },
      { page: 2, type: '计算题', text: '试判断两线圈的同名端', answer: '见原卷电路图', img: true }
    ]
  },
  exam2021: {
    title: '2021-2022年期末试卷', totalQ: 27, pages: 5,
    questions: [
      { page: 1, type: '单选题', text: '电视机120V,0.5A,有功功率?', answer: 'B' },
      { page: 1, type: '单选题', text: 'R1=4Ω,R2=6Ω并联,总电流3A,总电压?', answer: 'C' },
      { page: 1, type: '单选题', text: 'L=0.1H,R=10Ω并联,50Hz,电感电压滞后电流相位差?', answer: 'D' },
      { page: 2, type: '单选题', text: 'C=50μF,220V,60Hz,容抗?', answer: 'A' },
      { page: 2, type: '单选题', text: '电压源和电流源同时连接,正确陈述', answer: 'B' },
      { page: 2, type: '单选题', text: 'RLC串联,电流超前电压,电路性质', answer: '容性' },
      { page: 3, type: '单选题', text: '元件在交流中引入90°相位差,最有可能是', answer: 'C' },
      { page: 3, type: '填空题', text: 'R1=100Ω,R2=200Ω,R3=300Ω,R1∥R2再与R3串联,总电阻', answer: '366.7' },
      { page: 3, type: '填空题', text: '12V,R1=4Ω,R2=6Ω并联,总电流', answer: '5' },
      { page: 3, type: '填空题', text: 'R=10Ω,C=0.1μF串联,时间常数', answer: '1μs' },
      { page: 3, type: '填空题', text: 'V(t)=10sin(50t+30°),R=5Ω,C=0.02F,角频率', answer: '50' },
      { page: 4, type: '填空题', text: 'RLC电路L=0.2H,C=10μF,R=50Ω,能量', answer: '0.025' },
      { page: 4, type: '判断题', text: '欧姆定律:V=IR', answer: '对' },
      { page: 4, type: '判断题', text: '并联电流分流,支路电流之和等于总电流', answer: '对' },
      { page: 4, type: '判断题', text: '电阻越大,通过它的电流就越大', answer: '错' },
      { page: 4, type: '判断题', text: '可以用欧姆定律来计算电压', answer: '对' },
      { page: 4, type: '判断题', text: 'Ohm定律适用于线性电阻', answer: '对' },
      { page: 4, type: '判断题', text: '交流电流方向变化,电压也会相应变化', answer: '对' },
      { page: 4, type: '判断题', text: '电阻器能存储电能', answer: '错' },
      { page: 4, type: '填空题', text: '三角形电路R1=100,R2=200,R3=300,总电阻', answer: '54.5' },
      { page: 4, type: '计算题', text: '求电阻R2两端电压及R3中电流', answer: '见原卷电路图', img: true },
      { page: 5, type: '计算题', text: '已知U=3V,求R', answer: '见原卷电路图', img: true },
      { page: 5, type: '简答题', text: '解释谐振电路的原理及谐振频率', answer: 'f₀=1/(2π√LC),谐振时呈纯阻性' },
      { page: 5, type: '简答题', text: '解释有功功率和无功功率的概念', answer: 'P=UIcosφ实际做功,Q=UIsinφ能量交换' }
    ]
  },
  exam2022: {
    title: '2022-2023年期末试卷', totalQ: 24, pages: 6,
    questions: [
      { page: 1, type: '判断题', text: '只有RLC三种元件可以储存和释放电能', answer: '错' },
      { page: 1, type: '判断题', text: '串联总电阻等于各电阻之和', answer: '对' },
      { page: 1, type: '判断题', text: '并联总电阻等于倒数之和的倒数', answer: '对' },
      { page: 1, type: '判断题', text: '电感电压随电流变化而变化', answer: '对' },
      { page: 1, type: '判断题', text: '相位是电流和电压之间的时间差', answer: '对' },
      { page: 1, type: '判断题', text: '电容器可储存电能', answer: '对' },
      { page: 1, type: '判断题', text: 'RLC中电抗相等时电路处于共振', answer: '对' },
      { page: 2, type: '判断题', text: 'CCVS输出电压与负载电阻有关', answer: '错' },
      { page: 2, type: '单选题', text: 'V=IR中,R为I,求V', answer: 'V=IR' },
      { page: 2, type: '单选题', text: '串联总电阻公式', answer: 'RT=R1+R2+R3+...' },
      { page: 2, type: '单选题', text: 'V=I×R中R代表', answer: '电阻' },
      { page: 2, type: '单选题', text: '节点法基于电流______原理', answer: '守恒' },
      { page: 2, type: '单选题', text: '基尔霍夫第一定律称', answer: 'KCL' },
      { page: 2, type: '单选题', text: '电压极性与电流方向假设称', answer: '参考方向' },
      { page: 3, type: '单选题', text: '傅里叶级数分解为', answer: 'C' },
      { page: 3, type: '单选题', text: 'AM调制指', answer: 'D' },
      { page: 3, type: '单选题', text: '电感在电路中作用是', answer: 'B' },
      { page: 3, type: '单选题', text: 'L增大,谐振频率', answer: 'B' },
      { page: 4, type: '单选题', text: '均值滤波减小信号', answer: 'D' },
      { page: 4, type: '单选题', text: '传输线距离增加,信号', answer: 'A' },
      { page: 4, type: '单选题', text: '巴特沃斯滤波器特点', answer: 'B' },
      { page: 4, type: '绘图题', text: '绘制三阶无源电容滤波器电路图', answer: '见原卷', img: true },
      { page: 5, type: '绘图题', text: '画四线制电阻测量电路', answer: '见原卷', img: true },
      { page: 5, type: '绘图题', text: '绘制多电源电路', answer: '见原卷', img: true },
      { page: 5, type: '计算题', text: '求t>0时u(t)', answer: '见原卷电路图', img: true },
      { page: 6, type: '计算题', text: '求各电源提供的功率', answer: '见原卷电路图', img: true }
    ]
  },
  exam2023: {
    title: '2023-2024年期末试卷', totalQ: 27, pages: 2,
    questions: [
      { page: 1, type: '名词解释', text: '基尔霍夫定律', answer: 'KCL:∑i=0,KVL:∑u=0' },
      { page: 1, type: '名词解释', text: '电流源', answer: '输出电流恒定,电压由外电路决定' },
      { page: 1, type: '名词解释', text: '戴维南定理', answer: '含源二端网络等效为Uoc串联Req' },
      { page: 1, type: '名词解释', text: '相位', answer: '正弦量初始角度,决定瞬时值' },
      { page: 1, type: '名词解释', text: '阻抗', answer: 'Z=R+jX,电压与电流相量之比' },
      { page: 1, type: '判断题', text: '电感相当于短路,电容相当于开路', answer: '错' },
      { page: 1, type: '判断题', text: 'KVL只适用于闭合回路', answer: '错' },
      { page: 1, type: '判断题', text: 'RLC阻抗都是实数', answer: '错' },
      { page: 1, type: '判断题', text: '谐振时L和C电压相等相位相反', answer: '对' },
      { page: 1, type: '判断题', text: '共射放大器输入电阻越大越好', answer: '对' },
      { page: 1, type: '判断题', text: '截止频率是滤波器开始衰减的频率', answer: '对' },
      { page: 1, type: '判断题', text: '负反馈系数越大稳定性越好', answer: '对' },
      { page: 1, type: '判断题', text: '谐振时L和C电流相等相位相同', answer: '错' },
      { page: 1, type: '判断题', text: 'L和C对电流的阻碍称电抗', answer: '对' },
      { page: 2, type: '填空题', text: '正弦交流电有效值定义为产生相同功率的____值', answer: '直流' },
      { page: 2, type: '填空题', text: '电压与电流成正比,称为____定律', answer: '欧姆' },
      { page: 2, type: '填空题', text: '电感VCR表示为____', answer: 'u=L·di/dt' },
      { page: 2, type: '填空题', text: '电容器交流阻抗称____,与频率成反比', answer: '容抗' },
      { page: 2, type: '填空题', text: '输出与输入同频不同幅相,称____响应', answer: '稳态' },
      { page: 2, type: '填空题', text: '自然频率等于电源频率时电路____', answer: '谐振' },
      { page: 2, type: '填空题', text: 'KCL也称电流____原理', answer: '守恒' },
      { page: 2, type: '填空题', text: '____方法可逐步简化电路求解', answer: '等效变换' },
      { page: 2, type: '填空题', text: '功率因数是有功功率与____的比值', answer: '视在功率' },
      { page: 2, type: '填空题', text: '拉普拉斯变换用于分析____行为', answer: '暂态' },
      { page: 2, type: '计算题', text: 'RLC串联,R=5Ω,L=10mH,C=20μF,f=1kHz,求Z', answer: 'Z=5+j54.87Ω' },
      { page: 2, type: '计算题', text: 'RL,5Ω,15H,12V,电流达稳态63.2%时间', answer: 'τ=3s' },
      { page: 2, type: '计算题', text: 'RLC谐振,Q=100,Us=10mV,求Uc', answer: 'Uc=1V' }
    ]
  }
};

Page({
  data: {
    examId: '', examTitle: '', qIndex: 1, totalQ: 0,
    currentIdx: 0, hasImage: false,
    currentImg: '', imgPage: 1,
    qType: '', qText: '', answer: '', explanation: '',
    userInput: '', answered: false, isCorrect: false,
    correctAnswer: '', autoFocus: false, inputHint: '输入你的答案',
    finished: false, correctCount: 0, totalAnswered: 0, accuracy: 0
  },

  onLoad(o) {
    const examId = o.examId || '';
    const db = examDB[examId];
    if (!db) { wx.showToast({title:'未找到试卷',icon:'none'}); return; }
    this.db = db;
    this.answers = [];
    this.setData({ examId, examTitle: db.title, totalQ: db.totalQ, currentIdx: 0 });
    this.loadQ(0);
  },

  loadQ(idx) {
    if (idx >= this.db.questions.length) { this.finish(); return; }
    const q = this.db.questions[idx];
    this.setData({
      currentIdx: idx, qIndex: idx + 1,
      qType: q.type, qText: q.text,
      answer: q.answer || '', explanation: q.explanation || '',
      hasImage: !!q.img,
      currentImg: q.img ? `/assets/exam_pages/${this.data.examId}/${q.page}.jpg` : '',
      imgPage: q.page,
      answered: false, isCorrect: false,
      userInput: '', correctAnswer: q.answer || '',
      autoFocus: true, finished: false,
      inputHint: q.type === '判断题' ? '输入"对"或"错"' : '输入你的答案'
    });
  },

  onAnswer(e) { this.setData({ userInput: e.detail.value }); },

  submitAnswer() {
    const input = this.data.userInput.trim();
    if (!input) { wx.showToast({title:'请输入答案',icon:'none'}); return; }
    const idx = this.data.currentIdx;
    const q = this.db.questions[idx];
    const correct = q.answer.toLowerCase();
    const user = input.toLowerCase().trim();
    let isCorrect = false;
    if (q.type === '判断题') {
      isCorrect = (correct === '对' && (user === '对' || user === '正确' || user === 'v' || user === 'true')) ||
                  (correct === '错' && (user === '错' || user === '错误' || user === 'x' || user === 'false'));
    } else if (q.type === '单选题' || q.type === '多选题') {
      isCorrect = user.toUpperCase() === correct.toUpperCase();
    } else {
      isCorrect = user.includes(correct.substring(0, Math.min(2, correct.length))) || 
                  correct.includes(user.substring(0, Math.min(2, user.length))) ||
                  user === correct;
    }
    this.answers.push({ idx, user: input, score: isCorrect ? 1 : 0 });
    this.setData({ answered: true, isCorrect, correctAnswer: q.answer, explanation: q.explanation || '' });
  },

  nextQuestion() {
    const next = this.data.currentIdx + 1;
    if (next < this.db.questions.length) {
      this.loadQ(next);
    } else {
      this.finish();
    }
  },

  finish() {
    const total = this.answers.length;
    const correct = this.answers.filter(a => a.score > 0).length;
    this.setData({
      finished: true, correctCount: correct,
      totalAnswered: total, accuracy: total > 0 ? Math.round(correct / total * 100) : 0
    });
  },

  goBack() { wx.navigateBack(); }
});
