import React from 'react';
import "../../assets/css/components/confirmmodel.css";
 // Ensure you import the modal styles

const ConfirmLogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3>Are you sure you want to logout?</h3>
        <p>You will be logged out from your account.</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Logout</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
