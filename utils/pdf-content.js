// 课件页面图片URL（托管在GitHub Release）
const IMG_BASE = 'https://github.com/666-nailong/superpowers/releases/download/images-v1/';

function getPageImageUrl(fileId, pageNum) {
  return IMG_BASE + fileId + '_' + pageNum + '.jpg';
}

function getExamImageUrl(examId, pageNum) {
  return IMG_BASE + 'exam_' + examId + '_' + pageNum + '.jpg';
}

module.exports = { getPageImageUrl, getExamImageUrl, IMG_BASE };
