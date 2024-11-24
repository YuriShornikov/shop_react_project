import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchTopSalesRequest } from '../../redux/topSalesSlice';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import './TopSales.css'

const TopSales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.topSales);

  useEffect(() => {
    dispatch(fetchTopSalesRequest());
  }, [dispatch]);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      
      {/* Лоадер отображается после заголовка */}
      {loading ? (
        <div className="text-center mt-3">
          <Loader />
        </div>
      ) : error ? (
        <p className="text-center text-danger">Ошибка: {error}</p>
      ) : (
        <div className="row">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopSales;
