// 五年真题全部题目 + 标准答案（来自DOCX答案解析）
const examDB = {
  exam2019: {
    title: '2019-2020年期末试卷',
    totalQ: 32,
    pages: 4,
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
      { page: 3, type: '填空题', text: '在一个简单直流电路中,电流和电压之间遵循______定律', answer: '欧姆' },
      { page: 3, type: '填空题', text: '交流电路中电阻器是对电流的______', answer: '阻碍作用' },
      { page: 4, type: '填空题', text: '并联电路总电阻______任何一个并联电阻的电阻值', answer: '小于' },
      { page: 4, type: '填空题', text: '电感器对______的电压具有阻碍作用', answer: '变化' },
      { page: 4, type: '填空题', text: '电容器对______的电压具有阻碍作用', answer: '变化' },
      { page: 4, type: '填空题', text: '在交流电路中,阻抗是由电阻和______两个参数组成', answer: '电抗' },
      { page: 4, type: '计算题', text: '计算图示电路中的电流i和电压U（需看原卷电路图）', answer: '见原卷' },
      { page: 4, type: '计算题', text: '计算图示电路中负载电阻获得的最大功率（需看原卷电路图）', answer: '见原卷' }
    ]
  },
  exam2020: {
    title: '2020-2021年期末试卷',
    totalQ: 16,
    pages: 2,
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
      { page: 2, type: '简答题', text: '构成有功功率和无功功率的必要条件是什么?简要说明有功功率和无功功率的特点', answer: 'P=UIcosφ需有电阻分量;Q=UIsinφ需有电抗分量' },
      { page: 2, type: '简答题', text: '请说明串联谐振和并联谐振各自的显著特点', answer: '串联谐振Z最小;并联谐振Z最大' },
      { page: 2, type: '计算题', text: '试用支路电流法求电路各支路电流（需看原卷电路图）', answer: '见原卷' },
      { page: 2, type: '计算题', text: '试应用节点分析法求各支路电流（需看原卷电路图）', answer: '见原卷' },
      { page: 2, type: '计算题', text: '试判断两线圈的同名端（需看原卷电路图）', answer: '见原卷' }
    ]
  },
  exam2021: {
    title: '2021-2022年期末试卷',
    totalQ: 27,
    pages: 5,
    questions: [
      { page: 1, type: '单选题', text: '一台电视机的电源电压为120V,电流为0.5A,计算有功功率', answer: 'B' },
      { page: 1, type: '单选题', text: '两个电阻R1=4Ω,R2=6Ω并联,总电流3A,计算总电压', answer: 'C' },
      { page: 1, type: '单选题', text: '电感L=0.1H和R=10Ω并联,频率50Hz,计算电感电压滞后电流的相位差', answer: 'D' },
      { page: 2, type: '单选题', text: '电容C=50μF,电压220V,频率60Hz,计算容抗', answer: 'A' },
      { page: 2, type: '单选题', text: '电压源和电流源同时连接,选择正确陈述', answer: 'B' },
      { page: 2, type: '单选题', text: 'RLC串联电路,电流超前电压,选择正确陈述', answer: '容性' },
      { page: 3, type: '单选题', text: '未标记元件在交流电路中引入90°相位差,最有可能是', answer: 'C' },
      { page: 3, type: '填空题', text: '电阻R1=100Ω,R2=200Ω,R3=300Ω,R1与R2并联再与R3串联,总电阻为', answer: '366.7' },
      { page: 3, type: '填空题', text: '电源电压12V,R1=4Ω,R2=6Ω并联,总电流为', answer: '5' },
      { page: 3, type: '填空题', text: 'R=10Ω,C=0.1μF串联,电路的时间常数为', answer: '1μs' },
      { page: 3, type: '填空题', text: 'V(t)=10sin(50t+30°)V,R=5Ω,C=0.02F,角频率为', answer: '50' },
      { page: 4, type: '填空题', text: 'RLC电路中,L=0.2H,C=10μF,R=50Ω,能量为', answer: '0.025' },
      { page: 4, type: '判断题', text: '欧姆定律描述了电压、电流和电阻之间的关系,即V=IR', answer: '对' },
      { page: 4, type: '判断题', text: '在并联电路中,电流在各个支路中分流,支路电流之和等于总电流', answer: '对' },
      { page: 4, type: '判断题', text: '电阻越大,通过它的电流就越大', answer: '错' },
      { page: 4, type: '判断题', text: '我们可以用欧姆定律来计算电压', answer: '对' },
      { page: 4, type: '判断题', text: 'Ohm定律适用于线性电阻器中的电流-电压关系', answer: '对' },
      { page: 4, type: '判断题', text: '交流电路中,由于电流的方向随时间变化,电压也会相应地变化', answer: '对' },
      { page: 4, type: '判断题', text: '电阻器是一个能存储电能的元件', answer: '错' },
      { page: 4, type: '判断题', text: '三角形电路R1=100Ω,R2=200Ω,R3=300Ω,总电阻', answer: '54.5' },
      { page: 4, type: '计算题', text: '求电阻R两端的电压及R3中通过的电流（需看原卷电路图）', answer: '见原卷' },
      { page: 5, type: '计算题', text: '已知U=3V,求R（需看原卷电路图）', answer: '见原卷' },
      { page: 5, type: '简答题', text: '简要解释谐振电路的原理,包括什么是谐振频率', answer: 'f₀=1/(2π√LC),谐振时电路呈纯阻性' },
      { page: 5, type: '简答题', text: '解释有功功率和无功功率的概念及作用', answer: 'P=UIcosφ实际做功,Q=UIsinφ能量交换' }
    ]
  },
  exam2022: {
    title: '2022-2023年期末试卷',
    totalQ: 24,
    pages: 6,
    questions: [
      { page: 1, type: '判断题', text: '电路中只有电阻、电容和电感三种元件可以储存和释放电能', answer: '错' },
      { page: 1, type: '判断题', text: '串联电路中,总电阻等于各个电阻之和', answer: '对' },
      { page: 1, type: '判断题', text: '并联电路中,总电阻等于各个电阻的倒数之和的倒数', answer: '对' },
      { page: 1, type: '判断题', text: '电感是一种会产生电压降的元件,电流随时间的变化而变化', answer: '对' },
      { page: 1, type: '判断题', text: '交流电路中,相位是指电流和电压之间的时间差', answer: '对' },
      { page: 1, type: '判断题', text: '电容器可以在电路中储存电能', answer: '对' },
      { page: 1, type: '判断题', text: 'RLC电路中,当电容和电感的电抗相等且互相抵消时,电路处于共振状态', answer: '对' },
      { page: 2, type: '判断题', text: '电流控制电压源的输出电压与负载电阻大小有关', answer: '错' },
      { page: 2, type: '单选题', text: '应用欧姆定律,若电阻为R,电流为I,则其电压V为', answer: 'V=IR' },
      { page: 2, type: '单选题', text: '多个电阻在电路中串联时,总电阻可用公式计算', answer: 'RT=R1+R2+R3+...' },
      { page: 2, type: '单选题', text: '奥姆定律表达式为V=I×?,代表', answer: 'R(电阻)' },
      { page: 2, type: '单选题', text: '节点法基于电流在节点上______的原理', answer: '守恒' },
      { page: 2, type: '单选题', text: '基尔霍夫第一定律也称为______定律', answer: 'KCL(电流)' },
      { page: 2, type: '单选题', text: '电压源的正负极性和电流方向的假设称为', answer: '参考方向' },
      { page: 3, type: '单选题', text: '傅里叶级数可以将一个周期函数分解成一系列', answer: 'C' },
      { page: 3, type: '单选题', text: 'AM调制指的是', answer: 'D' },
      { page: 3, type: '单选题', text: '电感在电路中的作用是', answer: 'B' },
      { page: 3, type: '单选题', text: '串联谐振,当电感L增大时,共振频率将会', answer: 'B' },
      { page: 4, type: '单选题', text: '均值滤波可以减小信号的', answer: 'D' },
      { page: 4, type: '单选题', text: '在有限长线上传输的信号,随着距离增加,信号的', answer: 'A' },
      { page: 4, type: '单选题', text: '巴特沃斯滤波器的特点是', answer: 'B' },
      { page: 4, type: '绘图题', text: '绘制三阶无源电容滤波器的简化电路图', answer: '见原卷' },
      { page: 5, type: '绘图题', text: '画出一个四线制电阻测量电路的示意图', answer: '见原卷' },
      { page: 5, type: '绘图题', text: '绘制一个多电源电路的示意图', answer: '见原卷' },
      { page: 5, type: '计算题', text: '求t>0时u(t)（需看原卷电路图）', answer: '见原卷' },
      { page: 6, type: '计算题', text: '求电路中各电源提供的功率（需看原卷电路图）', answer: '见原卷' }
    ]
  },
  exam2023: {
    title: '2023-2024年期末试卷',
    totalQ: 27,
    pages: 2,
    questions: [
      { page: 1, type: '名词解释', text: '基尔霍夫定律', answer: 'KCL:∑i=0,KVL:∑u=0' },
      { page: 1, type: '名词解释', text: '电流源', answer: '输出电流恒定,电压由外电路决定' },
      { page: 1, type: '名词解释', text: '戴维南定理', answer: '含源二端网络等效为Uoc串联Req' },
      { page: 1, type: '名词解释', text: '相位', answer: '正弦量在t=0时刻的角度,决定初始值' },
      { page: 1, type: '名词解释', text: '阻抗', answer: 'Z=R+jX,电压相量与电流相量之比' },
      { page: 1, type: '判断题', text: '电感元件相当于短路,电容元件相当于开路', answer: '错' },
      { page: 1, type: '判断题', text: '基尔霍夫电压定律只适用于闭合回路', answer: '错' },
      { page: 1, type: '判断题', text: '电阻、电感和电容的阻抗都是实数', answer: '错' },
      { page: 1, type: '判断题', text: '当电路处于谐振状态时,电感元件和电容元件的电压相等且相位相反', answer: '对' },
      { page: 1, type: '判断题', text: '在共射放大器中,输入电阻越大越好', answer: '对' },
      { page: 1, type: '判断题', text: '截止频率是指滤波器开始衰减的频率', answer: '对' },
      { page: 1, type: '判断题', text: '在负反馈放大器中,反馈系数越大,放大器的稳定性越好', answer: '对' },
      { page: 1, type: '判断题', text: '当电路处于谐振状态时,电感元件和电容元件的电流相等且相位相同', answer: '错' },
      { page: 1, type: '判断题', text: '电感器和电容器对电流的阻碍作用称为电抗', answer: '对' },
      { page: 2, type: '填空题', text: '正弦波形交流电的有效值定义为产生相同功率的______值', answer: '直流' },
      { page: 2, type: '填空题', text: '电流通过电阻时,电压与电流成正比,称为______定律', answer: '欧姆' },
      { page: 2, type: '填空题', text: '电感元件中的电压与电流变化率成正比,可表示为______', answer: 'u=L·di/dt' },
      { page: 2, type: '填空题', text: '电容器在交流电路中的阻抗称为______,与频率成反比', answer: '容抗' },
      { page: 2, type: '填空题', text: '输出与输入同频但幅度相位不同,称为______响应', answer: '稳态' },
      { page: 2, type: '填空题', text: '自然频率等于电源频率时,电路处于______状态', answer: '谐振' },
      { page: 2, type: '填空题', text: 'KCL也称为电流______原理', answer: '守恒' },
      { page: 2, type: '填空题', text: '使用______方法可逐步简化电路求解', answer: '等效变换' },
      { page: 2, type: '填空题', text: '功率因数是指有功功率与______的比值', answer: '视在功率' },
      { page: 2, type: '填空题', text: '拉普拉斯变换用于分析电路的______行为', answer: '暂态' },
      { page: 2, type: '计算题', text: 'R=5Ω,L=10mH,C=20μF串联,f=1kHz,求阻抗Z', answer: 'Z=5+j54.87Ω' },
      { page: 2, type: '计算题', text: 'RL串联电路,R=5Ω,L=15H,12VDC,求电流达稳态63.2%所需时间', answer: 'τ=3s' },
      { page: 2, type: '计算题', text: 'RLC串联谐振,Q=100,Us=10mV,求Uc', answer: 'Uc=1V' }
    ]
  }
};

