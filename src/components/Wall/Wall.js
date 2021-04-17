import React, { useContext } from 'react';
import './Wall.scss';
import Artwork from '../Artwork/Artwork';
import GalleryContext from '../../context/gallery-context';

const compareDimensions = (a, b) => {
  const imageA = new Image();
  const imageB = new Image();
  let heightA, widthA, heightB, widthB;
  imageA.onload = () => {
    const sizeOf = img => {
      heightA = img.height;
      widthA = img.width;
      console.log(`A - HxW ${heightA}x${widthA}`);
    }
    sizeOf(imageA);
  }
  imageA.onload = () => {
    const sizeOf = img => {
      heightB = img.height;
      widthB = img.width;
      console.log(`B - HxW ${heightB}x${widthB}`);
    }
    sizeOf(imageB);
  }
  imageA.src = a.primaryImageSmall;
  imageB.src = b.primaryImageSmall;
  return (heightA + widthA) - (heightB + widthB);
}
const Wall = () => {
  const { wall } = useContext(GalleryContext);
  const sizeOrder = items => {
    console.log('WALL: ', items)
    return items.sort(compareDimensions);
  }


  const sortedWallArt = sizeOrder(wall);
  console.log(sortedWallArt)

  const artworksToDisplay = sortedWallArt.map((artwork, index) => {
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
