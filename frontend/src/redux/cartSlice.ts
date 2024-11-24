import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, OrderData, CartState } from '../components/types';

// Начальное состояние корзины
const initialState: CartState = {

  // Загружаем корзину из localStorage
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

		// Добавление в корзину
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;

      // Проверяем, есть ли уже такой товар в корзине
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === newItem.id && cartItem.size === newItem.size
      );

      if (existingItemIndex !== -1) {
        // Если товар уже есть, увеличиваем количество
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Если товара нет, добавляем новый
        state.items.push(newItem);
      }

      // Сохраняем обновленную корзину в localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

		// Удаление из корзины
    removeFromCart(state, action: PayloadAction<{ id: number; size: string }>) {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id && item.size === action.payload.size)
      );

      // Обновляем localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

		// Начало процесса отправки заказа
    submitOrderStart(state, action: PayloadAction<OrderData>) {
      state.loading = true;
      state.error = null;
      localStorage.setItem('currentOrder', JSON.stringify(action.payload));
    },

		// Обработка успешного отправленного заказа
    submitOrderSuccess(state) {
      state.loading = false;
      state.items = [];

      // Очистка корзины после успешного заказа
      localStorage.removeItem('cart');
    },

		// Обработка ошибки при отправки заказа
    submitOrderFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  submitOrderStart,
  submitOrderSuccess,
  submitOrderFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
