export const excerptText = (text, wordCount) => {
  let result = null;
  const words = text.split(' ').filter((word) => word !== '');
  if (words.length <= wordCount) {
    result = text + '...';
  } else {
    result = words.filter((_, index) => index < wordCount).join(' ') + '...';
  }
  return result;
};
