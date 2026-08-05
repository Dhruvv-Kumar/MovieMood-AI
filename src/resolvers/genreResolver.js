const genres = {
  action: 28,
  adventure: 12,
  animation: 16,
  anime: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  romantic: 10749,
  scifi: 878,
  "science fiction": 878,
  thriller: 53,
  war: 10752,
  western: 37,
}

export const resolveGenres = (text) => {
  const ids = [];

  Object.entries(genres).forEach(([key, value]) => {
    if (text.includes(key)) {
      ids.push(value);
    }
  });

  return [...new Set(ids)];
};

export default resolveGenres;