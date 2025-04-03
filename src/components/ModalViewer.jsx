import Modal from "react-modal";
import { Document, Page, pdfjs } from "react-pdf";
import "./ModalViewer.css";
import workerSrc from 'pdfjs-dist/build/pdf.worker?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const ModalViewer = ({ isOpen, item, onClose }) => {
  if (!item) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-wrapper">
        <div className="modal-container">
          {item.type === "image" ? (
            <img src={item.src} alt={item.title} />
          ) : (
            <Document file={{ url: item.src }}>
              <Page pageNumber={1} />
            </Document>
          )}
        </div>

        <button onClick={onClose} className="modal-button">Затвори</button>
      </div>
    </Modal>
  );
};

export default ModalViewer;
