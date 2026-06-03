/**
 * Markdown → HTML 渲染（适配微信小程序 rich-text）
 * rich-text 只支持标准 HTML 标签：div, span, p, br, strong, em, code, pre, blockquote 等
 * 不支持：view, text, scroll-view 等微信组件
 */
function mdToHtml(text) {
  if (!text || typeof text !== 'string') return text || '';
  
  // 先处理代码块（避免被后面的规则破坏）
  let blocks = [];
  text = text.replace(/(```|~~~)(\w*)\n?([\s\S]*?)\1/g, (m, lang, syntax) => {
    const code = m.replace(/```\w*\n?|```/g, '').replace(/~~~\w*\n?|~~~/g, '').trim();
    blocks.push('<pre style="background:#1E293B;color:#E2E8F0;padding:12px 16px;border-radius:8px;font-size:13px;margin:12px 0;font-family:monospace;white-space:pre-wrap;line-height:1.6;overflow-x:auto">' + escHtml(code) + '</pre>');
    return '%%BLOCK' + (blocks.length - 1) + '%%';
  });

  const h = escHtml(text)
    .replace(/%%BLOCK(\d+)%%/g, (m, i) => blocks[parseInt(i)] || '')
    .replace(/`([^`]+)`/g, '<code style="background:#F1F5F9;color:#1A365D;padding:1px 6px;border-radius:3px;font-size:13px;font-family:monospace">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/~~(.+?)~~/g, '<del style="color:#A0AEC0">$1</del>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:16px;font-weight:700;margin:16px 0 6px;color:#1A202C">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:17px;font-weight:700;margin:18px 0 8px;color:#1A202C">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:19px;font-weight:700;margin:20px 0 8px;color:#1A202C">$1</h1>')
    .replace(/^>\s+(.+)$/gm, '<blockquote style="border-left:4px solid #3B82F6;padding:8px 14px;margin:10px 0;background:rgba(59,130,246,0.05);border-radius:4px;color:#4A5568">$1</blockquote>')
    .replace(/^[-*]{3,}\s*$/gm, '<hr style="border:none;border-top:1px solid #E2E8F0;margin:16px 0">')
    .replace(/^(\s*)[-*]\s+(.+)$/gm, (m, indent, content) => {
      const pad = Math.min(indent.length, 8);
      return '<div style="display:flex;margin:4px 0;padding-left:' + pad + 'px"><span style="margin-right:8px;color:#3B82F6;font-size:14px">•</span><span style="flex:1">' + content + '</span></div>';
    })
    .replace(/^(\s*)\d+[.．]\s+(.+)$/gm, (m, indent, content) => {
      const num = m.match(/\d+/)[0];
      return '<div style="display:flex;margin:4px 0"><span style="margin-right:8px;color:#A0AEC0;min-width:20px">' + num + '.</span><span style="flex:1">' + content + '</span></div>';
    })
    .replace(/\$(.+?)\$/g, '<i style="font-family:serif">$1</i>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<span style="color:#3B82F6;text-decoration:underline">$1</span>')
    .replace(/\n\n/g, '</p><p style="margin:8px 0">')
    .replace(/\n/g, '<br>');

  return '<p style="line-height:1.8;font-size:14px;color:#1A202C;margin:0">' + h + '</p>';
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = { mdToHtml };
