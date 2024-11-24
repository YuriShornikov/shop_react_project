import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogItem, CatalogState, FetchCatalogRequestPayload } from '../components/types';

// Лимит элементов на страницу
const ITEMS_PER_PAGE = 6;

const initialState: CatalogState = {
  items: [],
  categories: [],
  activeCategory: 'Все',
  categoryId: 0,
  loading: false,
  error: null,
  offset: 0,
  hasMore: true,
  searchQuery: '',
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {

    // Процесс загрузки категорий
    fetchCategoriesRequest: (state) => {
      state.loading = true;
    },

    // Процесс загрузки каталога
    fetchCatalogRequest: (state, action: PayloadAction<FetchCatalogRequestPayload>) => {
      if (!state.loading) {
        state.loading = true;
        if (action.payload.offset === 0) {
          state.items = [];
        }
        state.searchQuery = action.payload.searchQuery;
      }
    },

    // Процесс успешной загрузки каталога
    fetchCatalogSuccess: (state, action: PayloadAction<CatalogItem[]>) => {
      state.items = [...state.items, ...action.payload];
      state.loading = false;
      state.hasMore = action.payload.length === ITEMS_PER_PAGE;
    },

    // Процесс обработки ошибки
    fetchCatalogFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Установка список категорий в состоянии
    setCategories: (state, action: PayloadAction<{ id: number; title: string }[]>) => {
      state.categories = action.payload;
    },

    // Установка активной категории
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
      state.categoryId = action.payload === 'Все'
        ? 0
        : state.categories.find((cat) => cat.title === action.payload)?.id ?? 0;

      state.offset = 0;
      state.items = [];
      state.hasMore = true;
      state.searchQuery = '';
    },

    // Устанавливает поисковый запрос
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.offset = 0;
      state.items = [];
      state.hasMore = true;
    },

    // Увеличивает значение офсета для пагинации каталога
    incrementOffset: (state) => {
      state.offset += ITEMS_PER_PAGE;
    },
  },
});

export const {
  fetchCategoriesRequest,
  fetchCatalogRequest,
  fetchCatalogSuccess,
  fetchCatalogFailure,
  setCategories,
  setActiveCategory,
  setSearchQuery,
  incrementOffset,
} = catalogSlice.actions;

export default catalogSlice.reducer;
