
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

  const filteredItems =
    filter === "all" ? data : data.filter(item => item.type === filter);

  return (
    <>
      <FilterBar currentFilter={filter} onFilterChange={setFilter} />
      <Gallery items={filteredItems} onItemClick={setSelectedItem} />
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
