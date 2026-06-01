// 多CDN图片加载
// 主: jsDelivr (国内加速) → 备用: GitHub Raw → 手动重试
function getPageImageUrl(fileId, pageNum) {
  return 'https://cdn.jsdelivr.net/gh/666-nailong/superpowers@images-v1/' + fileId + '_' + pageNum + '.jpg';
}

module.exports = { getPageImageUrl };
