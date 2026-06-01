// 图片加载，支持多档清晰度
const QUALITY_KEY = 'img_quality';

function getQuality() {
  try { return wx.getStorageSync(QUALITY_KEY) || 'high'; }
  catch(e) { return 'high'; }
}

function setQuality(level) {
  try { wx.setStorageSync(QUALITY_KEY, level); return true; }
  catch(e) { return false; }
}

// 高清 = q25 (9MB总), 标准 = q18 (6MB总), 省流 = q10 (3MB总)
const QUALITY_MAP = {
  high:  { label: '高清',  dir: 'high' },
  medium:{ label: '标准',  dir: '' },      // 默认
  low:   { label: '省流',  dir: 'low' }
};

function getPageImageUrl(fileId, pageNum) {
  const q = getQuality();
  const dir = QUALITY_MAP[q]?.dir || '';
  const prefix = dir ? dir + '/' : '';
  return `https://cdn.jsdelivr.net/gh/666-nailong/superpowers@images-v1/assets/pdf_pages/${prefix}${fileId}/${pageNum}.jpg`;
}

module.exports = { getPageImageUrl, getQuality, setQuality, QUALITY_MAP };
