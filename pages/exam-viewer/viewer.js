Page({
  data: { examId: '', title: '真题', pages: [], page: 1, total: 1, index: 0 },
  onLoad(o) {
    const examId = o.examId || '';
    const total = parseInt(o.total) || 1;
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push({ page: i, src: `/assets/exam_pages/${examId}/${i}.jpg` });
    }
    this.setData({ examId, title: decodeURIComponent(o.title || '真题'), pages, total, page: 1 });
  },
  onChange(e) { const p = e.detail.current + 1; this.setData({ page: p, index: e.detail.current }); },
  prev() { if (this.data.page > 1) { const p = this.data.page - 1; this.setData({ page: p, index: p - 1 }); } },
  next() { if (this.data.page < this.data.total) { const p = this.data.page + 1; this.setData({ page: p, index: p - 1 }); } },
  goBack() { wx.navigateBack(); }
});
