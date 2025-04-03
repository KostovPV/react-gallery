import { useState } from "react";
import data from "./data/galleryData.json";
import FilterBar from "./components/FilterBar";
import Gallery from "./components/Gallery";
import ModalViewer from "./components/ModalViewer";
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ✅

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
        isMobileOpen={isMobileMenuOpen} // ✅
        setIsMobileOpen={setIsMobileMenuOpen} // ✅
      />
      <main className={`content-wrapper ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <Gallery items={filteredItems} onItemClick={(item) => {
          blurActiveElement();
          setSelectedItem(item);
        }} />
        <ModalViewer
          isOpen={!!selectedItem}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
        <Footer />
      </main>
    </>
  );
}

export default App;
