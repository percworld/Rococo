import React, { useContext } from 'react';
import './Wall.scss';
import Artwork from '../Artwork/Artwork';
import GalleryContext from '../../context/gallery-context';
import { compareDimensions } from '../../utilities.js';

const Wall = () => {
  const { wall, error } = useContext(GalleryContext);
  const sizeOrder = items => {
    return items.sort(compareDimensions);
  }

  const sortedWallArt = sizeOrder(wall);
  const artworksToDisplay = sortedWallArt.map((artwork, index) => {
    return (
      <Artwork
        wallLocation={`div${index + 1}`}
        key={artwork.objectID}
        id={artwork.objectID}
        url={artwork.primaryImageSmall}
      />
    )
  })

  return (
    <section className='salonTemplate'>
      {error ? <p>error</p> : artworksToDisplay}
    </section>
  )

}

export default Wall;
