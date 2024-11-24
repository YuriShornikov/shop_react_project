import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './header.css';
import SearchIcon from '../Search/Search'

const Header: React.FC = () => {

  // Получаем корзину из Redux Store
  const cartItems = useSelector((state: any) => state.cart.items);

  // Считаем количество товаров
  const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
  return (
    <header className="container">
      <div className='row'>
        <div className='col'>
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src="../img/header-logo.png" alt="Bosa Noga" />
            </a>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Главная</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/catalog">Каталог</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">О магазине</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contacts">Контакты</a>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <SearchIcon />
                  <Link className="header-controls-pic header-controls-cart" to="/cart">
                    {totalItems > 0 && (
                      <div className="header-controls-cart-full">{totalItems}</div>
                    )}
                    <div className="header-controls-cart-menu"></div>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
