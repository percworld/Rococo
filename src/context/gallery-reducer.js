const sizeOf = img => {
    var height = img.height;
    var width = img.width;
    console.log(`HxW ${height}x${width}`);
}




const galleryReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_WALL':
            // var image = new Image();
            // image.src = action.payload.primaryImageSmall;
            // sizeOf(image);
            // console.log(image)

            return { ...state, wall: [...state.wall, action.payload] }
        case 'ADD_FAVORITE':
            return { ...state, favorites: [...state.favorites, action.payload] }
        case 'UPDATE_TERMS':
            return { ...state, terms: [action.payload] }
        case 'UPDATE_SINGLE':
            return { ...state, featured: action.payload };
        case 'UPDATE_IDS':
            return { ...state, IDs: action.payload }
        default:
            return state;
    }
};

export default galleryReducer;