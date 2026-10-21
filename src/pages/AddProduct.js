import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddProduct = ({ onAddProduct }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Văn phòng phẩm');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Kiểm tra ô trống
    if (!name.trim() || !price || !stock) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const numPrice = Number(price);
    const numStock = Number(stock);

    // 2. Kiểm tra giá trị nhập
    if (
      isNaN(numPrice) ||
      numPrice <= 0 ||
      isNaN(numStock) ||
      numStock < 0 ||
      !Number.isInteger(numStock)
    ) {
      setError('Giá phải lớn hơn 0, số lượng là số nguyên không âm');
      return;
    }

    onAddProduct({
      name: name.trim(),
      category,
      price: numPrice,
      stock: numStock,
    });

    navigate('/products', {
      replace: true,
      state: { message: `Đã thêm sản phẩm ${name.trim()}` },
    });
  };

  return (
    <div>
      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Tên sản phẩm </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="category">Danh mục </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="price">Giá </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="stock">Số lượng tồn </label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddProduct;