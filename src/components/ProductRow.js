import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductRow = ({ product, onUpdateStock, onDeleteProduct }) => {
  const isLowStock = product.stock < 5;

  return (
    <tr>
      <td>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </td>
      <td>{product.category}</td>
      <td>{formatMoney(product.price)}</td>
      <td className={isLowStock ? 'low-stock' : ''}>{product.stock}</td>
      <td>
        <button onClick={() => onUpdateStock(product.id, 1)}>+</button>{' '}
        <button onClick={() => onUpdateStock(product.id, -1)} disabled={product.stock === 0}>
          -
        </button>{' '}
        <button onClick={() => onDeleteProduct(product.id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default ProductRow;