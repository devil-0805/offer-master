import type { FavoritesStore } from '../types/question';

const FAVORITES_KEY = 'offermaster_favorites';

// 获取收藏列表
export const getFavorites = (): FavoritesStore => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load favorites:', e);
  }
  return { questionIds: [], addedAt: {} };
};

// 保存收藏列表
export const saveFavorites = (store: FavoritesStore): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to save favorites:', e);
  }
};

// 添加收藏
export const addFavorite = (questionId: string): void => {
  const store = getFavorites();
  if (!store.questionIds.includes(questionId)) {
    store.questionIds.push(questionId);
    store.addedAt[questionId] = new Date().toISOString();
    saveFavorites(store);
  }
};

// 移除收藏
export const removeFavorite = (questionId: string): void => {
  const store = getFavorites();
  store.questionIds = store.questionIds.filter(id => id !== questionId);
  delete store.addedAt[questionId];
  saveFavorites(store);
};

// 检查是否已收藏
export const isFavorite = (questionId: string): boolean => {
  const store = getFavorites();
  return store.questionIds.includes(questionId);
};

// 切换收藏状态
export const toggleFavorite = (questionId: string): boolean => {
  if (isFavorite(questionId)) {
    removeFavorite(questionId);
    return false;
  } else {
    addFavorite(questionId);
    return true;
  }
};

// 获取收藏数量
export const getFavoritesCount = (): number => {
  const store = getFavorites();
  return store.questionIds.length;
};