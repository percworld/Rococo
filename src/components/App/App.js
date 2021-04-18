import './App.scss';
import { Route } from 'react-router-dom';
import React, { useState, useEffect, useReducer } from 'react';
import { shuffleItems } from '../../utilities.js';
import Wall from '../Wall/Wall';
import Header from '../Header/Header';
import ArtDetails from '../ArtDetails/ArtDetails.js';
import { getIdObject, getArtByID } from '../../apiCalls';
import galleryReducer from '../../context/gallery-reducer';
import GalleryContext from '../../context/gallery-context';


const initialState = {
  wall: [],
  favorites: [], //506088
  terms: ['canvas', 'painting', 'oil'],
  single: {},
  IDs: [],
  error: ''
}



function App() {
  const [state, dispatch] = useReducer(galleryReducer, initialState);
  const [loading, setLoading] = useState(true);

  const getIDs = async (searchTerm) => {
    try {
      dispatch({ type: 'UPDATE_IDS', payload: [] });
      const idMatches = await getIdObject(searchTerm);
      dispatch({ type: 'UPDATE_IDS', payload: idMatches });
      console.log('# of IDs: ', idMatches.length)
      dispatch({ type: 'ERROR', payload: '' })
    } catch (error) {
      dispatch({ type: 'ERROR', payload: 'error' })
    }
  }

  const searchTerm = () => {
    return state.terms.reduce((query, term) => {
      query = query.concat(`q=${term}&`);
      return query;
    }, '')
  }

  useEffect(() => {
    getIDs(searchTerm());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps



  const getSingleArtPiece = async (artID) => {
    try {
      const item = await getArtByID(artID);
      dispatch({ type: 'UPDATE_WALL', payload: item })
      dispatch({ type: 'ERROR', payload: '' });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  }

  const updateWall = async () => {
    dispatch({ type: 'CLEAR_WALL' });
    const wallArtIDs = shuffleItems(state.IDs);
    //console.log('full: ', wallArtIDs.length);
    const limitedWallArt = wallArtIDs.slice(0, 11);
    //console.log('limited: ', limitedWallArt);

    try {
      const wallImages = await limitedWallArt.map(artID => getSingleArtPiece(artID))
      dispatch({ type: 'ERROR', payload: '' });
      return wallImages;
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  }

  useEffect(() => {
    let mounted = true;
    updateWall();
    if (mounted) {
      setLoading(false);
    }
    return function cleanup() {
      mounted = false;
    }
  }, [state.IDs]) // eslint-disable-line react-hooks/exhaustive-deps

  const viewFavorites = () => {
    dispatch({ type: 'UPDATE_IDS', payload: [] });
    dispatch({ type: 'UPDATE_IDS', payload: state.favorites });
  }

  const addFavorite = (itemID) => {
    dispatch({ type: 'ADD_FAVORITE', payload: itemID })
  }

  const deleteFavorite = (itemID) => {
    dispatch({ type: 'DELETE_FAVORITE', payload: itemID })
  }

  return (
    <GalleryContext.Provider value={state}>
      <div className="App">
        <Header getIDs={getIDs} viewFavorites={viewFavorites}></Header>
        {loading ? <h1>Loading...</h1> : <Route exact path="/" component={Wall} />}
        <Route exact path='/:artPieceID' render={({ match }) => {
          const { artPieceID } = match.params;
          return <ArtDetails artPieceID={artPieceID} addFavorite={addFavorite} deleteFavorite={deleteFavorite} />
        }} />

      </div>
    </GalleryContext.Provider>
  );
}

export default App;
