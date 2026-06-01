/**
 * 本地存储工具模块
 * 默认数据直接内嵌，不依赖外部模块
 */

// ===== 默认课件数据 =====
const defaultCourseware = {
  chapters: [
    { id: "ch01", title: "第1章 电路的基本概念和基本约束", order: 1, files: [
      { id: "ch01_01", title: "电路的基本概念和基本约束（上）", totalPages: 1 },
      { id: "ch01_02", title: "电路的基本概念和基本约束（下）", totalPages: 1 }
    ]},
    { id: "ch02", title: "第2章 电阻电路的等效分析", order: 2, files: [
      { id: "ch02_01", title: "电阻电路的等效分析", totalPages: 1 }
    ]},
    { id: "ch03", title: "第3章 电阻电路的方程分析法", order: 3, files: [
      { id: "ch03_01", title: "电阻电路的方程分析法", totalPages: 1 }
    ]},
    { id: "ch04", title: "第4章 电路定理", order: 4, files: [
      { id: "ch04_01", title: "电路定理", totalPages: 1 }
    ]},
    { id: "ch05", title: "第5章 正弦稳态电路的相量法基础", order: 5, files: [
      { id: "ch05_01", title: "正弦稳态电路的相量法基础", totalPages: 1 }
    ]},
    { id: "ch06", title: "第6章 周期信号电路的稳态分析", order: 6, files: [
      { id: "ch06_01", title: "周期信号电路的稳态分析", totalPages: 1 }
    ]},
    { id: "ch07", title: "第7章 正弦稳态下的频率特性与谐振", order: 7, files: [
      { id: "ch07_01", title: "正弦稳态下的频率特性与谐振", totalPages: 1 }
    ]},
    { id: "ch08", title: "第8章 线性动态电路的时域分析", order: 8, files: [
      { id: "ch08_01", title: "线性动态电路的时域分析", totalPages: 1 }
    ]}
  ]
};

