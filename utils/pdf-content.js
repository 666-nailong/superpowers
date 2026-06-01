// 图片远程加载 + 本地缓存
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/666-nailong/superpowers@images-v1/';

function getPageImageUrl(fileId, pageNum) {
  return CDN_BASE + fileId + '_' + pageNum + '.jpg';
}

function getExamImageUrl(examId, pageNum) {
  return CDN_BASE + 'exam_' + examId + '_' + pageNum + '.jpg';
}

// 下载并缓存图片，返回本地路径
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const fs = wx.getFileSystemManager();
    const cacheKey = 'img_' + url.split('/').pop();
    const cachePath = `${wx.env.USER_DATA_PATH}/${cacheKey}`;
    
    // 检查缓存
    try {
      fs.accessSync(cachePath);
      resolve(cachePath);
      return;
    } catch(e) {}
    
    // 下载
    wx.downloadFile({
      url: url,
      success: (res) => {
        if (res.statusCode === 200) {
          // 保存到缓存
          try {
            const savedPath = fs.saveFileSync(res.tempFilePath, cachePath);
            resolve(savedPath);
          } catch(e) {
            resolve(res.tempFilePath); // 直接用临时文件
          }
        } else {
          reject(new Error('下载失败: ' + res.statusCode));
        }
      },
      fail: (err) => reject(err)
    });
  });
}

module.exports = { getPageImageUrl, getExamImageUrl, downloadImage, CDN_BASE };
