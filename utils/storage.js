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
    { id: "exam2019", year: "2019", title: "2019-2020年期末试卷", questions: ["q001","q003","q007","q010","q012"] },
    { id: "exam2020", year: "2020", title: "2020-2021年期末试卷", questions: ["q002","q004","q008","q011","q013"] },
    { id: "exam2021", year: "2021", title: "2021-2022年期末试卷", questions: ["q005","q006","q009","q012","q014"] },
    { id: "exam2022", year: "2022", title: "2022-2023年期末试卷", questions: ["q001","q007","q010","q011","q013"] },
    { id: "exam2023", year: "2023", title: "2023-2024年期末试卷", questions: ["q002","q005","q008","q014","q009"] }
  ],
  mockExamConfig: { questionCount: 10, timeLimit: 30, chapterRatio: { qch01: 0.15, qch02: 0.15, qch03: 0.10, qch04: 0.15, qch05: 0.15, qch06: 0.10, qch07: 0.10, qch08: 0.10 } }
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
  // 合并额外题目
  try {
    const { extraQuestions } = require('./extra-questions');
    const merged = JSON.parse(JSON.stringify(defaultQuestions));
    extraQuestions.forEach(eq => {
      const chapter = merged.chapters.find(ch => ch.id === eq.chapter);
      if (chapter) chapter.questions.push(eq);
    });
    return merged;
  } catch(e) {
    return defaultQuestions;
  }
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
