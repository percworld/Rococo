import React, { useState, useEffect, useContext } from 'react';
import './ArtDetails.scss';
import GalleryContext from '../../context/gallery-context';
import { getArtByID } from '../../apiCalls';

const ArtDetails = ({ artPieceID, addFavorite, deleteFavorite }) => {
  const { favorites } = useContext(GalleryContext)
  const [selectedArt, setSelectedArt] = useState('');
  const [loading, setLoading] = useState(true);

  const getArtPiece = async () => {
    try {
      const artPiece = await getArtByID(artPieceID);
      console.log(artPiece, 'artPiece')
      setSelectedArt(artPiece);
    } catch (error) {
      setLoading(true)
    }
  }

  useEffect(() => {
    let mounted = true;
    getArtPiece()
    if (mounted) {
      setLoading(false);
    }
    return function cleanup() {
      mounted = false;
    }
  }, [])

  return (
    <>
      {loading ? <h1>Loading...</h1> :
        <section className="art-details">
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
        </section>}
    </>
  )
}

export default ArtDetails;