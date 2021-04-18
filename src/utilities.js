export const getRandomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

export const shuffleItems = array => {
  return array.sort(() => 0.5 - Math.random());
}

export const compareDimensions = (a, b) => {
  const imageA = new Image();
  const imageB = new Image();
  let heightA, widthA, heightB, widthB;
  imageA.onload = () => {
    const sizeOf = img => {
      heightA = img.height;
      widthA = img.width;
    }
    sizeOf(imageA);
  }
  imageA.onload = () => {
    const sizeOf = img => {
      heightB = img.height;
      widthB = img.width;
    }
    sizeOf(imageB);
  }
  imageA.src = a.primaryImageSmall;
  imageB.src = b.primaryImageSmall;
  if (heightA > heightB) {
    return widthA - widthB;
  } else return widthB - widthA

}


