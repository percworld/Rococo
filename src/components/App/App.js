import './App.scss';
import { Route } from 'react-router-dom';
import React, { useState, useEffect, useReducer } from 'react';
import { shuffleItems } from '../../utilities.js';
import Wall from '../Wall/Wall';
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
  //const { wall } = useContext(GalleryContext)
  //const [wall, setWall] = useState([]);
  //const [ids, setIDs] = useState([]);
  const [error, setError] = useState('');
  //const [ artDetail, setArtDetail ] = useState({});
  //const [ favorites, setFavorites ] = useState([]);
  //const [ searchTerms, setSearchTerms ] = useState([]);

  const getIDs = async (searchTerm) => {
    try {
      const idMatches = await getIdObject(searchTerm);
      console.log(idMatches)
      dispatch({ type: 'UPDATE_IDS', payload: idMatches });
      console.log('STATE: ', state)
      setError('');
    } catch (error) {
      setError(error.message)
    }
  }

  const searchTerm = 'q=sunflower';
  useEffect(() => {
    getIDs(searchTerm);
  }, []);

  const getSingleArtPiece = async (index) => {
    try {
      const item = await getArtByIndex(index)
      // setWall(wall => [...wall, item]);
      setError('');
    } catch (error) {
      setError(error)
    }
  }



  // const filterWallArt = wallArt => wallArt.slice(0, 7)
  const createDisplay = async () => {
    const wallArtIDs = shuffleItems(state.IDs);
    console.log(wallArtIDs)
    const limitedWallArt = wallArtIDs.slice(0, 7);
    console.log(limitedWallArt)
    const wallImages = await limitedWallArt.map(index => getSingleArtPiece(index))
    return wallImages;
  }

  const updateWall = async () => {
    const wallArt = await createDisplay()
    dispatch({ type: 'UPDATE_WALL', payload: wallArt })
  }



  return (
    <GalleryContext.Provider value={[state, dispatch]}>
      <div className="App">
        {/* <Route
          exact path="/"
          render={() => <Wall />}
        /> */}
        <Route exact path='/:artPieceID' render={({ match }) => {
          const { artPieceID } = match.params;
          return <ArtDetails artPieceID={artPieceID} />
        }} />

        {/* { ids.length && console.log('Rendering IDs: ', ids)}
          { wall.length && console.log('WALL: ', wall)} */}
      </div>
    </GalleryContext.Provider>
  );
}

export default App;
