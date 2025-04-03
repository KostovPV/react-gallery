import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = ({ currentFilter, onFilterChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const filters = [
    { type: "all", label: "Всички" },
    { type: "image", label: "Снимки" },
    { type: "pdf", label: "Документи" }
  ];

  const handleClick = (type) => {
    onFilterChange(type);
    setIsMobileOpen(false);
  };

  return (
    <header className="filter-header">
      <nav className="filterbar-container">
        <div className="filter-logo">📷 Galeria</div>

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

        <ul className={`filter-list ${isMobileOpen ? "active" : ""}`}>
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
        </ul>
      </nav>
    </header>
  );
};

export default FilterBar;