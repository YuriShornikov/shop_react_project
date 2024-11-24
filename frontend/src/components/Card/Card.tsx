import React from 'react';
import { Link } from 'react-router-dom';
import { Card as CardType } from '../types';

const Card: React.FC<CardType> = ({ item }) => {
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <div className="card-img">
            <img 
            src={item.images[0]} 
            className="card-img-top img-fluid" 
            alt={item.title} 
            />
        </div>
        <div className="card-body d-flex flex-column">
          <p className="card-text">{item.title}</p>
          <div className="mt-auto">
            <p className="card-text">{item.price} ₽</p>
            <Link to={`/catalog/${item.id}`} className="btn btn-outline-primary">
              Заказать
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
