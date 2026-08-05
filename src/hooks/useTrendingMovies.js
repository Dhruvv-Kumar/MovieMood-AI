import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";

export default function useTrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTrending() {
      try {
        setLoading(true);

        const [movieData, tvData] = await Promise.all([
          movieService.getTrendingMovies(),
          movieService.getTrendingTV(),
        ]);

        setMovies(movieData || []);
        setTvShows(tvData || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load trending content.");
      } finally {
        setLoading(false);
      }
    }

    loadTrending();
  }, []);

  return {
    movies,
    tvShows,
    loading,
    error,
  };
}