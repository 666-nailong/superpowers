// 图片加载：本地打包（无需网络，保证可用）
function getPageImageUrl(fileId, pageNum) {
  return `/assets/pdf_pages/${fileId}/${pageNum}.jpg`;
}
module.exports = { getPageImageUrl };
