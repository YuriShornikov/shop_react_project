import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopSalesState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TopSalesState = {
  items: [],
  loading: false,
  error: null,
};

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {

    // обработка процесса загрузки топа
    fetchTopSalesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Обработка успешного завершения
    fetchTopSalesSuccess: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
      state.loading = false;
    },

    // Обработка ошибки при загрузке топа
    fetchTopSalesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTopSalesRequest,
  fetchTopSalesSuccess,
  fetchTopSalesFailure,
} = topSalesSlice.actions;

export default topSalesSlice.reducer;