// ===== 默认题库数据（精简版） =====
const defaultQuestions = {
  chapters: [
    { id: "qch01", order: 1, title: "第一章 电路模型和电路定律", questions: [
      { id: "q001", type: "choice", difficulty: 1, question: "理想电压源的特点是什么？", options: ["A. 输出电压恒定，电流由外电路决定", "B. 输出电流恒定，电压由外电路决定", "C. 输出电压和电流都恒定", "D. 输出电压和电流都由外电路决定"], answer: 0, explanation: "理想电压源的内阻为0，输出电压恒定，电流由外电路决定。不允许短路。", chapter: "qch01", tags: ["电压源"] },
      { id: "q002", type: "choice", difficulty: 1, question: "KCL定律适用于什么电路？", options: ["A. 仅直流电路", "B. 仅交流电路", "C. 任何集总参数电路", "D. 仅线性电路"], answer: 2, explanation: "KCL对所有集总参数电路均成立，与元件性质、信号类型无关。", chapter: "qch01", tags: ["KCL"] },
      { id: "q003", type: "fill", difficulty: 1, question: "习惯上把______运动方向规定为电流的方向。", options: [], answer: "正电荷", explanation: "电流参考方向：正电荷移动方向为实际方向。", chapter: "qch01", tags: ["电流"] },
      { id: "q004", type: "judge", difficulty: 1, question: "直流电路中电容相当于短路，电感相当于开路。", options: [], answer: 0, explanation: "直流稳态时电容相当于开路（隔直），电感相当于短路（通直）。题目说反了。", chapter: "qch01", tags: ["电容", "电感"] }
    ]},
    { id: "qch02", order: 2, title: "第二章 电阻电路的等效变换", questions: [
      { id: "q005", type: "choice", difficulty: 2, question: "几个电压源串联的等效电压等于？", options: ["A. 电压代数和", "B. 电压平均值", "C. 电压最大值", "D. 电压最小值"], answer: 0, explanation: "理想电压源串联：Us_eq = Us1 + Us2 + ...", chapter: "qch02", tags: ["等效变换"] },
      { id: "q006", type: "choice", difficulty: 2, question: "某元件与理想电压源并联，其等效关系为？", options: ["A. 该元件", "B. 该理想电压源", "C. 两者串联", "D. 都不保留"], answer: 1, explanation: "理想电压源与任意元件并联→对外仅保留电压源。", chapter: "qch02", tags: ["等效变换"] }
    ]},
    { id: "qch03", order: 3, title: "第三章 电阻电路方程分析法", questions: [
      { id: "q007", type: "choice", difficulty: 2, question: "网孔电流法适用于什么电路？", options: ["A. 任何电路", "B. 仅平面电路", "C. 仅直流电路", "D. 仅线性电路"], answer: 1, explanation: "网孔概念仅存在于平面电路。", chapter: "qch03", tags: ["网孔法"] }
    ]},
    { id: "qch04", order: 4, title: "第四章 电路定理", questions: [
      { id: "q008", type: "choice", difficulty: 2, question: "叠加定理可以用来计算？", options: ["A. 电流", "B. 电压", "C. 功率", "D. 电流和电压"], answer: 3, explanation: "功率是平方关系不能用叠加。", chapter: "qch04", tags: ["叠加定理"] },
      { id: "q009", type: "choice", difficulty: 3, question: "最大功率传输条件RL=？", options: ["A. 2Rs", "B. Rs", "C. Rs/2", "D. 与Rs无关"], answer: 1, explanation: "RL=Req，Pmax=Uoc²/(4Req)。", chapter: "qch04", tags: ["最大功率"] }
    ]},
    { id: "qch05", order: 5, title: "第五章 正弦稳态电路", questions: [
      { id: "q010", type: "choice", difficulty: 2, question: "感抗XL与频率f的关系？", options: ["A. XL=2πfL", "B. XL=1/(2πfL)", "C. XL=L/(2πf)", "D. XL=f/L"], answer: 0, explanation: "XL=ωL=2πfL，与频率成正比。", chapter: "qch05", tags: ["感抗"] }
    ]},
    { id: "qch06", order: 6, title: "第六章 耦合电感与三相电路", questions: [
      { id: "q011", type: "choice", difficulty: 3, question: "Y接时线电压UL与相电压UP的关系？", options: ["A. UL=UP", "B. UL=√2UP", "C. UL=√3UP", "D. UL=3UP"], answer: 2, explanation: "Y接：UL=√3·UP∠30°，IL=IP。", chapter: "qch06", tags: ["三相"] }
    ]},
    { id: "qch07", order: 7, title: "第七章 谐振与频率特性", questions: [
      { id: "q012", type: "choice", difficulty: 2, question: "RLC串联谐振时阻抗？", options: ["A. 最大", "B. 最小", "C. 等于XL", "D. 等于XC"], answer: 1, explanation: "串联谐振Z=R最小，电流最大。", chapter: "qch07", tags: ["谐振"] }
    ]},
    { id: "qch08", order: 8, title: "第八章 一阶动态电路", questions: [
      { id: "q013", type: "choice", difficulty: 2, question: "RC电路时间常数τ=？", options: ["A. R/C", "B. C/R", "C. RC", "D. 1/(RC)"], answer: 2, explanation: "RC电路τ=Req·C，RL电路τ=L/Req。", chapter: "qch08", tags: ["时间常数"] },
      { id: "q014", type: "choice", difficulty: 2, question: "无外加激励仅靠储能释放的响应称为？", options: ["A. 零状态响应", "B. 零输入响应", "C. 全响应", "D. 阶跃响应"], answer: 1, explanation: "零输入响应：f(t)=f(0+)e^(-t/τ)。", chapter: "qch08", tags: ["响应"] }
    ]}
  ],
  pastExams: [
    { id: "exam2019", year: "2019-2020", title: "2019-2020年期末试卷", totalQ: 32, questions: ["q001","q003","q005","q007","q009","q011","q013","q100","q105","q110","q115","q120","q101","q103","q107","q112"] },
    { id: "exam2020", year: "2020-2021", title: "2020-2021年期末试卷", totalQ: 16, questions: ["q002","q004","q006","q008","q010","q012","q014","q101","q106","q111","q116","q121","q102","q108","q113","q118"] },
    { id: "exam2021", year: "2021-2022", title: "2021-2022年期末试卷", totalQ: 27, questions: ["q001","q005","q009","q013","q100","q102","q107","q112","q117","q122","q125","q130","q103","q108","q113","q118"] },
    { id: "exam2022", year: "2022-2023", title: "2022-2023年期末试卷", totalQ: 24, questions: ["q003","q007","q011","q014","q101","q103","q108","q113","q118","q123","q126","q131","q104","q109","q114","q119"] },
    { id: "exam2023", year: "2023-2024", title: "2023-2024年期末试卷", totalQ: 27, questions: ["q002","q006","q010","q012","q104","q109","q114","q119","q124","q127","q128","q129","q100","q105","q110","q115"] }
  ],
  mockExamConfig: { questionCount: 15, timeLimit: 45, chapterRatio: { qch01: 0.15, qch02: 0.15, qch03: 0.10, qch04: 0.15, qch05: 0.15, qch06: 0.10, qch07: 0.10, qch08: 0.10 } }
};

