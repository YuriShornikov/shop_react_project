import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../redux/store';
import { setSearchQuery, fetchCatalogRequest } from '../../redux/catalogSlice';
import './Search.css';

const SearchIcon: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { categories, activeCategory } = useSelector((state: RootState) => state.catalog);

  const performSearch = () => {
    if (localSearchQuery.trim()) {
      const categoryId = categories.find((cat) => cat.title === activeCategory)?.id ?? 0;

      // Сохраняем в Redux состояние поиска
      dispatch(setSearchQuery(localSearchQuery));
      dispatch(fetchCatalogRequest({ categoryId, offset: 0, searchQuery: localSearchQuery }));

      // Перенаправляем на страницу каталога
      navigate(`/catalog?q=${encodeURIComponent(localSearchQuery.trim())}`);

      // Закрываем строку поиска
      setIsSearchOpen(false);
      setLocalSearchQuery('');
    } else {

      // Закрываем строку поиска, если текст пустой
      setIsSearchOpen(false);
    }
  };

  // Поиск по иконке
  const handleSearchClick = () => {
    if (isSearchOpen) {
      performSearch();
    } else {
      setIsSearchOpen(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  // Поиск по enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  };

  return (
    <>
    
      {/* Иконка поиска */}
      <div
        data-id="search-expander"
        className="header-controls-pic header-controls-search"
        onClick={handleSearchClick}
      ></div>

      {/* Строка поиска */}
      {isSearchOpen && (
        <form
          data-id="search-form"
          className="header-controls-search-form form-inline"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Поиск"
            value={localSearchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
        </form>
      )}
    </>
  );
};

export default SearchIcon;
