// 课件页面图片URL（通过 jsDelivr CDN 加速，国内可用）
const IMG_BASE = 'https://cdn.jsdelivr.net/gh/666-nailong/superpowers@images-v1/';

function getPageImageUrl(fileId, pageNum) {
  return IMG_BASE + fileId + '_' + pageNum + '.jpg';
}

function getExamImageUrl(examId, pageNum) {
  return IMG_BASE + 'exam_' + examId + '_' + pageNum + '.jpg';
}

module.exports = { getPageImageUrl, getExamImageUrl, IMG_BASE };
