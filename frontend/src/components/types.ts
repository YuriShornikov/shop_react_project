export interface CatalogItem {
	id: number;
  title: string;
  price: number;
  images: string[];
}

export interface Category {
  id: number;
  title: string;
}

export interface TopSale {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

export interface Item {
  id: number;
  category: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  sizes: { size: string; available: boolean }[];
}
    
// Типы для данных
export type TopSalesList = TopSale[];
export type CategoryList = Category[];
export type CatalogItemList = CatalogItem[];

export interface CartItem {
  id: number;
  title: string;
  price: number;
  size: string;
  quantity: number;
}

export interface OrderData {
  owner: {
    phone: string;
    address: string;
  };
  items: { id: number; price: number; count: number }[];
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface Size {
  size: string;
  available: boolean;
}

export interface GoodsState {
  item: Item | null;
  loading: boolean;
  error: string | null;
}

export interface CatalogItem {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export interface CatalogState {
  items: CatalogItem[];
  categories: { id: number; title: string }[];
  activeCategory: string;
  categoryId: number;
  loading: boolean;
  error: string | null;
  offset: number;
  hasMore: boolean;
  searchQuery: string;
}

export interface FetchCatalogRequestPayload {
  categoryId: number;
  offset: number;
  searchQuery: string;
}

export interface RootState {
  goods: {
    item: Item | null;
    loading: boolean;
    error: string | null;
  };
}

export interface OrderData {
  owner: {
    phone: string;
    address: string;
  };
  items: { id: number; price: number; count: number }[];
}

export interface Card {
  item: {
    id: number;
    title: string;
    price: number;
    images: string[];
  };
}