const galleryReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_WALL':
            return { ...state, wall: [...state.wall, action.payload] }
        case 'ADD_FAVORITE':
            return { ...state, favorites: [...state.favorites, action.payload] }
        case 'UPDATE_TERMS':
            return { ...state, terms: [action.payload] }
        case 'UPDATE_SINGLE':
            return { ...state, featured: action.payload };
        case 'UPDATE_IDS':
            return { ...state, IDs: action.payload }
        case 'CLEAR_WALL':
            return { ...state, wall: [] }
        case 'DELETE_FAVORITE':
            return { ...state, favorites: state.favorites.filter(favorite => favorite !== action.payload) }
        case 'ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default galleryReducer;