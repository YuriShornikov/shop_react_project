import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchTopSalesRequest,
  fetchTopSalesSuccess,
  fetchTopSalesFailure,
} from './topSalesSlice';
import {
  fetchCatalogRequest,
  fetchCatalogSuccess,
  fetchCatalogFailure,
  setCategories,
  fetchCategoriesRequest,
} from './catalogSlice';
import {
  fetchItemRequest,
  fetchItemSuccess,
  fetchItemFailure,
} from './goodsSlice';
import {
  submitOrderStart,
  submitOrderSuccess,
  submitOrderFailure,
} from './cartSlice';
import {
  fetchTopSalesApi,
  fetchCategoriesApi,
  fetchCatalogApi,
  fetchItemApi,
  submitOrderApi,
} from './api';
import { OrderData } from '../../src/components/types';

// Сага для топ продаж
function* fetchTopSales(): Generator {
  try {
    const response: AxiosResponse = yield call(fetchTopSalesApi);
    yield put(fetchTopSalesSuccess(response.data));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchTopSalesFailure(errorMessage));
  }
}

// Сага для категорий
function* fetchCategories(): Generator {
  try {
    const response: AxiosResponse = yield call(fetchCategoriesApi);
    yield put(setCategories([{ id: 0, title: 'Все' }, ...response.data]));
  } catch (error: unknown) {
    console.error('Error fetching categories', error);
  }
}

// Сага для каталога
function* fetchCatalog(action: ReturnType<typeof fetchCatalogRequest>): Generator {
  try {
    const { categoryId, offset, searchQuery } = action.payload;
    const response: AxiosResponse = yield call(fetchCatalogApi, categoryId, offset, searchQuery);
    yield put(fetchCatalogSuccess(response.data));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchCatalogFailure(errorMessage));
  }
}

// Сага для 1 карточки товара
function* fetchItem(action: ReturnType<typeof fetchItemRequest>): Generator {
  try {
    const response: AxiosResponse = yield call(fetchItemApi, action.payload);
    yield put(fetchItemSuccess(response.data));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchItemFailure(errorMessage));
  }
}

// Сага для оформления заказа
function* submitOrderSaga(action: PayloadAction<OrderData>): Generator {
  try {
    yield call(submitOrderApi, action.payload);
    yield put(submitOrderSuccess());
    alert('Заказ успешно оформлен!');
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(submitOrderFailure(errorMessage));
    alert('Произошла ошибка при оформлении заказа.');
  }
}

// Watchers
function* watchCategories(): Generator {
  yield takeLatest(fetchCategoriesRequest.type, fetchCategories);
}

function* watchTopSales(): Generator {
  yield takeLatest(fetchTopSalesRequest.type, fetchTopSales);
}

function* watchCatalog(): Generator {
  yield takeLatest(fetchCatalogRequest.type, fetchCatalog);
}

function* watchItemRequest(): Generator {
  yield takeLatest(fetchItemRequest.type, fetchItem);
}

function* watchCart(): Generator {
  yield takeLatest(submitOrderStart.type, submitOrderSaga);
}

// Root Saga
export default function* rootSaga(): Generator {
  yield all([
    watchTopSales(),
    watchCatalog(),
    watchCategories(),
    watchItemRequest(),
    watchCart(),
  ]);
}
