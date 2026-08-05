import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";

export default function useTopRatedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const data =
          await movieService.getTopRatedMovies();

        setMovies(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  return {
    movies,
    loading,
    error,
  };
}