const url = 'https://collectionapi.metmuseum.org/public/collection/v1/';
export const getIdObject = async (searchTerm) => {
  const artPromise = await fetch(`${url}search?hasImages=true&${searchTerm}`);
  const newList = await artPromise.json();
  return newList.objectIDs;
}

export const getArtByID = async (ID) => {
  const artPiece = await fetch(`${url}objects/${ID}`)
  const newArt = await artPiece.json();
  return newArt;
}