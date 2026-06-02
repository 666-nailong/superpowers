/**
 * 简单的 Markdown → HTML 转换（适用于微信小程序 rich-text）
 */
function mdToHtml(text) {
  if (!text) return '';
  let html = text
    // 转义HTML特殊字符
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // 代码块 ```...```
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<view style="background:#F0F0F0;padding:16rpx;border-radius:8rpx;font-size:24rpx;margin:12rpx 0;font-family:monospace;white-space:pre-wrap">$2</view>')
    // 行内代码 `...`
    .replace(/`([^`]+)`/g, '<text style="background:#F0F0F0;padding:2rpx 8rpx;border-radius:4rpx;font-size:24rpx;font-family:monospace">$1</text>')
    // **加粗**
    .replace(/\*\*(.+?)\*\*/g, '<text style="font-weight:bold">$1</text>')
    // *斜体*
    .replace(/\*(.+?)\*/g, '<text style="font-style:italic">$1</text>')
    // 标题 ###
    .replace(/^### (.+)$/gm, '<view style="font-size:32rpx;font-weight:700;margin:20rpx 0 8rpx">$1</view>')
    .replace(/^## (.+)$/gm, '<view style="font-size:34rpx;font-weight:700;margin:24rpx 0 8rpx">$1</view>')
    .replace(/^# (.+)$/gm, '<view style="font-size:36rpx;font-weight:700;margin:28rpx 0 12rpx">$1</view>')
    // 分割线
    .replace(/^---$/gm, '<view style="height:2rpx;background:#E2E8F0;margin:20rpx 0"></view>')
    // 无序列表 - 或 *
    .replace(/^[-*]\s+(.+)$/gm, '<view style="display:flex;margin:6rpx 0"><text style="margin-right:12rpx">•</text><text>$1</text></view>')
    // 有序列表 1. 2. 3.
    .replace(/^\d+[.．]\s+(.+)$/gm, '<view style="display:flex;margin:6rpx 0"><text style="margin-right:12rpx;min-width:36rpx">$&</text></view>')
    // 段落（连续两个换行）
    .replace(/\n\n/g, '</view><view style="margin:8rpx 0">')
    // 单换行
    .replace(/\n/g, '<br/>')
    // 包裹在view中
    .replace(/^/, '<view style="line-height:1.8">')
    .replace(/$/, '</view>');

  return html;
}

module.exports = { mdToHtml };
