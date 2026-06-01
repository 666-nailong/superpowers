// 图片加载：尝试多个CDN源，直到成功
function getPageImageUrl(fileId, pageNum) {
  // 主: GitHub raw 内容地址（比jsDelivr更稳定）
  return `https://github.com/666-nailong/superpowers/raw/images-v1/assets/pdf_pages/${fileId}/${pageNum}.jpg`;
}
module.exports = { getPageImageUrl };
