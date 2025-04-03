const Gallery = ({ items, onItemClick }) => {
  return (
    <div className="gallery-grid">
      {items.map(item => (
        <div
          key={item.id}
          className="gallery-item"
          onClick={() => onItemClick(item)}
        >
          {item.type === "image" ? (
            <img src={item.src} alt={item.title} />
          ) : (
            <div className="pdf-thumbnail">
              <img src="/images/pdf-icon.png" alt="PDF file" />
              <p>{item.title}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
