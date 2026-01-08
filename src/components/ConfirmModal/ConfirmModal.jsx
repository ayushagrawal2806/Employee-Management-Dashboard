import React from "react";
import { AlertTriangle } from "lucide-react";
import "./ConfirmModal.css";

const ConfirmModal = ({ title, message, onConfirm, onClose }) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <div className="confirm-content">
          <div className="confirm-header">
            <div className="confirm-icon">
              <AlertTriangle />
            </div>
            <div>
              <h3>{title}</h3>
              <p>{message}</p>
            </div>
          </div>

          <div className="confirm-actions">
            <button className="btn-cancel" onClick={onClose}>
              No, Keep it
            </button>
            <button
              className="btn-danger"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
