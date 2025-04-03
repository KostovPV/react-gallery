import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal'; // <-- Import this
import './index.css';
import App from './App.jsx';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';


Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
