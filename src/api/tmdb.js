const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const tmdb = {
  async get(endpoint, params = {}) {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      ...params,
    });

    const response = await fetch(
      `${BASE_URL}${endpoint}?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from TMDB");
    }

    return response.json();
  },
};