import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/PortalButton.css";

const PortalButton = ({ icon, label, onClick, disabled }) => {
  return (
    <button 
      className={`portal-btn ${disabled ? 'disabled' : ''}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {icon && (
        <div className="portal-icon">
          <i className={`bi ${icon}`}></i>
        </div>
      )}
      <span>{label}</span>
    </button>   
  );
};

export default PortalButton;