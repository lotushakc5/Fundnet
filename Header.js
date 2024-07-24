import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
         <img src="/images/logo_hack.png" alt="Logo" />
      </div>
      <div className="nav">
        <a href="#about">About</a>
        <input type="text" placeholder="Search..." className="search-bar" />
        
      </div>
    </header>
  );
}

export default Header;