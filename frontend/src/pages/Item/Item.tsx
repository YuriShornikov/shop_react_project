import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemRequest } from '../../redux/goodsSlice';
import { addToCart } from '../../redux/cartSlice';
import Loader from '../../components/Loader/Loader';
import { Size, RootState } from '../../components/types';
import './Item.css';

const Item: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { item, loading, error } = useSelector((state: RootState) => state.goods);
  console.log('Redux state item:', item);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Загружает данные о товаре
  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      dispatch(fetchItemRequest(Number(id)));
    } else {
      navigate('/404');
    }
  }, [dispatch, id, navigate]);

  // Устанавливает выбранный пользователем параметр
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  // Добавляет товар с выбранными параметрами в уорзину
  const handleAddToCart = () => {
    if (item && selectedSize) {
      const cartItem = {
        id: item.id,
        title: item.title,
        price: item.price,
        size: selectedSize,
        quantity: quantity
      };
  
      console.log('Adding to cart:', cartItem);

      // Передаем объект с товаром
      dispatch(addToCart(cartItem));

      // Перенаправляем на страницу корзины
      navigate('/cart');  
    }
  };
  

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Товар не найден.</div>;
  }

  // Отбор доступных размеров для выбранного  товара
  const availableSizes = item.sizes.filter((size: Size) => size.available);

  if (availableSizes.length === 0) {
    return <div>Товар есть, но размеры недоступны.</div>;
  }

  return (
    <section className="catalog-item">
      <h2 className="text-cente">{item.title}</h2>
      <div className="row">
        <div className="col-5">
          <img className="img-fluid" src={item.images[0]} alt={item.title} />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{item.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{item.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{item.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{item.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{item.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{item.reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            
            {availableSizes.length > 0 && (
              <>
                <p>Размеры:
                {/* <ul> */}
                {availableSizes.map((size) => (
                  <span
                    key={size.size}
                    onClick={() => handleSizeChange(size.size)}
                    className={selectedSize === size.size ? "catalog-item-size selected" : "catalog-item-size"}
                  >
                    {size.size}
                  </span>
                ))}
                </p>
                {/* </ul> */}
                <p className="quantity">
                  Количество:
                  <span className="btn-group btn-group-sm pl-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="btn btn-outline-primary">
                      <span>{quantity}</span>
                    </span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                    >
                      +
                    </button>
                  </span>
                </p>
                <button
                  className="btn btn-danger btn-block btn-lg"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  В корзину
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Item;
