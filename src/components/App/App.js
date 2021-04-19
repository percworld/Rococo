import './App.scss';
import { Route, Switch } from 'react-router-dom';
import React, { useState, useEffect, useReducer } from 'react';
import { shuffleItems } from '../../utilities';
import Wall from '../Wall/Wall';
import Header from '../Header/Header';
import Error from '../Error/Error';
import ArtDetails from '../ArtDetails/ArtDetails';
import Terms from '../Terms/Terms';
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
      setIDs([]);
      const idMatches = await getIdObject(searchTerm);
      setIDs(idMatches);
      console.log('# of IDs: ', idMatches.length)
      setError('')
    } catch (error) {
      setError(error)
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

  const setError = (error) => {
    dispatch({ type: 'ERROR', payload: error })
  }

  const setIDs = (newIDs) => {
    dispatch({ type: 'UPDATE_IDS', payload: newIDs });
  }

  const updateSearch = (terms) => {
    dispatch({ type: 'UPDATE_TERMS', payload: terms })
  }


  const getSingleArtPiece = async (artID) => {
    try {
      const item = await getArtByID(artID);
      dispatch({ type: 'UPDATE_WALL', payload: item })
      setError('');
    } catch (error) {
      setError(error);
    }
  }

  const updateWall = async () => {
    dispatch({ type: 'CLEAR_WALL' });
    const wallArtIDs = shuffleItems(state.IDs);
    const limitedWallArt = wallArtIDs.slice(0, 11);
    console.log('limited: ', limitedWallArt);
    try {
      const wallImages = await limitedWallArt.map(artID => getSingleArtPiece(artID))
      setError('');
      return wallImages;
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    setLoading(true)
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
    setIDs([]);
    setIDs(state.favorites);
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
        <Header getIDs={getIDs} searchTerm={searchTerm} viewFavorites={viewFavorites}></Header>
        {state.error && <h2 className='errorMessage'>Something went wrong... {state.error}</h2>}
        {loading ? <h1>Loading...</h1> :
          <Switch>
            <Route exact path="/" component={Wall} />
            <Route path='/terms' render={() => {
              return <Terms updateSearch={updateSearch} />
            }} />
            <Route path='/detail/:artPieceID' render={({ match }) => {
              const { artPieceID } = match.params;
              return <ArtDetails artPieceID={artPieceID} addFavorite={addFavorite} deleteFavorite={deleteFavorite} />
            }} />
            <Route path='/:error' render={() => {
              return <Error error={state.error} />
            }} />
          </Switch>
        }
      </div>
    </GalleryContext.Provider>
  );
}

export default App;