// ===== 默认公式数据 =====
const defaultFormulas = {
  categories: [
    { id: "fcat_basic", title: "基本定律", formulas: [
      { id: "ohm", title: "欧姆定律", latex: "U = IR", description: "关联方向下电阻两端电压与电流成正比", tags: ["欧姆定律"] },
      { id: "kcl", title: "KCL", latex: "∑i = 0", description: "基尔霍夫电流定律", tags: ["KCL"] },
      { id: "kvl", title: "KVL", latex: "∑u = 0", description: "基尔霍夫电压定律", tags: ["KVL"] }
    ]},
    { id: "fcat_ac", title: "交流电路", formulas: [
      { id: "xl", title: "感抗", latex: "XL = ωL = 2πfL", description: "与频率成正比", tags: ["感抗"] },
      { id: "xc", title: "容抗", latex: "XC = 1/(ωC)", description: "与频率成反比", tags: ["容抗"] },
      { id: "z", title: "阻抗", latex: "Z = R + jX", description: "|Z| = √(R²+X²)", tags: ["阻抗"] },
      { id: "p", title: "有功功率", latex: "P = UI·cosφ", description: "电阻实际消耗的功率", tags: ["功率"] }
    ]},
    { id: "fcat_resonance", title: "谐振", formulas: [
      { id: "rf", title: "谐振频率", latex: "f₀ = 1/(2π√LC)", description: "RLC谐振", tags: ["谐振"] },
      { id: "rq", title: "品质因数", latex: "Q = ω₀L/R", description: "Q越大选择性越好", tags: ["品质因数"] }
    ]},
    { id: "fcat_transient", title: "一阶动态电路", formulas: [
      { id: "3e", title: "三要素法", latex: "f(t)=f(∞)+[f(0+)-f(∞)]e^(-t/τ)", description: "一阶直流电路万能解法", tags: ["三要素"] },
      { id: "trc", title: "RC时间常数", latex: "τ = RC", description: "RC电路", tags: ["时间常数"] },
      { id: "trl", title: "RL时间常数", latex: "τ = L/R", description: "RL电路", tags: ["时间常数"] }
    ]}
  ]
};

// ===== 存储操作 =====
const KEYS = {
  ANSWER_RECORDS: 'answer_records',
  WRONG_BOOK: 'wrong_book',
  FAVORITES: 'favorites',
  ANNOTATIONS: 'courseware_annotations',
  MY_ANNOTATIONS: 'my_annotations_index',
  CHAT_HISTORY: 'ai_chat_history',
  LEARNING_STATS: 'learning_stats'
};

