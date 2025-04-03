import Modal from "react-modal";
import { Document, Page } from "react-pdf";

const ModalViewer = ({ isOpen, item, onClose }) => {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <button onClick={onClose}>Затвори</button>
      {item.type === "image" ? (
        <img src={item.src} alt={item.title} />
      ) : (
        <Document file={item.src}>
          <Page pageNumber={1} />
        </Document>
      )}
    </Modal>
  );
};

export default ModalViewer;
