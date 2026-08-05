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
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">

          <h2 className="mb-8 text-3xl font-bold text-white sm:mb-10 sm:text-4xl">
            Trending This Week
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-[310px] animate-pulse rounded-3xl bg-[#08111F] sm:h-[360px] lg:h-[430px]"
              />
            ))}
          </div>

        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-20 text-center sm:py-28">

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
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">

      <div className="mx-auto max-w-7xl">

        {/* MOVIES */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
        >

          <div>

            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-blue-400 sm:mb-3 sm:text-sm sm:tracking-[0.35em]">
              Trending
            </p>

            <h2 className="text-3xl font-bold text-white sm:text-5xl">
              🔥 Trending Movies
            </h2>

          </div>

          <button
            onClick={() => navigate("/trending/movies")}
            className="w-fit rounded-full border border-blue-500/30 bg-[#08111F] px-5 py-3 text-sm text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white sm:text-base"
          >
            View All →
          </button>

        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">

          {movies.slice(0, 8).map((movie) => (

            <MovieCard
              key={movie.id}
              movie={movie}
            />

          ))}

        </div>

        {/* TV SHOWS */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 mt-20 flex flex-col gap-6 sm:mb-14 sm:mt-28 sm:flex-row sm:items-end sm:justify-between"
        >

          <div>

            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-green-400 sm:mb-3 sm:text-sm sm:tracking-[0.35em]">
              Trending
            </p>

            <h2 className="text-3xl font-bold text-white sm:text-5xl">
              📺 Trending TV Shows
            </h2>

          </div>

          <button
            onClick={() => navigate("/trending/tv")}
            className="w-fit rounded-full border border-green-500/30 bg-[#08111F] px-5 py-3 text-sm text-slate-300 transition hover:border-green-500 hover:bg-green-600 hover:text-white sm:text-base"
          >
            View All →
          </button>

        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">

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