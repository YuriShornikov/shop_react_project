import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, GoodsState } from '../components/types';

const initialState: GoodsState = {
  item: null,
  loading: false,
  error: null,
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {

    // Инициирует процесс загрузки товара по id
    fetchItemRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
      state.item = null;

      console.log(`Fetching item with ID: ${action.payload}`);
    },

    // Обрабатывает успешную загрузку товара
    fetchItemSuccess: (state, action: PayloadAction<Item>) => {
      console.log('Payload:', action.payload);
      state.item = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Обрабатывает неудачную попытку загрузки товара
    fetchItemFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.item = null;
    },
  },
});

export const { fetchItemRequest, fetchItemSuccess, fetchItemFailure } = goodsSlice.actions;

export default goodsSlice.reducer;
