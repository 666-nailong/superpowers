// 课件页面图片URL（本地打包，无需网络加载）
function getPageImageUrl(fileId, pageNum) {
  return `/assets/pdf_pages/${fileId}/${pageNum}.jpg`;
}

module.exports = { getPageImageUrl };
