import React, { useState, useEffect, useContext } from 'react';
import './ArtDetails.scss';
import GalleryContext from '../../context/gallery-context';

const ArtDetails = ({ artPieceID, addFavorite, deleteFavorite }) => {
  const { favorites } = useContext(GalleryContext)
  const [selectedArt, setSelectedArt] = useState('');

  const getSingleArtPiece = async () => {
    const singleArtURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artPieceID}`;

    try {
      const response = await fetch(singleArtURL);
      const artPiece = await response.json();
      setSelectedArt(artPiece);
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    getSingleArtPiece();
  }, [])
  return (
    <>
      <section className="art-details">
        {console.log(selectedArt.objectID)}
        <img className="details-image" src={selectedArt.primaryImage} alt={selectedArt.title} />
        <aside>
          <article className="info-card">
            <h3>"{selectedArt.title}"</h3>
            <p>c. {selectedArt.objectBeginDate}-{selectedArt.objectEndDate}</p>
            <p>{selectedArt.artistDisplayName}</p>
            <p>{selectedArt.medium}</p>
            {!favorites.includes(selectedArt.objectID) && <button className="add-favorite" onClick={() => addFavorite(selectedArt.objectID)}>Add to Favorites</button>}
            {favorites.includes(selectedArt.objectID) && <button className="add-favorite" onClick={() => deleteFavorite(selectedArt.objectID)}>Remove from Favorites</button>}
          </article>
        </aside>
      </section>
    </>
  )
}

export default ArtDetails;