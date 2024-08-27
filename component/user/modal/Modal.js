import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, username }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">User Information</h2>
        <p className="modal-username">Username: {sessionStorage.getItem("__user_email")}</p>
        <button className="modal-close" onClick={onClose}>Close</button>
        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6); /* Darker background */
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000; /* Ensure modal is above other content */
          }
          .modal-content {
            background: #ffffff;
            padding: 2rem;
            border-radius: 10px;
            width: 350px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add subtle shadow */
            border: 1px solid #ddd; /* Add a light border */
          }
          .modal-title {
            font-size: 1.75rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #333; /* Darker text color */
          }
          .modal-username {
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
            color: #666; /* Lighter text color */
          }
          .modal-close {
            background: #3182ce;
            color: #ffffff;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s;
            font-size: 1rem;
          }
          .modal-close:hover {
            background: #2b6cb0;
            transform: scale(1.05); /* Slight scaling effect on hover */
          }
          .modal-close:focus {
            outline: none;
          }
        `}</style>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  username: PropTypes.string,
};

export default Modal;