function get(key) {
  try { return wx.getStorageSync(key) || null; }
  catch (e) { return null; }
}
function set(key, val) {
  try { wx.setStorageSync(key, val); return true; }
  catch (e) { return false; }
}

// ——— 只读数据 ———
function getCoursewareData() { return get('courseware_data') || defaultCourseware; }
function getQuestionData() {
  const stored = get('question_data');
  if (stored) return stored;
  // 合并额外题目（直接内嵌）
  const extraQs = [
        { id: "q100", type: "fill", difficulty: 2, question: "正弦波形交流电的有效值定义为与它具有相同热效应的______值______", options: [], answer: "直流", explanation: "有效值定义：交流电流的热效应与某直流电流相等→该直流值即为交流有效值。I=Im/√2。", chapter: "qch05", tags: [] },
        { id: "q101", type: "fill", difficulty: 2, question: "电流通过一个电阻时，电阻两端的电压与通过它的电流成正比。这一关系称为______定律______", options: [], answer: "欧姆", explanation: "欧姆定律：u=Ri（关联方向），是电路分析最基本的元件约束。", chapter: "qch01", tags: [] },
        { id: "q102", type: "fill", difficulty: 2, question: "电感元件中的电压与电流变化率成正比。这种关系称为自感应定律，并且可表示为______", options: [], answer: "u=L·di/dt", explanation: "电感VCR：电压与电流变化率成正比。直流稳态di/dt=0→u=0→电感短路。", chapter: "qch01", tags: [] },
        { id: "q103", type: "fill", difficulty: 2, question: "电容器在交流电路中的阻抗称为______，与频率成______", options: [], answer: "容抗", explanation: "XC=1/(ωC)=1/(2πfC)，频率越高容抗越小，频率越低容抗越大。直流时f=0→XC→∞→开路。", chapter: "qch01", tags: [] },
        { id: "q104", type: "fill", difficulty: 2, question: "如果一个电路中的输出信号与输入信号的频率相同，但幅度和相位不同，则该电路称为______响应______", options: [], answer: "稳态", explanation: "正弦稳态响应：输出与输入同频，仅有幅值和相位的变化。", chapter: "qch05", tags: [] },
        { id: "q105", type: "fill", difficulty: 2, question: "当电路的自然频率等于电源频率时，电路处于______状态______", options: [], answer: "谐振", explanation: "谐振条件：ω₀=1/√(LC)。此时电路呈纯阻性，电压电流同相。", chapter: "qch07", tags: [] },
        { id: "q106", type: "fill", difficulty: 2, question: "在任何电路节点，流入节点的电流总和等于流出节点的电流总和，这称为______定律，也称为电流______原理______", options: [], answer: "KCL", explanation: "KCL：∑i=0，本质是电荷守恒。", chapter: "qch01", tags: [] },
        { id: "q107", type: "fill", difficulty: 2, question: "在含多个电压源和电阻的电路中，使用______方法可以逐步简化电路并求解未知电压或电流______", options: [], answer: "等效变换", explanation: "等效变换法：串并联化简、Y-Δ变换、电源等效等。", chapter: "qch01", tags: [] },
        { id: "q108", type: "fill", difficulty: 2, question: "功率因数是指有功功率与视在功率的比值，它表示了电路中实际做功与______之间的关系______", options: [], answer: "总功率(视在功率)", explanation: "cosφ=P/S，反映电能利用效率。cosφ<1意味着存在无功交换。", chapter: "qch01", tags: [] },
        { id: "q109", type: "fill", difficulty: 2, question: "一个完整的电路由______三部分组成______", options: [], answer: "电源、负载、中间环节（导线+开关）", explanation: "电路三要素：电源（提供电能）、负载（消耗电能）、中间环节（连接与保护）。", chapter: "qch08", tags: [] },
        { id: "q110", type: "fill", difficulty: 2, question: "在列写网孔电流方程时，当网孔电流取相同绕行方向时，自电阻取______值，互电阻取______值______", options: [], answer: "正", explanation: "自阻>0，互阻<0（相邻网孔电流方向相同时取正，相反取负）。", chapter: "qch01", tags: [] },
        { id: "q111", type: "fill", difficulty: 2, question: "已知某电路的戴维南等效Uoc=30V，Req=6Ω，当负载等于______时，可获得的最大功率为______", options: [], answer: "6Ω", explanation: "RL=Req时Pmax=Uoc²/(4Req)=900/(4×6)=37.5W。", chapter: "qch01", tags: [] },
        { id: "q112", type: "fill", difficulty: 2, question: "KCL定律是对电路中各支路______之间施加的线性约束关系，KVL定律是对电路中各支路______之间施加的线性约束关系______", options: [], answer: "电流", explanation: "KCL=电流约束（节点）；KVL=电压约束（回路）。", chapter: "qch01", tags: [] },
        { id: "q113", type: "fill", difficulty: 2, question: "正弦电流电路提高功率因数的意义是______和______", options: [], answer: "减小线路损耗", explanation: "并联电容补偿：I总↓→线路损耗I²R↓；同一电源可带更多负载。", chapter: "qch01", tags: [] },
        { id: "q114", type: "fill", difficulty: 2, question: "谐振电路呈现______性；电路中总的无功功率为______值______", options: [], answer: "电阻", explanation: "谐振时电抗抵消→纯阻性；QL+QC=0→总无功为零，L和C互相交换能量。", chapter: "qch01", tags: [] },
        { id: "q115", type: "fill", difficulty: 2, question: "已知u1=220√2cos(314t+20°)V，u2=380√2cos(314t-10°)V，则它们的有效值相量为U1=______V，U2=______V______", options: [], answer: "220∠20°", explanation: "有效值相量：模取有效值(Um/√2)，辐角取初相。", chapter: "qch05", tags: [] },
        { id: "q116", type: "fill", difficulty: 2, question: "______其大小正负相对于电路参考点而言具有相对性______", options: [], answer: "电位", explanation: "电位是相对于参考点的电压，随参考点变化。电压（电位差）是绝对的。", chapter: "qch01", tags: [] },
        { id: "q117", type: "fill", difficulty: 2, question: "衡量电源力做功本领的物理量称为______，它只存在于______内部，其参考方向规定由______电位指向______电位______", options: [], answer: "电动势", explanation: "电动势方向：电源内部从负极→正极（电位升）。与端电压参考方向相反。", chapter: "qch01", tags: [] },
        { id: "q118", type: "fill", difficulty: 2, question: "电阻R1=100Ω，R2=200Ω，R3=300Ω。当R1与R2并联再与R3串联时，总电阻为______Ω______", options: [], answer: "366.7", explanation: "R12=R1∥R2=100×200/(100+200)=66.7Ω；R总=R12+R3=66.7+300=366.7Ω。", chapter: "qch01", tags: [] },
        { id: "q119", type: "fill", difficulty: 2, question: "电源电压12V，R1=4Ω，R2=6Ω并联，总电流为______A______", options: [], answer: "5", explanation: "Req=4×6/(4+6)=2.4Ω；I=12/2.4=5A。", chapter: "qch01", tags: [] },
        { id: "q120", type: "fill", difficulty: 2, question: "R=10Ω，C=0.1μF串联，电路的时间常数为______", options: [], answer: "1μs（1×10⁻⁶s）", explanation: "τ=RC=10×0.1×10⁻⁶=1×10⁻⁶s=1μs。", chapter: "qch08", tags: [] },
        { id: "q121", type: "fill", difficulty: 2, question: "V(t)=30+10sin(50t)伏特，R=5Ω，C=0.02F，交流电路的角频率为______弧度/秒______", options: [], answer: "50", explanation: "角频率ω=50 rad/s（sin函数中t的系数）。", chapter: "qch05", tags: [] },
        { id: "q122", type: "fill", difficulty: 2, question: "RLC电路中，L=0.2H，C=10μF，R=50Ω。当电流达到最大值一半时，电路中的能量为______焦耳______", options: [], answer: "0.025", explanation: "谐振时I最大，I一半时需具体分析。储能W=½LI²+½CU²。", chapter: "qch07", tags: [] },
        { id: "q123", type: "fill", difficulty: 2, question: "三角形电路R1=100Ω，R2=200Ω，R3=300Ω，R1与R2并联再与R3并联，总电阻为______Ω______", options: [], answer: "54.5", explanation: "三个并联：1/Req=1/100+1/200+1/300=0.01+0.005+0.0033=0.0183→Req=54.5Ω。", chapter: "qch01", tags: [] },
        { id: "q124", type: "fill", difficulty: 2, question: "在一个简单直流电路中，电流和电压之间遵循______定律______", options: [], answer: "欧姆", explanation: "欧姆定律是直流电路最基本的VCR关系。", chapter: "qch01", tags: [] },
        { id: "q125", type: "fill", difficulty: 2, question: "交流电路中电阻器是对电流的______", options: [], answer: "阻碍作用", explanation: "电阻对电流起阻碍作用，将电能转化为热能。", chapter: "qch01", tags: [] },
        { id: "q126", type: "fill", difficulty: 2, question: "并联电路总电阻______任何一个并联电阻的电阻值______", options: [], answer: "小于", explanation: "并联等效电阻小于最小支路电阻。", chapter: "qch01", tags: [] },
        { id: "q127", type: "fill", difficulty: 2, question: "电感器对______的电压具有阻碍作用______", options: [], answer: "变化", explanation: "电感VCR：u=L·di/dt，阻碍电流变化（不是阻碍电流本身）。", chapter: "qch01", tags: [] },
        { id: "q128", type: "fill", difficulty: 2, question: "电容器对______的电压具有阻碍作用______", options: [], answer: "变化", explanation: "电容VCR：i=C·du/dt，阻碍电压变化（电压不能突变）。", chapter: "qch01", tags: [] },
        { id: "q129", type: "fill", difficulty: 2, question: "在交流电路中，阻抗是由电阻和______两个参数组成______", options: [], answer: "电抗", explanation: "Z=R+jX，实部为电阻R，虚部为电抗X=XL-XC。", chapter: "qch01", tags: [] },
        { id: "q130", type: "choice", difficulty: 2, question: "一台电视机电源电压220V，电流0.5A，有功功率为（　）。", options: ["A. 60W", "B. 110W"], answer: 1, explanation: "P=UI=220×0.5=110W（假设cosφ≈1）。VA是视在功率S的单位。", chapter: "qch01", tags: [] },
        { id: "q131", type: "choice", difficulty: 2, question: "R1=6Ω、R2=4Ω并联，总电流3A，总电压为（　）V。", options: ["A. 2", "B. 1.2", "C. 18", "D. 7.2"], answer: 3, explanation: "Req=6×4/10=2.4Ω；U=I×Req=3×2.4=7.2V。", chapter: "qch01", tags: [] },
        { id: "q132", type: "choice", difficulty: 2, question: "L=0.1H，R=10Ω并联，f=50Hz，电感上电压滞后电流的相位差为（　）度。", options: ["A. 45", "B. 60", "C. 75", "D. 90"], answer: 3, explanation: "并联电路中各支路电压相同，电感支路电压超前电流90°→电压滞后电流的说法反了，正确答案是电压超前电流90°。", chapter: "qch01", tags: [] },
        { id: "q133", type: "choice", difficulty: 2, question: "C=50μF，U=220V，f=60Hz，电容阻抗为（　）Ω。", options: ["A. 53.4", "B. 883.3", "C. 318.3", "D. 106.1"], answer: 0, explanation: "XC=1/(2πfC)=1/(2×3.14×60×50×10⁻⁶)=53.05Ω≈53.4Ω。", chapter: "qch01", tags: [] },
        { id: "q134", type: "choice", difficulty: 2, question: "电压源和电流源同时连接且不在同一分支中，正确陈述是（　）。", options: ["A. 可互相替代", "B. 不可同时存在", "C. 电流源总可替代电压源", "D. 电压源总可替代电流源"], answer: 0, explanation: "实际电压源和电流源可通过等效变换互相转换（Us=IsR，R不变）。理想源不可直接转换。", chapter: "qch01", tags: [] },
        { id: "q135", type: "choice", difficulty: 2, question: "RLC串联电路，电流超前电压，则该电路是（　）。", options: ["A. 感性", "B. 容性", "C. 混合", "D. 纯阻性"], answer: 1, explanation: "电流超前电压→电路呈容性（XC>XL），总阻抗角φ<0。", chapter: "qch05", tags: [] },
        { id: "q136", type: "choice", difficulty: 2, question: "交流电路中引入90°相位差的未标记元件最有可能是（　）。", options: ["A. 电容", "B. 电感", "C. 电阻", "D. 电导体"], answer: 0, explanation: "电容：电流超前电压90°（或电压滞后电流90°）。电感：电压超前电流90°。", chapter: "qch01", tags: [] },
        { id: "q137", type: "choice", difficulty: 2, question: "正交信号频谱的特点是（　）。", options: ["A. 频率连续分布", "B. 频率间隔相等", "C. 频率成倍数递增", "D. 频率为奇数倍递增"], answer: 1, explanation: "正交信号频谱中各频率分量间隔相等。", chapter: "qch01", tags: [] },
        { id: "q138", type: "choice", difficulty: 2, question: "傅里叶级数可以将一个周期函数分解成一系列（　）。", options: ["A. 正弦", "B. 余弦", "C. 正弦和余弦", "D. 指数"], answer: 2, explanation: "f(t)=A0+Σ(Ancos nωt+Bnsin nωt)，包含正弦和余弦。", chapter: "qch01", tags: [] },
        { id: "q139", type: "choice", difficulty: 2, question: "AM调制指的是（　）。", options: ["A. 模拟调制", "B. 脉冲调制", "C. 频率调制", "D. 幅度调制"], answer: 3, explanation: "AM=Amplitude Modulation。FM=Frequency Modulation。", chapter: "qch01", tags: [] },
        { id: "q140", type: "choice", difficulty: 2, question: "电感在电路中的作用是（　）。", options: ["A. 储存电能", "B. 限制电流变化率", "C. 降低电压", "D. 放大电压"], answer: 1, explanation: "电感的基本作用是阻碍电流变化（楞次定律），同时储存磁场能量。", chapter: "qch01", tags: [] },
        { id: "q141", type: "choice", difficulty: 2, question: "串联谐振f₀=1/(2π√LC)。当L增大时，f₀将（　）。", options: ["A. 增大", "B. 减小", "C. 不变", "D. 无法确定"], answer: 1, explanation: "f₀与√L成反比，L↑→f₀↓。", chapter: "qch07", tags: [] },
        { id: "q142", type: "choice", difficulty: 2, question: "均值滤波可以减小信号的（　）。", options: ["A. 高频分量", "B. 低频分量", "C. 直流分量", "D. 噪声分量"], answer: 3, explanation: "均值滤波=低通滤波，衰减高频噪声。", chapter: "qch01", tags: [] },
        { id: "q143", type: "choice", difficulty: 2, question: "传输线中信号随距离增加，其（　）。", options: ["A. 幅度减小", "B. 幅度增大", "C. 频率减小", "D. 频率增大"], answer: 0, explanation: "传输线有电阻性损耗，信号幅度随距离指数衰减。", chapter: "qch01", tags: [] },
        { id: "q144", type: "choice", difficulty: 2, question: "巴特沃斯滤波器的特点是（　）。", options: ["A. 阻带和通带都有衰减", "B. 通带没有衰减", "C. 阻带没有衰减", "D. 衰减率相等"], answer: 1, explanation: "巴特沃斯滤波器在通带内幅频特性最平坦（无波纹）。", chapter: "qch07", tags: [] },
];
  const merged = JSON.parse(JSON.stringify(defaultQuestions));
  extraQs.forEach(eq => {
    const chapter = merged.chapters.find(ch => ch.id === eq.chapter);
    if (chapter) chapter.questions.push(eq);
  });
  return merged;
}
function getFormulaData()    { return get('formula_data') || defaultFormulas; }

