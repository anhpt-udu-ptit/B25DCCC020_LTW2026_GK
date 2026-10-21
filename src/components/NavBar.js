import React from "react";
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ padding: '12px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
      <NavLink to="/" end style={{ marginRight: '15px', textDecoration: 'none' }}>
        Trang chủ
      </NavLink>
      <NavLink to="/products" end style={{ marginRight: '15px', textDecoration: 'none' }}>
        Danh sách
      </NavLink>
      <NavLink to="/products/new" end style={{ textDecoration: 'none' }}>
        Thêm mới
      </NavLink>
    </nav>
  );
};

export default NavBar;