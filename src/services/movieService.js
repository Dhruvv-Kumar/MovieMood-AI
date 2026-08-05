import { tmdb } from "../api/tmdb";

const searchCache = new Map();

const createCacheKey = (type, query) =>
  `${type}:${query}`.toLowerCase();

const uniqueResults = (items = []) => {
  const map = new Map();

  items.forEach((item) => {
    const key = `${item.media_type}-${item.id}`;

    if (!map.has(key)) {
      map.set(key, item);
    }
  });

  return [...map.values()];
};

const rankResults = (items = []) => {
  return [...items].sort((a, b) => {
    const scoreA =
      (a.popularity || 0) * 2 +
      (a.vote_average || 0) * 100 +
      (a.vote_count || 0);

    const scoreB =
      (b.popularity || 0) * 2 +
      (b.vote_average || 0) * 100 +
      (b.vote_count || 0);

    return scoreB - scoreA;
  });
};

const today = new Date().toISOString().split("T")[0];

const filterContent = (items = []) => {
  return items.filter((item) => {
    if (!item.poster_path) return false;

    const releaseDate =
      item.release_date || item.first_air_date;

    if (!releaseDate) return false;

    if (releaseDate > today) return false;

    if ((item.vote_count || 0) < 100) return false;

    return true;
  });
};

export const movieService = {
  async getTrendingMovies() {
    const data = await tmdb.get("/trending/movie/week");

    return filterContent(data.results);
  },

  async getTrendingAll() {
    const data = await tmdb.get("/trending/all/week");

    return filterContent(data.results);
  },
  async getTrendingTV() {
  const data = await tmdb.get("/trending/tv/week");

  return filterContent(
    (data.results || []).map((item) => ({
      ...item,
      media_type: "tv",
    }))
  );
},

// -------------------------
// Top Rated
// -------------------------

async getTopRatedMovies() {
  const data = await tmdb.get("/movie/top_rated");

  return filterContent(
    (data.results || []).map((item) => ({
      ...item,
      media_type: "movie",
    }))
  );
},

async getTopRatedTV() {
  const data = await tmdb.get("/tv/top_rated");

  return filterContent(
    (data.results || []).map((item) => ({
      ...item,
      media_type: "tv",
    }))
  );
},

  // -------------------------
  // Movie + TV Search
  // -------------------------

 async searchMovies(query) {
  if (!query?.trim()) return [];

  const cacheKey = createCacheKey("movie", query);

  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }

  const [page1, page2] = await Promise.all([
    tmdb.get("/search/multi", {
      query,
      include_adult: false,
      page: 1,
    }),

    tmdb.get("/search/multi", {
      query,
      include_adult: false,
      page: 2,
    }),
  ]);

  const results = rankResults(
    uniqueResults(
      filterContent([
        ...(page1.results || []),
        ...(page2.results || []),
      ]).filter(
        (item) =>
          item.media_type === "movie" ||
          item.media_type === "tv"
      )
    )
  );

  searchCache.set(cacheKey, results);

  return results;
},

  // -------------------------
  // Person Search
  // -------------------------

  async searchPerson(query) {
  if (!query?.trim()) return null;

  const data = await tmdb.get("/search/person", {
    query,
    include_adult: false,
  });

  if (!data.results?.length) return null;

  const exact = data.results.find(
    (person) =>
      person.name.toLowerCase() === query.toLowerCase()
  );

  return (
    exact ||
    data.results.sort(
      (a, b) => (b.popularity || 0) - (a.popularity || 0)
    )[0]
  );
},

  // -------------------------
  // Movies by Actor
  // -------------------------

  async discoverByActor(personId) {
  if (!personId) return [];

  const [movieCredits, tvCredits] = await Promise.all([
    tmdb.get(`/person/${personId}/movie_credits`),
    tmdb.get(`/person/${personId}/tv_credits`),
  ]);

  const movies = (movieCredits.cast || []).map((item) => ({
    ...item,
    media_type: "movie",
  }));

  const tv = (tvCredits.cast || []).map((item) => ({
    ...item,
    media_type: "tv",
  }));

  return rankResults(
    uniqueResults(
      filterContent([...movies, ...tv])
    )
  );
},

  // -------------------------
  // Discover Movies
  // -------------------------

  async discoverMovies(params = {}) {
    const movieResponse = await tmdb.get("/discover/movie", {
      include_adult: false,
      ...params,
    });

    const tvResponse = await tmdb.get("/discover/tv", {
      include_adult: false,
      ...params,
    });

    const movies = (movieResponse.results || []).map((item) => ({
      ...item,
      media_type: "movie",
    }));

    const tvShows = (tvResponse.results || []).map((item) => ({
      ...item,
      media_type: "tv",
    }));

   return rankResults(
  uniqueResults(
    filterContent([
      ...movies,
      ...tvShows,
    ])
  )
);
  },

  async getMovieDetails(id, mediaType = "movie") {
    return await tmdb.get(`/${mediaType}/${id}`);
  },


  async getMovieReviews(id, mediaType = "movie") {
  return await tmdb.get(`/${mediaType}/${id}/reviews`);
  },

async getMovieImages(id, mediaType = "movie") {
  return await tmdb.get(`/${mediaType}/${id}/images`);
  },
  
async getMovieCredits(id, mediaType = "movie") {
  return await tmdb.get(`/${mediaType}/${id}/credits`);
  },

async getMovieVideos(id, mediaType = "movie") {
  return await tmdb.get(`/${mediaType}/${id}/videos`);
  },

  async getSimilarMovies(id, mediaType = "movie") {
    const data = await tmdb.get(
      `/${mediaType}/${id}/similar`
    );

    return filterContent(data.results);
  },
  async searchTVShows(query) {
  if (!query?.trim()) return [];

  const data = await tmdb.get("/search/tv", {
    query,
    include_adult: false,
  });

  

  return filterContent(
    (data.results || []).map(item => ({
      ...item,
      media_type: "tv",
    }))
  );
},

async searchFranchise(query) {
  return await this.searchMovies(query);
},

// -------------------------
// Actor Details
// -------------------------

async getActorDetails(id) {
  return await tmdb.get(`/person/${id}`);
},

async getActorMovieCredits(id) {
  const data = await tmdb.get(
    `/person/${id}/movie_credits`
  );

  return filterContent(
    (data.cast || []).map((movie) => ({
      ...movie,
      media_type: "movie",
    }))
  );
},

async getActorTVCredits(id) {
  const data = await tmdb.get(
    `/person/${id}/tv_credits`
  );

  return filterContent(
    (data.cast || []).map((show) => ({
      ...show,
      media_type: "tv",
    }))
  );
},

// -------------------------
// Director
// -------------------------

async getDirectorDetails(id) {
  return await tmdb.get(`/person/${id}`);
},

async getDirectorMovies(id) {
  const data = await tmdb.get(
    `/person/${id}/movie_credits`
  );

  return filterContent(
    (data.crew || [])
      .filter(
        (movie) =>
          movie.job === "Director"
      )
      .map((movie) => ({
        ...movie,
        media_type: "movie",
      }))
  );
},

async getDirectorTV(id) {
  const data = await tmdb.get(
    `/person/${id}/tv_credits`
  );

  return filterContent(
    (data.crew || [])
      .filter(
        (show) =>
          show.job === "Director"
      )
      .map((show) => ({
        ...show,
        media_type: "tv",
      }))
  );
},


async getWatchProviders(id, mediaType = "movie") {
  return await tmdb.get(
    `/${mediaType}/${id}/watch/providers`
  );
}

};

export default movieService;