Page({
  data: {
    examId: '', examTitle: '', qIndex: 1, totalQ: 0, totalPages: 0,
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
    this.answers = []; // track user answers
    this.setData({
      examId, examTitle: db.title,
      totalQ: db.totalQ, totalPages: db.pages,
      qIndex: 1
    });
    this.loadQ(0);
  },

  loadQ(idx) {
    const q = this.db.questions[idx];
    if (!q) { this.finish(); return; }
    this.setData({
      qIndex: idx + 1, qType: q.type, qText: q.text,
      answer: q.answer || '',
      explanation: q.explanation || '',
      imgPage: q.page,
      currentImg: `/assets/exam_pages/${this.data.examId}/${q.page}.jpg`,
      answered: false, isCorrect: false,
      userInput: '', correctAnswer: q.answer || '',
      autoFocus: true, inputHint: q.type === '判断题' ? '输入"对"或"错"' : '输入你的答案',
      finished: false
    });
    this.currentIdx = idx;
  },

  onAnswer(e) { this.setData({ userInput: e.detail.value }); },

  submitAnswer() {
    const input = this.data.userInput.trim();
    if (!input) { wx.showToast({title:'请输入答案',icon:'none'}); return; }
    const q = this.db.questions[this.currentIdx];
    const correct = q.answer.toLowerCase();
    const user = input.toLowerCase();
    // Flexible matching
    const isCorrect = user === correct || 
      (correct === '对' && (user === '对' || user === '正确' || user === 'true')) ||
      (correct === '错' && (user === '错' || user === '错误' || user === 'false')) ||
      (correct.length > 2 && user.includes(correct.substring(0, Math.min(3, correct.length))));
    
    const score = isCorrect ? 1 : 0;
    this.answers.push({ idx: this.currentIdx, user: input, score });
    this.setData({
      answered: true, isCorrect,
      correctAnswer: q.answer,
      explanation: q.explanation || ''
    });
  },

  nextQuestion() {
    if (this.currentIdx + 1 < this.db.questions.length) {
      this.loadQ(this.currentIdx + 1);
    } else {
      this.finish();
    }
  },

  finish() {
    const total = this.answers.length;
    const correct = this.answers.filter(a => a.score > 0).length;
    const accuracy = total > 0 ? Math.round(correct / total * 100) : 0;
    this.setData({
      finished: true, correctCount: correct,
      totalAnswered: total, accuracy
    });
  },

  goBack() { wx.navigateBack(); }
});
