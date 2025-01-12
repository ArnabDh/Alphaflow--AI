import React, { useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    try {
      // Debounce the search to avoid too many updates
      const timeoutId = setTimeout(() => {
        onSearch(value.trim());
      }, 300);

      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error('Search error:', error);
      // Handle the error appropriately
    }
  }, [onSearch]);

  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        value={searchTerm}
        placeholder="Search tasks..."
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar; 