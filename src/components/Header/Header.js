import React from 'react';
import './Header.scss';

const Header = () => {

  return (
    <header>
      <button className="logo-container">Roccoco de l'eau</button>
      <div className="user-buttons">
        <button className="favorites-button">My favorites</button>
      </div>
    </header>
  )
}

export default Header;
