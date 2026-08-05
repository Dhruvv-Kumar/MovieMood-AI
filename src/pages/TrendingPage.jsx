import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import MovieCard from "../components/trending/MovieCard";
import { movieService } from "../services/movieService";

const TrendingPage = ({ type = "movie" }) => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);

        let data = [];

        switch (type) {
          case "movie":
            data = await movieService.getTrendingMovies();
            break;

          case "tv":
            data = await movieService.getTrendingTV();
            break;

          case "top-movie":
            data = await movieService.getTopRatedMovies();
            break;

          case "top-tv":
            data = await movieService.getTopRatedTV();
            break;

          default:
            data = [];
        }

        setItems(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] px-4 py-10 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 h-10 w-72 animate-pulse rounded bg-[#08111F]" />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-[430px] animate-pulse rounded-3xl bg-[#08111F]"
              />
            ))}
          </div>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <h1 className="text-2xl font-bold text-red-400">
          {error}
        </h1>
      </div>
    );
  }

  const heading = {
    movie: "🔥 Trending Movies",
    tv: "📺 Trending TV Shows",
    "top-movie": "⭐ Top Rated Movies",
    "top-tv": "⭐ Top Rated TV Shows",
  }[type];

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 rounded-xl bg-[#08111F] px-5 py-3 text-sm transition hover:bg-blue-600 sm:mb-10 sm:px-6 sm:text-base"
        >
          ← Back
        </button>

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10 text-3xl font-black sm:mb-16 sm:text-4xl lg:text-5xl"
        >
          {heading}
        </motion.h1>

        {items.length === 0 ? (

          <div className="rounded-3xl bg-[#08111F] p-8 text-center sm:p-16">

            <h2 className="text-2xl font-bold sm:text-3xl">
              No Content Found
            </h2>

            <p className="mt-4 text-slate-400">
              {type.startsWith("top")
                ? "No top rated content found."
                : "Nothing is trending right now."}
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">

            {items.map((item) => (

              <MovieCard
                key={`${item.media_type || type}-${item.id}`}
                movie={item}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default TrendingPage;