import React, { useState, useEffect, useContext } from 'react';
import './ArtDetails.scss';
import GalleryContext from '../../context/gallery-context';
import { getArtByID } from '../../apiCalls';
import { Link } from 'react-router-dom';

const ArtDetails = ({ artPieceID, addFavorite, deleteFavorite }) => {
  const { favorites, error } = useContext(GalleryContext)
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? <h1>Loading...</h1> : error ? <h1>error</h1> :
        <section className="art-details">
          <div className="details-image">
            <img className="single-art-view" src={selectedArt.primaryImage} alt={selectedArt.title} />
          </div>
          <aside>
            <article className="info-card">
              <h3>"{selectedArt.title}"</h3>
              <p>c. {selectedArt.objectBeginDate}-{selectedArt.objectEndDate}</p>
              <p>{selectedArt.artistDisplayName}</p>
              <p>{selectedArt.medium}</p>
              {!favorites.includes(selectedArt.objectID) && <button data-cy="add-favorite" className="favorite" onClick={() => addFavorite(selectedArt.objectID)}>Add to Favorites</button>}
              {favorites.includes(selectedArt.objectID) && <button data-cy="rmv-favorite" className="favorite" onClick={() => deleteFavorite(selectedArt.objectID)}>Remove from Favorites</button>}
              <Link to='/'><button data-cy="back-button" className="favorite">Go Back</button></Link>
            </article>
          </aside>
        </section>}
    </>
  )
}

export default ArtDetails;