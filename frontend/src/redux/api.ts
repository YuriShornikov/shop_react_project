import axios, { AxiosResponse } from 'axios';
import { Item, TopSalesList, CategoryList, CatalogItemList, OrderData } from '../../src/components/types';

const BASE_URL = 'http://localhost:7070/api';

// Для топ продаж
export const fetchTopSalesApi = async (): Promise<AxiosResponse<TopSalesList>> => {
  return axios.get(`${BASE_URL}/top-sales`);
};

// Для категорий
export const fetchCategoriesApi = async (): Promise<AxiosResponse<CategoryList>> => {
  return axios.get(`${BASE_URL}/categories`);
};

// Для каталога
export const fetchCatalogApi = async (
  categoryId: number,
  offset: number,
  searchQuery?: string
): Promise<AxiosResponse<CatalogItemList>> => {
  const limit = 6;
  let url = `${BASE_URL}/items?offset=${offset}&limit=${limit}`;

  if (categoryId !== 0) {
    url += `&categoryId=${categoryId}`;
  }
  if (searchQuery) {
    url += `&q=${encodeURIComponent(searchQuery)}`;
  }

  return axios.get(url);
};

// Для 1 карточки товара
export const fetchItemApi = async (id: number): Promise<AxiosResponse<Item>> => {
  return axios.get(`${BASE_URL}/items/${id}`);
};

// Для оформления заказа
export const submitOrderApi = async (orderData: OrderData): Promise<AxiosResponse> => {
  return axios.post(`${BASE_URL}/order`, orderData);
};
