// 本地图片（打包在项目内，无需网络）
function getPageImageUrl(fileId, pageNum) {
  return `/assets/pdf_pages/${fileId}/${pageNum}.jpg`;
}
module.exports = { getPageImageUrl };
