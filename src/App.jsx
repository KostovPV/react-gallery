import { useState } from "react";
import data from "./data/galleryData.json";

import Gallery from "./components/Gallery/Gallery";
import ModalViewer from "./components/ModalViewer/ModalViewer";
import Footer from './components/Footer/Footer';
import './App.css';
import FilterBar from "./components/FilterBar/FilterBar";

function App() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleItemClick = (item) => {
    blurActiveElement();
    const index = filteredItems.findIndex(i => i.id === item.id);
    setCurrentIndex(index);
    setSelectedItem(item);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIndex);
    setSelectedItem(filteredItems[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(filteredItems[nextIndex]);
  };

  const filteredItems = data
    .filter(item =>
      filter === "all" ? true : item.type === filter
    )
    .filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "name") return a.title.localeCompare(b.title);
      if (sortOrder === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  const blurActiveElement = () => {
    if (document.activeElement && typeof document.activeElement.blur === "function") {
      document.activeElement.blur();
    }
  };

  return (
    <>
      <FilterBar
        currentFilter={filter}
        onFilterChange={setFilter}
        onSearchChange={setSearchTerm}
        onSortChange={setSortOrder}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />
      <main className={`content-wrapper ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <Gallery
          items={filteredItems}
          onItemClick={handleItemClick}
        />

        <ModalViewer
          isOpen={!!selectedItem}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
