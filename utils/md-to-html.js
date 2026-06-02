/**
 * Markdown → HTML 渲染（微信小程序 rich-text 兼容）
 */
function mdToHtml(text) {
  if (!text) return text || '';
  if (typeof text !== 'string') return String(text);
  let h = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    
    // 代码块 ```...``` 或 ~~~...~~~
    .replace(/(```|~~~)(\w*)\n?([\s\S]*?)\1/g, '<view style="background:#1E293B;color:#E2E8F0;padding:20rpx 24rpx;border-radius:12rpx;font-size:24rpx;margin:16rpx 0;font-family:monospace;white-space:pre-wrap;line-height:1.6;overflow-x:scroll">$3</view>')
    
    // 行内代码
    .replace(/`([^`]+)`/g, '<text style="background:#F1F5F9;color:#1A365D;padding:2rpx 10rpx;border-radius:4rpx;font-size:24rpx;font-family:monospace">$1</text>')
    
    // 标题 ###
    .replace(/^### (.+)$/gm, '<view style="font-size:30rpx;font-weight:700;margin:24rpx 0 8rpx;color:#1A202C">$1</view>')
    .replace(/^## (.+)$/gm, '<view style="font-size:32rpx;font-weight:700;margin:28rpx 0 10rpx;color:#1A202C">$1</view>')
    .replace(/^# (.+)$/gm, '<view style="font-size:36rpx;font-weight:700;margin:32rpx 0 12rpx;color:#1A202C">$1</view>')
    
    // 加粗 ** ** 或 __ __
    .replace(/\*\*(.+?)\*\*/g, '<text style="font-weight:700">$1</text>')
    .replace(/__(.+?)__/g, '<text style="font-weight:700">$1</text>')
    
    // 斜体 * * 或 _ _
    .replace(/\*(.+?)\*/g, '<text style="font-style:italic">$1</text>')
    .replace(/_(.+?)_/g, '<text style="font-style:italic">$1</text>')
    
    // 删除线 ~~ ~~
    .replace(/~~(.+?)~~/g, '<text style="text-decoration:line-through;color:#A0AEC0">$1</text>')
    
    // 引用 >
    .replace(/^>\s+(.+)$/gm, '<view style="border-left:6rpx solid #3B82F6;padding:12rpx 20rpx;margin:12rpx 0;background:rgba(59,130,246,0.05);border-radius:4rpx;color:#4A5568">$1</view>')
    
    // 分割线 --- 或 ***
    .replace(/^[-*]{3,}\s*$/gm, '<view style="height:2rpx;background:#E2E8F0;margin:24rpx 0"></view>')
    
    // 表格
    .replace(/^\|(.+)\|$/gm, (m) => {
      const cells = m.split('|').filter(c => c.trim());
      if (cells[0] && cells[0].match(/^[-:\s]+$/)) return '';
      return '<view style="display:flex;gap:8rpx;padding:6rpx 12rpx;border-bottom:2rpx solid #E2E8F0">' +
        cells.map(c => `<text style="flex:1;font-size:24rpx">${c.trim()}</text>`).join('') + '</view>';
    })
    
    // 无序列表 - 或 *（带缩进支持）
    .replace(/^(\s*)[-*]\s+(.+)$/gm, (m, indent, content) => {
      const pad = Math.min(indent.length / 2, 3) * 20;
      return `<view style="display:flex;margin:6rpx 0;padding-left:${pad}rpx"><text style="margin-right:12rpx;color:#3B82F6;font-size:28rpx">•</text><text style="flex:1">${content}</text></view>`;
    })
    
    // 有序列表 1. 2.
    .replace(/^(\s*)\d+[.．]\s+(.+)$/gm, (m, indent, content) => {
      const num = m.match(/\d+/)[0];
      return `<view style="display:flex;margin:6rpx 0"><text style="margin-right:12rpx;min-width:32rpx;color:#A0AEC0">${num}.</text><text style="flex:1">${content}</text></view>`;
    })
    
    // 行内公式 $...$
    .replace(/\$(.+?)\$/g, '<text style="font-style:italic;font-family:serif">$1</text>')
    
    // 链接 [text](url)
    .replace(/\[(.+?)\]\((.+?)\)/g, '<text style="color:#3B82F6;text-decoration:underline">$1</text>')
    
    // 换行处理
    .replace(/\n\n/g, '</view><view style="margin:10rpx 0">')
    .replace(/\n/g, '<br/>')
    
    // 包裹
    .replace(/^/, '<view style="line-height:1.8;font-size:26rpx;color:#1A202C">')
    .replace(/$/, '</view>');

  return h;
}

module.exports = { mdToHtml };
