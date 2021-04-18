import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = ({ getIDs, searchTerm, viewFavorites }) => {
  return (
    <header>
      <Link to='/'>
        <button className="logo-container" onClick={() => getIDs(searchTerm())}>Roccoco de l'eau</button>
      </Link>
      <div className="user-buttons">
        <Link to='/'>
          <button className="favorites-button" onClick={() => viewFavorites()}>My favorites</button>
        </Link>
        <Link to='/terms'>
          <button className="favorites-button" >Search Terms</button>
        </Link>
      </div>
    </header>
  )
}

export default Header;
