import { UPDATE_WALL, ADD_FAVORITE, UPDATE_TERMS, UPDATE_SINGLE, UPDATE_IDS } from './types';


const addFavorite = (newFavorite, state) => {
    return {
        ...state,
        favorites: [...state.favorites, newFavorite]
    }
}

const updateTerms = (newTerms, state) => {
    return {
        ...state,
        terms: [...newTerms]
    }
}


const galleryReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_WALL:
            return { ...state, wall: [...state.wall, action.payload] }
        case ADD_FAVORITE:
            return addFavorite(action.payload, state);
        case UPDATE_TERMS:
            return updateTerms(action.payload, state);
        case UPDATE_SINGLE:
            return { ...state, featured: action.payload };
        case UPDATE_IDS:
            return { ...state, IDs: action.payload }
        default:
            return state;
    }
};

export default galleryReducer;