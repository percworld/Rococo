import React, { useContext } from 'react';
import './Wall.scss';
import Artwork from '../Artwork/Artwork';
import GalleryContext from '../../context/gallery-context';
const Wall = () => {
  const { wall } = useContext(GalleryContext);

  console.log('WALL: ', wall)
  const artworksToDisplay = wall.map((artwork, index) => {
    //create an array of artwork using props
    //eventually we will pass this using context API
    //use index to create dynamic classNames that correspond to locations in the templates
    return (
      <Artwork
        wallLocation={`div${index}`}
        key={artwork.objectID}
        id={artwork.objectID}
        url={artwork.primaryImageSmall}
      />
    )
  })

  return (
    <section className='salonTemplate'>
      {artworksToDisplay}
    </section>
  )

}

export default Wall;
