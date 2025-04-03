import "./Gallery.css";

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
            <div className="image-cell">
              <div className="image-container">
                <img src={item.src} alt={item.title} />
              </div>
              <p>{item.title}</p>
            </div>

          ) : (
            <div className="pdf-thumbnail">
              <div className="image-cell">
                <div className="image-container">
                  <img src="/images/pdf.jpg" alt="PDF file" />
                </div>
                <p>{item.title}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
