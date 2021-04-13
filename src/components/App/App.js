import './App.scss';
import { Route } from 'react-router-dom';
import React, { useState, useEffect, useReducer } from 'react';
import { shuffleItems } from '../../utilities.js';
import Wall from '../Wall/Wall';
import ArtDetails from '../ArtDetails/ArtDetails.js';
import { getIdObject, getArtByIndex } from '../../apiCalls';

function App() {
  const [wall, setWall] = useState([]);
  const [ids, setIDs] = useState([]);
  const [error, setError] = useState('');
  // const [ artDetail, setArtDetail ] = useState({});
  // const [ favorites, setFavorites ] = useState([]);
  //const [ searchTerms, setSearchTerms ] = useState([]);
  const searchTerm = 'q=sunflower'; // search terms that we made to state

  const getIDs = async (searchTerm) => {
    try {
      const idMatches = await getIdObject(searchTerm);
      setIDs(idMatches);
      setError('');
    } catch (error) {
      setError(error.message)
    }
  }


  const getSingleArtPiece = async (index) => {
    try {
      const item = await getArtByIndex(index)
      setWall(wall => [...wall, item]);
      setError('');
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    getIDs(searchTerm);
  }, [])

  useEffect(() => {
    const wallArt = shuffleItems(ids);
    ids.length && getSingleArtPiece(wallArt[0]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[1]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[2]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[3]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[4]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[5]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[6]);
  }, [ids])



  return (
    <div className="App">
      <Route
        exact path="/"
        render={() => <Wall artworks={wall} />}
      />
      <Route exact path='/:artPieceID' render={({ match }) => {
        const { artPieceID } = match.params;
        return <ArtDetails artPieceID={artPieceID} />
      }} />

      {/* { ids.length && console.log('Rendering IDs: ', ids)}
      { wall.length && console.log('WALL: ', wall)} */}

    </div>
  );
}

export default App;
