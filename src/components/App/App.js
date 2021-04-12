import './App.scss';
import { Route } from 'react-router-dom';
import React, { useState, useEffect, useReducer } from 'react';
import { shuffleItems } from '../../utilities.js';
import Wall from '../Wall/Wall';

function App() {
  const [wall, setWall] = useState([]);
  const [ids, setIDs] = useState([]);
  const [error, setError] = useState('');
  // const [ artDetail, setArtDetail ] = useState({});
  // const [ favorites, setFavorites ] = useState([]);
  //const [ searchTerms, setSearchTerms ] = useState([]);
  const searchTerm = 'q=sun&q=moon'; // search terms that we made to state
  const artIdSearch = fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&${searchTerm}`)
    .then(response => response.json())
    .catch(error => setError(error.message))


  const getIDs = async () => {
    const idMatch = await artIdSearch;
    setError('');
    setIDs(idMatch.objectIDs);
  }


  const getSingleArtPiece = async (index) => {
    try {
      const item = fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${index}`)
      const response = await item;
      const artPiece = await response.json();
      setWall(wall => [...wall, artPiece]);
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    getIDs();
  }, [])

  useEffect(() => {
    ids.length && getSingleArtPiece(shuffleItems(ids)[0]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[1]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[2]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[3]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[4]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[5]);
    ids.length && getSingleArtPiece(shuffleItems(ids)[6]);
  }, [ids])



  return (
    <div className="App">Salon

      <Wall artworks={wall} />

      {ids.length && console.log('Rendering IDs: ', ids)}
      {wall.length && console.log('WALL: ', wall)}

    </div>
  );
}

export default App;
