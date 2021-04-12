import { UPDATE_WALL, ADD_FAVORITE, UPDATE_TERMS, UPDATE_SINGLE, UPDATE_IDS } from './types';

const updateWall = (items, state) => {
    return {
        ...state,
        wall: [...items]
    }
}

const addFavorite = (newFavorite, state) => {
    return {
        ...state,
        favorites: [...favorites, newFavorite]
    }
}

const updateTerms = (newTerms, state) => {
    return {
        ...state,
        terms: [...newTerms]
    }
}

const updateSingle = (newSingle, state) => {
    return {
        ...state,
        single: newSingle
    }
}

const updateIds = (newIDs, state) => {
    return {
        ...state,
        IDs: [...newIDs]
    }
}
const galleryReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_WALL:
            return updateWall(action.payload, state);
        case ADD_FAVORITE:
            return addFavorite(action.payload, state);
        case UPDATE_TERMS:
            return updateTerms(action.payload, state);
        case UPDATE_SINGLE:
            return updateSingle(action.payload, state);
        case UPDATE_IDS:
            return updateIds(action.payload, state);
        default:
            return state;
    }
};

export default galleryReducer;