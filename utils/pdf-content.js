// 图片从 jsDelivr CDN 加载（文件在 images-v1 分支）
// CDN 在国内有加速节点，首次加载后微信自动缓存
function getPageImageUrl(fileId, pageNum) {
  return `https://cdn.jsdelivr.net/gh/666-nailong/superpowers@images-v1/assets/pdf_pages/${fileId}/${pageNum}.jpg`;
}

function getExamImageUrl(examId, pageNum) {
  return `https://cdn.jsdelivr.net/gh/666-nailong/superpowers@images-v1/assets/exam_pages/${examId}/${pageNum}.jpg`;
}

module.exports = { getPageImageUrl, getExamImageUrl };
