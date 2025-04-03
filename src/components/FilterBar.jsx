import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = ({
  currentFilter,
  onFilterChange,
  onSearchChange,
  onSortChange,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const filters = [
    { type: "all", label: "Всички" },
    { type: "image", label: "Снимки" },
    { type: "pdf", label: "Документи" }
  ];

  const handleClick = (type) => {
    onFilterChange(type);
    setIsMobileOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    onSortChange(value);
  };

  return (
    <header className="filter-header">
      <nav className="filterbar-container">
        <div className="filter-logo">📷 Галерия</div>

        <input
          type="checkbox"
          id="filter-toggle"
          className="filter-toggle"
          checked={isMobileOpen}
          onChange={() => setIsMobileOpen(!isMobileOpen)}
        />

        <label htmlFor="filter-toggle" className="burger-menu">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </label>

        <div className={`filter-list ${isMobileOpen ? "active" : ""}`}>
          {filters.map(({ type, label }) => (
            <li key={type}>
              <button
                className={currentFilter === type ? "active" : ""}
                onClick={() => handleClick(type)}
              >
                {label}
              </button>
            </li>
          ))}
          <li className="name-search">
            <input
              type="text"
              placeholder="търси по име"
              value={searchTerm}
              onChange={handleSearch}
              className="filter-search"
            />
          </li>
          <li className="arrange-list">
            <select
              value={sortOrder}
              onChange={handleSort}
              className="filter-sort"
            >
              <option value="default">Подреди по</option>
              <option value="name">Име</option>
              <option value="date">Дата</option>
            </select>
          </li>
        </div>
      </nav>
    </header>
  );
};

export default FilterBar;