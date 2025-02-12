import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/PortalButton.css";

const PortalButton = ({ icon, label, onClick }) => {
  return (
    <button className="portal-btn" onClick={onClick}>
      <div className="portal-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <span>{label}</span>
    </button>   
  );
};

export default PortalButton;
