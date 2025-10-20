import React from 'react';
import './TemplateModal.css';

// In a real application, these would be actual screenshots of the templates.
const templates = [
  { id: 'classic', name: 'Classic Professional' },
  { id: 'modern', name: 'Modern Minimalist' },
  { id: 'creative', name: 'Creative Field' },
];

const TemplateModal = ({ onClose, onTemplateSelect }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content template-modal">
        <h2>Choose a Resume Template</h2>
        <div className="template-options">
          {templates.map(template => (
            <div key={template.id} className="template-card" onClick={() => onTemplateSelect(template.id)}>
              <h3>{template.name}</h3>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">Close</button>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;

