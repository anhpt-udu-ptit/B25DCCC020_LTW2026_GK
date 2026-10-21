import React from 'react';
import { CATEGORIES } from '../data';

const FilterBar = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  return (
    <div style={{ marginBottom: '15px', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div>
        <label htmlFor="search">Tìm kiếm </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category">Danh mục </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;