// ——— 用户数据 ———
function getAnswerRecords() { return get(KEYS.ANSWER_RECORDS) || {}; }
function setAnswerRecords(d) { return set(KEYS.ANSWER_RECORDS, d); }
function getWrongBook() { return get(KEYS.WRONG_BOOK) || []; }
function setWrongBook(d) { return set(KEYS.WRONG_BOOK, d); }
function getFavorites() { return get(KEYS.FAVORITES) || { questions: [], formulas: [] }; }
function setFavorites(d) { return set(KEYS.FAVORITES, d); }
function getAnnotations() { return get(KEYS.ANNOTATIONS) || {}; }
function setAnnotations(d) { return set(KEYS.ANNOTATIONS, d); }
function getMyAnnotations() { return get(KEYS.MY_ANNOTATIONS) || []; }
function setMyAnnotations(d) { return set(KEYS.MY_ANNOTATIONS, d); }
function getChatHistory() { return get(KEYS.CHAT_HISTORY) || []; }
function setChatHistory(d) { return set(KEYS.CHAT_HISTORY, d); }
function getLearningStats() {
  return get(KEYS.LEARNING_STATS) || {
    totalStudyTime: 0, chaptersCompleted: [], totalQuestionsAnswered: 0,
    totalCorrect: 0, totalWrong: 0, mockExamHistory: [],
    streakDays: 0, lastStudyDate: '', lastCoursewareId: ''
  };
}
function setLearningStats(d) { return set(KEYS.LEARNING_STATS, d); }

