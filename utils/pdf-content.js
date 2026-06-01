// jsDelivr CDN 已验证可用
function getPageImageUrl(fileId, pageNum) {
  return `https://cdn.jsdelivr.net/gh/666-nailong/superpowers@images-v1/assets/pdf_pages/${fileId}/${pageNum}.jpg`;
}
module.exports = { getPageImageUrl };
