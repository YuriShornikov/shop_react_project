import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const SearchIcon: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (isSearchOpen) {
      if (searchQuery.trim()) {

        // Переход на страницу каталога с параметром `q`
        navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery('');
        setIsSearchOpen(false);
      } else {

        // Закрытие строки поиска, если текст отсутствует
        setIsSearchOpen(false);
      }
    } else {

      // Открытие строки поиска
      setIsSearchOpen(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
        <form data-id="search-form" className="header-controls-search-form form-inline">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      )}
    </>
  );
};

export default SearchIcon;
