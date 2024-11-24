import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import {
  fetchCategoriesRequest,
  fetchCatalogRequest,
  setActiveCategory,
  incrementOffset,
} from '../../redux/catalogSlice';
import Loader from '../Loader/Loader';
import './Catalog.css';

const Catalog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('q') || '';
  const { categories, activeCategory, items, loading, offset, hasMore } = useSelector(
    (state: RootState) => state.catalog
  );

  const [localSearchQuery, setLocalSearchQuery] = useState<string>(initialSearchQuery);

  // Запрос категорий
  useEffect(() => {
    if (categories.length === 0 || !categories.find((category) => category.id === 0)) {
      dispatch(fetchCategoriesRequest());
    }
  }, [dispatch, categories]);

  // Запрос каталога
  useEffect(() => {
    const selectedCategory = categories.find((category) => category.title === activeCategory);
    const categoryId = selectedCategory ? selectedCategory.id : 0;

    // Запрос каталога с параметром searchQuery
    dispatch(fetchCatalogRequest({ categoryId, offset, searchQuery: initialSearchQuery }));
  }, [dispatch, initialSearchQuery]);

  // Обработчик клика по категории
  const handleCategoryClick = (categoryTitle: string) => {
    if (activeCategory !== categoryTitle) {
      dispatch(setActiveCategory(categoryTitle));

      const categoryId = categories.find((cat) => cat.title === categoryTitle)?.id ?? 0;
      dispatch(fetchCatalogRequest({ categoryId, offset: 0, searchQuery: initialSearchQuery }));
    }
  };

  // Обработка кнопки загрузить еще
  const handleLoadMore = () => {
    if (hasMore && !loading) {

      // Инкрементируем offset
      dispatch(incrementOffset());
  
      // Получаем обновленный offset из состояния
      const newOffset = offset + 6;
  
      // Запрашиваем новые данные с обновленным offset
      const categoryId = categories.find((category) => category.title === activeCategory)?.id ?? 0;
      dispatch(fetchCatalogRequest({ categoryId, offset: newOffset, searchQuery: localSearchQuery }));
    }
  };

  // Обработчик изменения поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  // Обработчик нажатия на кнопку поиска
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Обновляем URL с поисковым запросом
    navigate(`/catalog?q=${localSearchQuery}`);
  };

  // Проверка, находимся ли мы на странице каталога
  const isCatalogPage = window.location.pathname === '/catalog';

  useEffect(() => {
    // Синхронизируем поисковое поле с параметром URL
    setLocalSearchQuery(initialSearchQuery);
  }, [location.search]);

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {loading && offset === 0 && <Loader />}

      {/* Условный рендеринг поисковой формы только на странице каталога */}
      {isCatalogPage && (
        <form className="catalog-search-form form-inline" onSubmit={handleSearchSubmit}>
          <input
            className="form-control"
            placeholder="Поиск"
            value={localSearchQuery}
            onChange={handleSearchChange}
          />
        </form>
      )}

      {/* Отрисовка категорий 5 шт */}
      <ul className="catalog-categories nav justify-content-center">
        {categories.map((category) => (
          <li key={category.id} className="nav-item">
            <a
              className={`nav-link ${activeCategory === category.title ? 'active' : ''}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(category.title);
              }}
            >
              {category.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Отрисовка карточек 6 шт */}
      <div className="row">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
      {hasMore && !loading && (
        <div className='text-center'>
          <button className="btn btn-outline-primary" onClick={handleLoadMore}>
            Загрузить еще
          </button>
        </div>
      )}
    </section>
  );
};

export default Catalog;








