
import './App.css'

import { useState } from "react";
import data from "./data/galleryData.json";
import FilterBar from "./components/FilterBar";
import Gallery from "./components/Gallery";
import ModalViewer from "./components/ModalViewer";
import Footer from './components/Footer/Footer';

function App() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");


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
      <FilterBar currentFilter={filter}
        onFilterChange={setFilter}
        onSearchChange={setSearchTerm}
        onSortChange={setSortOrder} />
      <Gallery items={filteredItems} onItemClick={(item) => {
        blurActiveElement(); // fixes the aria-hidden + focus conflict
        setSelectedItem(item);
      }} />
      <ModalViewer
        isOpen={!!selectedItem}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
      <Footer />
    </>
  );
}

export default App;
