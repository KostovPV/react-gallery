import { useEffect, useRef, useState, useMemo } from "react";
import Modal from "react-modal";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import "./ModalViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const ModalViewer = ({ isOpen, item, onClose, onPrev, onNext }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);

  const memoizedFile = useMemo(() => ({ url: item?.src }), [item?.src]);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
      if (width < 500) setScale(0.9);
      else if (width < 768) setScale(1.0);
      else setScale(1.5);
    }
  }, [isOpen]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!item) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="fixed-controls">
        <button onClick={onPrev} className="modal-nav">⬅️</button>
        <button onClick={onClose} className="modal-button">Затвори</button>
        <button onClick={onNext} className="modal-nav">➡️</button>
      </div>

      {item.type === "pdf" && (
        <div className="fixed-zoom">
          <button onClick={zoomOut} className="zoom-button">➖</button>
          <span>{(scale * 100).toFixed(0)}%</span>
          <button onClick={zoomIn} className="zoom-button">➕</button>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="modal-wrapper">
        <div className="modal-container" ref={containerRef}>
          {item.type === "image" ? (
            <img src={item.src} alt={item.title} />
          ) : (
            <Document
              file={memoizedFile}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<p>Зареждане на PDF...</p>}
            >
              {Array.from(new Array(numPages), (_, i) => (
                <Page
                  key={`page_${i + 1}`}
                  pageNumber={i + 1}
                  width={containerWidth}
                  scale={scale}
                />
              ))}
            </Document>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalViewer;
