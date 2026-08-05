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
            data =
              await movieService.getTrendingMovies();
            break;

          case "tv":
            data =
              await movieService.getTrendingTV();
            break;

          case "top-movie":
            data =
              await movieService.getTopRatedMovies();
            break;

          case "top-tv":
            data =
              await movieService.getTopRatedTV();
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
      <div className="min-h-screen bg-[#020617] px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 h-10 w-72 animate-pulse rounded bg-[#08111F]" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="mx-auto max-w-7xl px-6 py-24">

        {/* Back */}

        <button
          onClick={() => navigate(-1)}
          className="mb-10 rounded-xl bg-[#08111F] px-6 py-3 transition hover:bg-blue-600"
        >
          ← Back
        </button>

        {/* Heading */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-16 text-5xl font-black"
        >
          {heading}
        </motion.h1>

        {/* Grid */}

        {items.length === 0 ? (

          <div className="rounded-3xl bg-[#08111F] p-16 text-center">

            <h2 className="text-3xl font-bold">
              No Content Found
            </h2>

            <p className="mt-4 text-slate-400">
              {type.startsWith("top")
                ? "No top rated content found."
                : "Nothing is trending right now."}
            </p>

          </div>

        ) : (

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

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