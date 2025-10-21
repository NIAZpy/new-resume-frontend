import React, { useState, useEffect } from 'react';
import './ImageModal.css';

const ImageModal = ({ src, onClose }) => {
  const [zoom, setZoom] = useState(1);

  // Prevent background scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.2, 3)); // Max zoom 3x
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.2, 0.5)); // Min zoom 0.5x
  };

  // Close modal if the background overlay is clicked
  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <div className="modal-image-container">
          <img 
            src={src} 
            alt="Profile Preview" 
            style={{ transform: `scale(${zoom})` }} 
          />
        </div>
        <div className="modal-controls">
          <button onClick={handleZoomOut}>-</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
