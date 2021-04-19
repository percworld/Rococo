import React from 'react';
import { Link } from 'react-router-dom';
import './Artwork.scss';
import '../Wall/Wall.scss';

const Artwork = ({ id, url, wallLocation }) => {

  return (
    <Link to={`/detail/${id}`} data={id} className={`img-container ${wallLocation}`}>
      <img src={url} alt={`searched art from the Met number ${id}`} />
    </Link>
  )

}

export default Artwork;
