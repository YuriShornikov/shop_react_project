import React from 'react';
import './Banner.css';

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <img src="../img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
};

export default Banner;
