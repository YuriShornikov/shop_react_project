import React from 'react';
import TopSales from '../../components/TopSales/TopSales';
import Catalog from '../../components/Catalog/Catalog';

const Home: React.FC = () => {
  return (
    <>
      <TopSales />
      <Catalog />
    </>
  );
};

export default Home;
