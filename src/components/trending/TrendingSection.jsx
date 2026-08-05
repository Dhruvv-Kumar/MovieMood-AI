import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import MovieCard from "./MovieCard";
import useTrendingMovies from "../../hooks/useTrendingMovies";

const TrendingSection = () => {

  const navigate = useNavigate();

  const {
    movies,
    tvShows,
    loading,
    error,
  } = useTrendingMovies();

  if (loading) {
    return (
      <section className="px-6 py-28">

        <div className="mx-auto max-w-7xl">

          <h2 className="mb-10 text-4xl font-bold text-white">
            Trending This Week
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-[430px] animate-pulse rounded-3xl bg-[#08111F]"
              />
            ))}

          </div>

        </div>

      </section>
    );
  }

  if (error) {
    return (
      <section className="py-28 text-center">

        <h2 className="text-2xl font-bold text-red-400">
          Couldn't load trending content.
        </h2>

        <p className="mt-4 text-zinc-400">
          {error}
        </p>

      </section>
    );
  }

  return (
    <section className="relative px-6 py-28">

      <div className="mx-auto max-w-7xl">

        {/* ================= MOVIES ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex items-end justify-between"
        >

          <div>

            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-blue-400">
              Trending
            </p>

            <h2 className="text-5xl font-bold text-white">
              🔥 Trending Movies
            </h2>

          </div>

          <button
            onClick={() => navigate("/trending/movies")}
            className="rounded-full border border-blue-500/30 bg-[#08111F] px-5 py-3 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
          >
            View All →
          </button>

        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {movies.slice(0, 8).map((movie) => (

            <MovieCard
              key={movie.id}
              movie={movie}
            />

          ))}

        </div>

                {/* ================= TV SHOWS ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 mb-14 flex items-end justify-between"
        >

          <div>

            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-green-400">
              Trending
            </p>

            <h2 className="text-5xl font-bold text-white">
              📺 Trending TV Shows
            </h2>

          </div>

          <button
            onClick={() => navigate("/trending/tv")}
            className="rounded-full border border-green-500/30 bg-[#08111F] px-5 py-3 text-slate-300 transition hover:border-green-500 hover:bg-green-600 hover:text-white"
          >
            View All →
          </button>

        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {tvShows.slice(0, 8).map((show) => (

            <MovieCard
              key={show.id}
              movie={show}
            />

          ))}

        </div>

      </div>

    </section>
  );
};

export default TrendingSection;