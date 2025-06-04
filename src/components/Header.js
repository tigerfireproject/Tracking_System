// Example in src/components/Header.js
import React from 'react';
import './Header.css';
import logo from '../../assets/images/your-logo.png'; // Update path

function Header() {
  return (
    <header className="app-header">
      <div className="logo-container">
        <img 
          src={logo} 
          alt="Chalo App Logo" 
          className="app-logo"
          style={{ height: '40px' }} // Adjust size as needed
        />
        <h1>Chalo Admin Dashboard</h1>
      </div>
    </header>
  );
}

export default Header;