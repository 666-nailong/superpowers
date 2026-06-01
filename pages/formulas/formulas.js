const storage = require('../../utils/storage');

Page({
  data: {
    categories: [],
    searchQuery: '',
    searchResults: []
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const fData = storage.getFormulaData();
    const favorites = storage.getFavorites();
    if (!fData) return;

    const categories = fData.categories.map(cat => ({
      ...cat,
      formulas: cat.formulas.map(f => ({
        ...f,
        favorited: favorites.formulas.includes(f.id)
      }))
    }));
    this.setData({ categories });
  },

  onSearchInput(e) {
    const query = e.detail.value;
    this.setData({ searchQuery: query });
    if (!query.trim()) {
      this.setData({ searchResults: [] });
      return;
    }
    this.doSearch();
  },

  doSearch() {
    const query = this.data.searchQuery.toLowerCase().trim();
    if (!query) {
      this.setData({ searchResults: [] });
      return;
    }
    const fData = storage.getFormulaData();
    const results = [];
    fData.categories.forEach(cat => {
      cat.formulas.forEach(f => {
        if (f.title.toLowerCase().includes(query) ||
            f.latex.toLowerCase().includes(query) ||
            (f.tags && f.tags.some(t => t.toLowerCase().includes(query))) ||
            f.description.toLowerCase().includes(query)) {
          results.push(f);
        }
      });
    });
    this.setData({ searchResults: results });
  },

  clearSearch() {
    this.setData({ searchQuery: '', searchResults: [] });
  },

  toggleFavorite(e) {
    const { id } = e.currentTarget.dataset;
    const favorites = storage.getFavorites();
    const idx = favorites.formulas.indexOf(id);
    if (idx > -1) {
      favorites.formulas.splice(idx, 1);
    } else {
      favorites.formulas.push(id);
    }
    storage.setFavorites(favorites);
    this.loadData(); // 刷新
  }
});