const { extraQuestions } = require('./extra-questions');

// ——— 答题记录 ———
function recordAnswer(questionId, answer, isCorrect, chapterId, mode) {
  const records = getAnswerRecords();
  if (!records[questionId]) {
    records[questionId] = { questionId, attempts: [], totalAttempts: 0, correctCount: 0, wrongCount: 0 };
  }
  records[questionId].attempts.push({ timestamp: Date.now(), answer, isCorrect, mode });
  records[questionId].totalAttempts++;
  if (isCorrect) records[questionId].correctCount++;
  else records[questionId].wrongCount++;
  records[questionId].lastAttempt = Date.now();
  setAnswerRecords(records);

  if (!isCorrect) {
    const wb = getWrongBook();
    if (!wb.some(i => i.questionId === questionId)) {
      wb.push({ questionId, wrongAnswer: answer, chapterId, addedAt: Date.now(), mastered: false });
      setWrongBook(wb);
    }
  }

  const stats = getLearningStats();
  stats.totalQuestionsAnswered++;
  if (isCorrect) stats.totalCorrect++;
  else stats.totalWrong++;
  const today = new Date().toISOString().split('T')[0];
  if (stats.lastStudyDate !== today) {
    const y = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    stats.streakDays = (stats.lastStudyDate === y) ? stats.streakDays + 1 : 1;
    stats.lastStudyDate = today;
  }
  setLearningStats(stats);
}

module.exports = {
  getCoursewareData, getQuestionData, getFormulaData,
  getAnswerRecords, setAnswerRecords,
  getWrongBook, setWrongBook,
  getFavorites, setFavorites,
  getAnnotations, setAnnotations,
  getMyAnnotations, setMyAnnotations,
  getChatHistory, setChatHistory,
  getLearningStats, setLearningStats,
  recordAnswer
};
