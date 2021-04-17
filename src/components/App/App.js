import './App.scss';
import { Route } from 'react-router-dom';
import React, { useState, useEffect, useReducer } from 'react';
import { shuffleItems } from '../../utilities.js';
import Wall from '../Wall/Wall';
import Header from '../Header/Header';
import ArtDetails from '../ArtDetails/ArtDetails.js';
import { getIdObject, getArtByIndex } from '../../apiCalls';
import galleryReducer from '../../context/gallery-reducer';
import GalleryContext from '../../context/gallery-context';


const initialState = {
  wall: [],
  favorites: [],
  terms: [],
  single: {},
  IDs: [],
  error: ''
}



function App() {
  const [state, dispatch] = useReducer(galleryReducer, initialState)
  const [error, setError] = useState('');

  const getIDs = async (searchTerm) => {
    try {
      const idMatches = await getIdObject(searchTerm);
      dispatch({ type: 'UPDATE_IDS', payload: idMatches });
      setError('');
    } catch (error) {
      setError(error.message)
    }
  }

  const searchTerm = 'q=watercolor';
  useEffect(() => {
    getIDs(searchTerm);
  }, []);



  const getSingleArtPiece = async (index) => {
    try {
      const item = await getArtByIndex(index);
      dispatch({ type: 'UPDATE_WALL', payload: item })
      setError('');
    } catch (error) {
      setError(error)
    }
  }

  const updateWall = async () => {
    const wallArtIDs = shuffleItems(state.IDs);
    console.log('full: ', wallArtIDs.length);
    const limitedWallArt = wallArtIDs.slice(0, 7);
    //console.log('limited: ', limitedWallArt);
    // get image sizes and call a function to sort them in order

    try {
      const wallImages = await limitedWallArt.map(index => getSingleArtPiece(index))
      return wallImages;
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    updateWall()
  }, [state.IDs])


  return (
    <GalleryContext.Provider value={state}>
      <div className="App">
        <Header></Header>
        <Route exact path="/"
          render={() => <Wall />}
        />
        <Route exact path='/:artPieceID' render={({ match }) => {
          const { artPieceID } = match.params;
          return <ArtDetails artPieceID={artPieceID} />
        }} />

      </div>
    </GalleryContext.Provider>
  );
}

export default App;
