import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";

const defaultFilters = {
  genre: "",
  language: "",
  year: "",
  rating: "",
  sort: "popularity.desc",
};

export default function useDiscoverMovies(filters) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const data =
          await movieService.discoverMovies({
            with_genres:
              filters.genre || undefined,

            with_original_language:
              filters.language || undefined,

            primary_release_year:
              filters.year || undefined,

            "vote_average.gte":
              filters.rating || undefined,

            sort_by:
              filters.sort ||
              defaultFilters.sort,
          });

        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [filters]);

  return {
    movies,
    loading,
  };
}