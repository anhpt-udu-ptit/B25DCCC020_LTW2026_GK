import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('gk_products');
    if (savedData) {
      setProducts(JSON.parse(savedData));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    axios
      .get('/data/products.json', { signal: controller.signal })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError('Không tải được dữ liệu.');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_products', JSON.stringify(products));
    }
  }, [products, loading]);

  const handleAddProduct = (newProduct) => {
    const maxId = products.reduce((max, item) => (item.id > max ? item.id : max), 0);
    const productWithId = { ...newProduct, id: maxId + 1 };
    setProducts([...products, productWithId]);
  };

  const handleUpdateStock = (id, delta) => {
    setProducts(
      products.map((item) => {
        if (item.id === id) {
          const newStock = item.stock + delta;
          return { ...item, stock: newStock < 0 ? 0 : newStock };
        }
        return item;
      })
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home products={products} />} />
        <Route
          path="products"
          element={
            <ProductList
              products={products}
              onUpdateStock={handleUpdateStock}
              onDeleteProduct={handleDeleteProduct}
            />
          }
        />
        <Route
          path="products/new"
          element={<AddProduct onAddProduct={handleAddProduct} />}
        />
        <Route
          path="products/:id"
          element={<ProductDetail products={products} />}
        />
      </Route>
    </Routes>
  );
};

export default App;