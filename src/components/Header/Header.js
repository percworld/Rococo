import React from 'react';
import './Header.scss';

const Header = () => {

  return (
    <header>
      <button className="logo-container">
        <h1>Roccoco</h1>
      </button>
      <div className="user-buttons">
        <button className="favorites-button">salon exhibition of my favorites</button>
      </div>
    </header>
  )
}

export default Header;
