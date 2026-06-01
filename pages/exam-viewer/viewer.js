// 五年真题完整数据（含完整题干+选项）
const examDB = {
  exam2019: {
    title: '2019-2020年期末试卷', totalQ: 32, pages: 4,
    list: [
      { type:'多选题', page:1, img:false, text:'在简单电路中,电阻器的电流和电压关系为（）', options:[{k:'A',t:'正比关系'},{k:'B',t:'反比关系'},{k:'C',t:'平方关系'},{k:'D',t:'不存在关系'}], answer:'A' },
      { type:'多选题', page:1, img:false, text:'电流与电压、电阻之间的关系遵循（）', options:[{k:'A',t:'基尔霍夫电压定律'},{k:'B',t:'基尔霍夫电流定律'},{k:'C',t:'欧姆定律'},{k:'D',t:'麦克斯韦方程组'}], answer:'C' },
      { type:'多选题', page:1, img:false, text:'如果两个电阻器并联,总电阻为（）', options:[{k:'A',t:'两个电阻器的和'},{k:'B',t:'两个电阻器的乘积'},{k:'C',t:'两个电阻器的倒数之和的倒数'},{k:'D',t:'两个电阻器的倒数之差'}], answer:'C' },
      { type:'多选题', page:2, img:false, text:'如果两个电阻器串联,总电阻是（）', options:[{k:'A',t:'两个电阻器的和'},{k:'B',t:'两个电阻器的乘积'},{k:'C',t:'两个电阻器的倒数之和'},{k:'D',t:'两个电阻器的倒数之差'}], answer:'A' },
      { type:'多选题', page:2, img:false, text:'电流测量一般使用的电气仪表是（）', options:[{k:'A',t:'电压表'},{k:'B',t:'电流表'},{k:'C',t:'电阻表'},{k:'D',t:'电容表'}], answer:'B' },
      { type:'多选题', page:2, img:false, text:'电压源接在一个回路上但回路中没有电阻器,电流会是（）', options:[{k:'A',t:'无限大'},{k:'B',t:'有限但非零'},{k:'C',t:'零'},{k:'D',t:'无法确定'}], answer:'A' },
      { type:'多选题', page:2, img:false, text:'当一个电容器充电时,其电流逐渐（）', options:[{k:'A',t:'减小'},{k:'B',t:'增大'},{k:'C',t:'不变'},{k:'D',t:'取决于电容值'}], answer:'A' },
      { type:'多选题', page:2, img:false, text:'在交流电路中,电压和电流之间的相位关系由（）描述', options:[{k:'A',t:'欧姆定律'},{k:'B',t:'电容电压电流关系'},{k:'C',t:'欧姆定律和KCL的组合'},{k:'D',t:'电压电流的正弦关系'}], answer:'D' },
      { type:'判断题', page:3, img:false, text:'电感器存储电能的方式是通过磁场。（）', answer:'对' },
      { type:'判断题', page:3, img:false, text:'串联电阻器的总电阻大于等于任一串联电阻器的电阻值。（）', answer:'对' },
      { type:'判断题', page:3, img:false, text:'电压源的正极是高电势的位置。（）', answer:'对' },
      { type:'判断题', page:3, img:false, text:'容抗是电容器对电流的阻碍程度。（）', answer:'对' },
      { type:'判断题', page:3, img:false, text:'电容器可以存储电能,类似于电池。（）', answer:'对' },
      { type:'判断题', page:3, img:false, text:'电流源产生的电流是独立于电路中其他元件的。（）', answer:'对' },
      { type:'判断题', page:3, img:false, text:'电压和电流的相位差永远是零。（）', answer:'错' },
      { type:'判断题', page:3, img:false, text:'并联电阻器的总电阻小于等于任一并联电阻器的电阻值。（）', answer:'对' },
      { type:'判断题', page:3, img:false, text:'单相交流电路中功率的计算公式为P=VI。（）', answer:'错' },
      { type:'判断题', page:3, img:false, text:'电感器的电流和电压之间的相位差为π/2。（）', answer:'对' },
      { type:'判断题', page:3, img:false, text:'电阻器的电流与其电压的相位差始终是零。（）', answer:'对' },
      { type:'判断题', page:3, img:false, text:'理想电流源的内部电阻为零。（）', answer:'错' },
      { type:'名词解释', page:3, img:false, text:'请解释欧姆定律', answer:'电压U与电流I成正比,U=IR' },
      { type:'名词解释', page:3, img:false, text:'请解释阻抗', answer:'电压相量与电流相量之比,Z=R+jX' },
      { type:'名词解释', page:3, img:false, text:'请解释电感器', answer:'储存磁场能量,电压与电流变化率成正比' },
      { type:'名词解释', page:3, img:false, text:'请解释电容器', answer:'储存电场能量,电流与电压变化率成正比' },
      { type:'填空题', page:4, img:false, text:'在一个简单直流电路中,电流和电压之间遵循______定律', answer:'欧姆' },
      { type:'填空题', page:4, img:false, text:'交流电路中电阻器是对电流的______', answer:'阻碍作用' },
      { type:'填空题', page:4, img:false, text:'并联电路总电阻______任何一个并联电阻的电阻值', answer:'小于' },
      { type:'填空题', page:4, img:false, text:'电感器对______的电压具有阻碍作用', answer:'变化' },
      { type:'填空题', page:4, img:false, text:'电容器对______的电压具有阻碍作用', answer:'变化' },
      { type:'填空题', page:4, img:false, text:'在交流电路中,阻抗是由电阻和______两个参数组成', answer:'电抗' },
      { type:'计算题', page:4, img:true, text:'计算图示电路中的电流 i 和电压 U。', answer:'见原卷电路图' },
      { type:'计算题', page:4, img:true, text:'计算图示电路中负载电阻获得的最大功率。', answer:'见原卷电路图' }
    ]
  },
  exam2020: {
    title: '2020-2021年期末试卷', totalQ: 16, pages: 2,
    list: [
      { type:'判断题', page:1, img:false, text:'关联参考方向下功率为正时该元件发出功率。（）', answer:'错' },
      { type:'判断题', page:1, img:false, text:'诺顿定理可将有源线性二端网络等效为电流源与电阻并联。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'叠加定理适用于任何电路,电压、电流、功率都可叠加。（）', answer:'错' },
      { type:'判断题', page:1, img:false, text:'等效变换的含义是对内、外部电路都等效。（）', answer:'错' },
      { type:'判断题', page:1, img:false, text:'电容和电感消耗的平均功率总为零,电阻消耗的无功功率总为零。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'有功和无功功率满足守恒,视在功率不满足守恒。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'关联方向下感性负载电压相量滞后电流相量。（）', answer:'错' },
      { type:'判断题', page:1, img:false, text:'同频正弦量相位差等于初相位差,与时间无关。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'RLC串联谐振时阻抗最小且为电阻性。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'三相负载三角形联接时线电流一定是相电流的√3倍。（）', answer:'对' },
      { type:'填空题', page:1, img:false, text:'一个完整的电路由______三部分组成', answer:'电源、负载、中间环节' },
      { type:'填空题', page:1, img:false, text:'网孔电流法中自电阻取____值,互电阻取____值', answer:'正；负' },
      { type:'填空题', page:1, img:false, text:'戴维南等效Uoc=6V,Req=3欧姆,RL=____时Pmax=____', answer:'3欧姆；3W' },
      { type:'填空题', page:1, img:false, text:'KCL对支路____施加约束,KVL对支路____施加约束', answer:'电流；电压' },
      { type:'填空题', page:1, img:false, text:'提高功率因数的意义是______和______', answer:'减小线路损耗；提高电源利用率' },
      { type:'填空题', page:1, img:false, text:'谐振时电路呈____性,总无功功率为____', answer:'阻；零' }
    ]
  },
  exam2021: {
    title: '2021-2022年期末试卷', totalQ: 27, pages: 5,
    list: [
      { type:'单选题', page:1, img:false, text:'一台电视机120V,0.5A,有功功率为（）', options:[{k:'A',t:'60W'},{k:'B',t:'120W'},{k:'C',t:'60VA'},{k:'D',t:'120VA'}], answer:'A' },
      { type:'单选题', page:1, img:false, text:'R1=4欧姆,R2=6欧姆并联,总电流3A,总电压为（）', options:[{k:'A',t:'2V'},{k:'B',t:'12V'},{k:'C',t:'7.2V'},{k:'D',t:'72V'}], answer:'C' },
      { type:'单选题', page:2, img:false, text:'L=0.1H,R=10欧姆并联,50Hz,电感电压滞后电流相位差（）', options:[{k:'A',t:'45度'},{k:'B',t:'60度'},{k:'C',t:'75度'},{k:'D',t:'90度'}], answer:'D' },
      { type:'单选题', page:2, img:false, text:'C=50微法,220V,60Hz,容抗为（）', options:[{k:'A',t:'53.0欧姆'},{k:'B',t:'883.3欧姆'},{k:'C',t:'318.3欧姆'},{k:'D',t:'106.1欧姆'}], answer:'A' },
      { type:'单选题', page:2, img:false, text:'电压源和电流源同时连接且不在同一分支,正确陈述是（）', options:[{k:'A',t:'可以互相替代'},{k:'B',t:'不可在同一分支共存'},{k:'C',t:'电流源总能替代电压源'},{k:'D',t:'电压源总能替代电流源'}], answer:'B' },
      { type:'单选题', page:2, img:false, text:'RLC串联电路电流超前电压,电路是（）', options:[{k:'A',t:'电感性负载'},{k:'B',t:'电容性负载'},{k:'C',t:'混合负载'},{k:'D',t:'纯电阻负载'}], answer:'B' },
      { type:'单选题', page:3, img:false, text:'交流电路中引入90度相位差的元件最有可能是（）', options:[{k:'A',t:'电容'},{k:'B',t:'电感'},{k:'C',t:'电容或电感'},{k:'D',t:'电阻'}], answer:'C' },
      { type:'填空题', page:3, img:false, text:'R1=100,R2=200,R3=300,R1//R2再与R3串联,总电阻____欧姆', answer:'366.7' },
      { type:'填空题', page:3, img:false, text:'12V,R1=4,R2=6并联,总电流____A', answer:'5' },
      { type:'填空题', page:3, img:false, text:'R=10,C=0.1微法串联,时间常数____s', answer:'0.000001' },
      { type:'填空题', page:3, img:false, text:'V(t)=10sin(50t+30度)V,角频率____rad/s', answer:'50' },
      { type:'填空题', page:3, img:false, text:'RLC电路L=0.2H,C=10微法,R=50,电流达一半时能量____J', answer:'0.025' },
      { type:'填空题', page:3, img:false, text:'三角电路R1=100,R2=200,R3=300,R1//R2再//R3,总电阻____', answer:'54.5' },
      { type:'判断题', page:4, img:false, text:'并联电路中总电流等于各支路电流之和。（）', answer:'对' },
      { type:'判断题', page:4, img:false, text:'电位器是可変电阻器,可调节电路中的电压。（）', answer:'对' },
      { type:'判断题', page:4, img:false, text:'串联电路中总电阻等于各电阻之和。（）', answer:'对' },
      { type:'判断题', page:4, img:false, text:'欧姆定律V=IR适用于线性电阻。（）', answer:'对' },
      { type:'判断题', page:4, img:false, text:'并联电路中支路电流之和等于总电流。（）', answer:'对' },
      { type:'判断题', page:4, img:false, text:'电阻越大通过它的电流就越大。（）', answer:'错' },
      { type:'判断题', page:4, img:false, text:'可以用欧姆定律来计算电压。（）', answer:'对' },
      { type:'判断题', page:4, img:false, text:'Ohm定律适用于线性电阻器的电流-电压关系。（）', answer:'对' },
      { type:'判断题', page:4, img:false, text:'交流电流方向变化,电压也会相应变化。（）', answer:'对' },
      { type:'判断题', page:4, img:false, text:'电阻器是能存储电能的元件。（）', answer:'错' },
      { type:'计算题', page:4, img:true, text:'已知Us=100V,R1=2k,R2=8k,R3可变,求三种情况下R2两端电压及R3电流。', answer:'见原卷电路图' },
      { type:'计算题', page:5, img:true, text:'已知U=3V,求图示电路中R的值。', answer:'见原卷电路图' },
      { type:'简答题', page:5, img:false, text:'简要解释谐振电路的原理,包括谐振频率及该频率下电流电压的特点。', answer:'f0=1/(2pi根号LC),谐振时Z=R最小' },
      { type:'简答题', page:5, img:false, text:'解释有功功率和无功功率的概念、计算和在电路中的作用。', answer:'P=UIcosphi实际消耗;Q=UIsinphi能量交换' }
    ]
  },
  exam2022: {
    title: '2022-2023年期末试卷', totalQ: 24, pages: 6,
    list: [
      { type:'判断题', page:1, img:false, text:'电路中只有R、L、C三种元件可以储存和释放电能。（）', answer:'错' },
      { type:'判断题', page:1, img:false, text:'串联电路中总电阻等于各个电阻之和。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'并联电路中总电阻等于各电阻倒数之和的倒数。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'电感会产生电压降,电流随时间变化而变化。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'相位是指电流和电压之间的时间差。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'电容器可储存电能并随时间推移逐渐释放。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'恒流源输出电流与负载电阻无关,始终提供稳定电流。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'三角波是一种非周期波形。（）', answer:'错' },
      { type:'判断题', page:2, img:false, text:'RLC中电抗相等互相抵消时电路处于共振状态。（）', answer:'对' },
      { type:'判断题', page:2, img:false, text:'电流控制电压源的输出电压与负载电阻大小有关。（）', answer:'错' },
      { type:'填空题', page:2, img:false, text:'V=IR,已知R和I则V=____', answer:'IR' },
      { type:'填空题', page:2, img:false, text:'串联总电阻RT=____', answer:'R1+R2+R3+...' },
      { type:'填空题', page:2, img:false, text:'V=I*R中R代表____', answer:'电阻' },
      { type:'填空题', page:2, img:false, text:'节点法基于电流在节点上____的原理', answer:'守恒' },
      { type:'填空题', page:2, img:false, text:'基尔霍夫第一定律称____,第二定律称____', answer:'KCL；KVL' },
      { type:'填空题', page:2, img:false, text:'电压极性及电流方向假设称正负号____', answer:'参考方向' },
      { type:'填空题', page:2, img:false, text:'节点电压法方程组个数等于____', answer:'节点数-1' },
      { type:'填空题', page:2, img:false, text:'戴维南等效电阻Req=____/____', answer:'Uoc；Isc' },
      { type:'单选题', page:3, img:false, text:'傅里叶级数可将周期函数分解为（）', options:[{k:'A',t:'正弦函数'},{k:'B',t:'余弦函数'},{k:'C',t:'正弦和余弦函数'},{k:'D',t:'指数函数'}], answer:'C' },
      { type:'单选题', page:3, img:false, text:'AM调制指的是（）', options:[{k:'A',t:'模拟调制'},{k:'B',t:'脉冲调制'},{k:'C',t:'频率调制'},{k:'D',t:'幅度调制'}], answer:'D' },
      { type:'单选题', page:3, img:false, text:'电感在电路中的作用是（）', options:[{k:'A',t:'储存电能'},{k:'B',t:'限制电流变化率'},{k:'C',t:'降低电压'},{k:'D',t:'放大电压'}], answer:'B' },
      { type:'单选题', page:3, img:false, text:'串联谐振L增大时共振频率（）', options:[{k:'A',t:'增大'},{k:'B',t:'减小'},{k:'C',t:'不变'},{k:'D',t:'无法确定'}], answer:'B' },
      { type:'单选题', page:4, img:false, text:'均值滤波可减小信号的（）', options:[{k:'A',t:'高频分量'},{k:'B',t:'低频分量'},{k:'C',t:'直流分量'},{k:'D',t:'噪声分量'}], answer:'D' },
      { type:'单选题', page:4, img:false, text:'传输线距离增加信号幅度（）', options:[{k:'A',t:'减小'},{k:'B',t:'增大'},{k:'C',t:'不变'},{k:'D',t:'不确定'}], answer:'A' },
      { type:'单选题', page:4, img:false, text:'巴特沃斯滤波器特点是（）', options:[{k:'A',t:'通带阻带都有衰减'},{k:'B',t:'通带没有衰减'},{k:'C',t:'阻带没有衰减'},{k:'D',t:'衰减率相等'}], answer:'B' }
    ]
  },
  exam2023: {
    title: '2023-2024年期末试卷', totalQ: 27, pages: 2,
    list: [
      { type:'名词解释', page:1, img:false, text:'请解释基尔霍夫定律', answer:'KCL:sum i=0; KVL:sum u=0' },
      { type:'名词解释', page:1, img:false, text:'请解释电流源', answer:'输出电流恒定,电压由外电路决定' },
      { type:'名词解释', page:1, img:false, text:'请解释戴维南定理', answer:'含源二端网络等效为Uoc串联Req' },
      { type:'名词解释', page:1, img:false, text:'请解释相位', answer:'正弦量初始角度,决定t=0瞬时值' },
      { type:'名词解释', page:1, img:false, text:'请解释阻抗', answer:'Z=R+jX,电压相量与电流相量之比' },
      { type:'判断题', page:1, img:false, text:'电感相当于短路,电容相当于开路。（）', answer:'错' },
      { type:'判断题', page:1, img:false, text:'基尔霍夫电压定律只适用于闭合回路。（）', answer:'错' },
      { type:'判断题', page:1, img:false, text:'电阻、电感和电容的阻抗都是实数。（）', answer:'错' },
      { type:'判断题', page:1, img:false, text:'谐振时电感电容电压相等相位相反。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'共射放大器中输入电阻越大越好。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'截止频率是滤波器开始衰减的频率。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'负反馈放大器中反馈系数越大稳定性越好。（）', answer:'对' },
      { type:'判断题', page:1, img:false, text:'谐振时电感电容电流相等相位相同。（）', answer:'错' },
      { type:'判断题', page:1, img:false, text:'电感和电容对电流的阻碍作用称为电抗。（）', answer:'对' },
      { type:'填空题', page:2, img:false, text:'正弦交流电有效值定义为产生相同功率的____值', answer:'直流' },
      { type:'填空题', page:2, img:false, text:'电压与电流成正比的关系称为____定律', answer:'欧姆' },
      { type:'填空题', page:2, img:false, text:'电感VCR可表示为____', answer:'u=Ldi/dt' },
      { type:'填空题', page:2, img:false, text:'电容器交流阻抗称____,与频率成反比', answer:'容抗' },
      { type:'填空题', page:2, img:false, text:'输出与输入同频不同幅相称____响应', answer:'稳态' },
      { type:'填空题', page:2, img:false, text:'自然频率等于电源频率时电路____', answer:'谐振' },
      { type:'填空题', page:2, img:false, text:'拉普拉斯变换用于分析电路的____行为', answer:'暂态' },
      { type:'填空题', page:2, img:false, text:'KCL也称电流____原理', answer:'守恒' },
      { type:'填空题', page:2, img:false, text:'____方法可逐步简化电路求解', answer:'等效变换' },
      { type:'填空题', page:2, img:false, text:'功率因数是有功功率与____的比值', answer:'视在功率' },
      { type:'计算题', page:2, img:true, text:'R=5欧姆,L=10mH,C=20uF串联,f=1kHz,求阻抗Z。', answer:'Z=5+j54.87欧姆' },
      { type:'计算题', page:2, img:true, text:'R1=10,R2=20,R3=30并联,求总电阻Rt。', answer:'Rt=5.45欧姆' },
      { type:'计算题', page:2, img:true, text:'RL串联,R=5,L=15H,12VDC,电流达稳态63.2%所需时间。', answer:'tau=3s' }
    ]
  }
};


Page({
  data: {
    examId: '', examTitle: '', totalQ: 0, qIndex: 1, currentIdx: 0,
    qType: '', qText: '', options: [], answer: '',
    hasImage: false, currentImg: '', imgPage: 1,
    userChoice: '', userInput: '',
    totalAnswered: 0, examImgLoaded: false, examImgFailed: false,
    answerStatus: [], // true/false per question
    userAnswers: [],  // user's answer per question
    submitted: false, showSheet: false,
    correctCount: 0, score: 0, accuracy: 0, results: []
  },

  onLoad(o) {
    const examId = o.examId || '';
    const db = examDB[examId];
    if (!db) { wx.showToast({title:'未找到试卷',icon:'none'}); return; }
    this.db = db;
    const totalQ = db.totalQ;
    this.setData({
      examId, examTitle: db.title, totalQ,
      answerStatus: new Array(totalQ).fill(false),
      userAnswers: new Array(totalQ).fill(''),
      currentIdx: 0, qIndex: 1, submitted: false
    });
    this.loadQ(0);
  },

  loadQ(idx) {
    if (!this.db || idx >= this.db.list.length) return;
    const q = this.db.list[idx];
    const userAns = this.data.userAnswers[idx] || '';
    const isChoice = q.type === '单选题' || q.type === '多选题';
    // 有图则直接显示（image组件自动加载）
    this.setData({
      currentIdx: idx, qIndex: idx + 1,
      qType: q.type, qText: q.text, options: q.options || [],
      answer: q.answer || '', hasImage: !!q.img,
      currentImg: q.img ? `https://cdn.jsdelivr.net/gh/666-nailong/superpowers@images-v1/exam_${this.data.examId}_${q.page}.jpg` : '',
      imgPage: q.page,
      userChoice: isChoice ? userAns : '',
      userInput: isChoice ? '' : userAns,
      examImgLoaded: false
    });
  },

  selectOpt(e) {
    const key = e.currentTarget.dataset.key;
    const idx = this.data.currentIdx;
    const answers = [...this.data.userAnswers];
    const status = [...this.data.answerStatus];
    answers[idx] = key;
    status[idx] = true;
    const totalAnswered = status.filter(Boolean).length;
    this.setData({ userChoice: key, userAnswers: answers, answerStatus: status, totalAnswered });
  },

  selectJudge(e) {
    const val = e.currentTarget.dataset.val;
    const idx = this.data.currentIdx;
    const answers = [...this.data.userAnswers];
    const status = [...this.data.answerStatus];
    answers[idx] = val;
    status[idx] = true;
    const totalAnswered = status.filter(Boolean).length;
    this.setData({ userChoice: val, userAnswers: answers, answerStatus: status, totalAnswered });
  },

  onInput(e) {
    const idx = this.data.currentIdx;
    const answers = [...this.data.userAnswers];
    const status = [...this.data.answerStatus];
    answers[idx] = e.detail.value;
    status[idx] = !!e.detail.value.trim();
    const totalAnswered = status.filter(Boolean).length;
    this.setData({ userInput: e.detail.value, userAnswers: answers, answerStatus: status, totalAnswered });
  },

  prevQ() { if (this.data.currentIdx > 0) this.loadQ(this.data.currentIdx - 1); },
  nextQ() { if (this.data.currentIdx < this.db.list.length - 1) this.loadQ(this.data.currentIdx + 1); },
  jumpTo(e) { this.loadQ(parseInt(e.currentTarget.dataset.idx)); this.setData({ showSheet: false }); },
  toggleSheet() { this.setData({ showSheet: !this.data.showSheet }); },

  submitAll() {
    const list = this.db.list;
    const answers = this.data.userAnswers;
    let correct = 0;
    const results = list.map((q, i) => {
      const userAns = answers[i] || '';
      const isCorrect = compareAnswer(q, userAns);
      if (isCorrect) correct++;
      return { idx: i + 1, userAnswer: userAns || '(未作答)', correct: isCorrect, correctAnswer: q.answer };
    });
    const accuracy = Math.round(correct / list.length * 100);
    this.setData({
      submitted: true, correctCount: correct, score: accuracy, accuracy,
      results, showSheet: false
    });
  },

  onExamImgLoad() { this.setData({ examImgLoaded: true, examImgFailed: false }); },

  onExamImgError() {
    if (!this.data.examImgFailed) {
      // 切备用CDN
      const oldUrl = this.data.currentImg;
      const newUrl = oldUrl.replace('cdn.jsdelivr.net/gh/', 'raw.githubusercontent.com/').replace('@images-v1/', '/images-v1/');
      this.setData({ currentImg: newUrl, examImgFailed: true, examImgLoaded: false });
    } else {
      this.setData({ examImgLoaded: true });
      wx.showToast({ title: '图片加载失败', icon: 'none' });
    }
  },

  retryExamImg() {
    this.setData({
      examImgFailed: false, examImgLoaded: false,
      currentImg: `https://cdn.jsdelivr.net/gh/666-nailong/superpowers@images-v1/exam_${this.data.examId}_${this.data.imgPage}.jpg`
    });
  },
  goBack() { wx.navigateBack(); }
});

function compareAnswer(q, userAns) {
  if (!userAns) return false;
  const u = userAns.toString().trim().toLowerCase();
  const c = q.answer.toLowerCase();
  if (q.type === '判断题') {
    return (c === '对' && (u === '对' || u === '正确')) ||
           (c === '错' && (u === '错' || u === '错误'));
  }
  if (q.options && q.options.length > 0) {
    return u === c;
  }
  return u.includes(c.substring(0, 2)) || c.includes(u.substring(0, 2));
}
