/**
 * 本地 AI 问答引擎
 * 从课件PDF内容中检索答案，无需API Key，完全免费离线
 */
const { pdfContents } = require('./pdf-content');

// 章节名称映射
const chapterNames = {
  ch01_01: '第1章 电路的基本概念和基本约束（上）',
  ch01_02: '第1章 电路的基本概念和基本约束（下）',
  ch02_01: '第2章 电阻电路的等效分析',
  ch03_01: '第3章 电阻电路的方程分析法',
  ch04_01: '第4章 电路定理',
  ch05_01: '第5章 正弦稳态电路的相量法基础',
  ch06_01: '第6章 周期信号电路的稳态分析',
  ch07_01: '第7章 正弦稳态下的频率特性与谐振',
  ch08_01: '第8章 线性动态电路的时域分析'
};

// 关键词 → 章节映射
const keywordChapter = {
  '基尔霍夫': 'ch01_01', 'KCL': 'ch01_01', 'KVL': 'ch01_01',
  '电流': 'ch01_01', '电压': 'ch01_01', '功率': 'ch01_01',
  '电阻': 'ch01_01', '电容': 'ch01_01', '电感': 'ch01_01',
  '电源': 'ch01_01', '受控源': 'ch01_01',
  '等效': 'ch02_01', '串并联': 'ch02_01', 'Y-Δ': 'ch02_01',
  '节点电压': 'ch03_01', '网孔电流': 'ch03_01', '支路电流': 'ch03_01',
  '叠加': 'ch04_01', '戴维南': 'ch04_01', '最大功率': 'ch04_01',
  '正弦': 'ch05_01', '相量': 'ch05_01', '阻抗': 'ch05_01', '感抗': 'ch05_01', '容抗': 'ch05_01',
  '谐振': 'ch07_01', '品质因数': 'ch07_01', '频率': 'ch07_01',
  '耦合': 'ch06_01', '互感': 'ch06_01', '同名端': 'ch06_01', '变压器': 'ch06_01', '三相': 'ch06_01',
  '动态': 'ch08_01', '换路': 'ch08_01', '三要素': 'ch08_01', '时间常数': 'ch08_01',
  '零输入': 'ch08_01', '零状态': 'ch08_01', '一阶': 'ch08_01'
};

function findInPdfContent(question) {
  const q = question.toLowerCase();
  
  // 1. 找到最相关的章节
  let bestChapter = null;
  let bestScore = 0;
  
  for (const [kw, ch] of Object.entries(keywordChapter)) {
    if (q.includes(kw.toLowerCase())) {
      const score = kw.length; // 匹配的关键词越长越相关
      if (score > bestScore) {
        bestScore = score;
        bestChapter = ch;
      }
    }
  }
  
  if (!bestChapter) return null;
  
  // 2. 从该章节提取相关内容
  const content = pdfContents[bestChapter];
  if (!content || content.length === 0) return null;
  
  const chName = chapterNames[bestChapter] || bestChapter;
  
  // 找到包含关键词的段落
  const relevantLines = [];
  const keywords = Object.keys(keywordChapter).filter(kw => q.includes(kw.toLowerCase()));
  
  for (let i = 0; i < content.length; i++) {
    const line = content[i].toLowerCase();
    const hasKeyword = keywords.some(kw => line.includes(kw.toLowerCase()));
    if (hasKeyword) {
      // 取前后各2行作为上下文
      const start = Math.max(0, i - 2);
      const end = Math.min(content.length, i + 3);
      for (let j = start; j < end; j++) {
        const text = content[j].trim();
        if (text && !relevantLines.includes(text)) {
          relevantLines.push(text);
        }
      }
    }
  }
  
  if (relevantLines.length === 0) {
    // 返回章节开头内容
    return `📖 来自《${chName}》\n\n${content.slice(0, 15).join('\n')}\n\n💡 如需更详细解答，请查看完整课件内容。`;
  }
  
  const result = relevantLines.slice(0, 25).join('\n');
  return `📖 来自《${chName}》\n\n${result}\n\n💡 以上内容摘自课件PDF，可以查看完整课件获取更多信息。`;
}

module.exports = { findInPdfContent };
