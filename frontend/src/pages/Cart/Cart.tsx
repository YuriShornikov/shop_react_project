import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, submitOrderStart } from '../../redux/cartSlice';
import type { AppDispatch } from '../../redux/store';
import { Link } from 'react-router-dom';
import { CartItem, OrderData } from '../../components/types';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const loading = useSelector((state: any) => state.cart.loading);
  const dispatch = useDispatch<AppDispatch>();
  
  const [orderInProgress] = useState(false);
  
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  // Загрузка данных корзины из localStorage
  useEffect(() => {

    // Сохраняем корзину в localStorage только если она изменилась
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

	// Удаление товара из корзины
  const handleRemove = (id: number, size: string) => {
    dispatch(removeFromCart({ id, size }));
  };

	// Отправка заказа
  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Защищаем от повторной отправки
    if (orderInProgress || loading) return;
  
    const orderData: OrderData = {
      owner: {
        phone: phoneRef.current?.value || '',
        address: addressRef.current?.value || '',
      },
      items: cartItems.map((item: CartItem) => ({
        id: item.id,
        price: item.price,
        count: item.quantity,
      })),
    };
  
    // Отправка данных заказа через Redux
    dispatch(submitOrderStart(orderData));
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
  };

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Размер</th>
            <th>Кол-во</th>
            <th>Стоимость</th>
            <th>Итого</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center">Ваша корзина пуста</td>
            </tr>
          ) : (
            cartItems.map((item: CartItem, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><Link to={`/catalog/${item.id}`}>{item.title}</Link></td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>{item.price} руб.</td>
                <td>{item.price * item.quantity} руб.</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(item.id, item.size)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))
          )}
          {cartItems.length > 0 && (
            <tr>
              <td colSpan={5} className="text-right">Общая стоимость</td>
              <td>{calculateTotal()} руб.</td>
            </tr>
          )}
        </tbody>
      </table>

      {cartItems.length > 0 && (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
            <form className="card-body" onSubmit={handleOrder}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  ref={phoneRef}
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  ref={addressRef}
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                  required
                />
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="agreement" required />
                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button type="submit" className="btn btn-outline-secondary" disabled={loading || orderInProgress}>
                {loading || orderInProgress ? 'Загрузка...' : 'Оформить заказ'}
              </button>
            </form>
          </div>
        </section>
      )}
    </section>
  );
};

export default Cart;
