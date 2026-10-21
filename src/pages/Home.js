import React from 'react';
import { formatMoney } from '../data';

const Home = ({ products }) => {
  const totalProducts = products.length;

  const lowStockCount = products.reduce((count, item) => {
    return item.stock < 5 ? count + 1 : count;
  }, 0);

  const totalValue = products.reduce((sum, item) => {
    return sum + item.price * item.stock;
  }, 0);

  return (
    <div>
      <h1>Kho hàng</h1>
      <p>Tổng số sản phẩm: {totalProducts}</p>
      <p>Số sản phẩm sắp hết hàng: {lowStockCount}</p>
      <p>Tổng giá trị kho: {formatMoney(totalValue)}</p>
    </div>
  );
};

export default Home;