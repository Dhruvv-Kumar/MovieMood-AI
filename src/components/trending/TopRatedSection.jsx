import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import MovieCard from "./MovieCard";
import useTopRatedMovies from "../../hooks/useTopRatedMovies";

const TopRatedSection = () => {
  const navigate = useNavigate();

  const {
    movies,
    loading,
    error,
  } = useTopRatedMovies();

  if (loading) {
    return (
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">

          <h2 className="mb-8 text-3xl font-bold text-white sm:mb-10 sm:text-4xl">
            ⭐ Top Rated Movies
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-[310px] animate-pulse rounded-3xl bg-zinc-800 sm:h-[360px] lg:h-[430px]"
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
          Couldn't load top rated movies.
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

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-10 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between"
        >

          <div>

            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-yellow-400 sm:mb-3 sm:text-sm sm:tracking-[0.35em]">
              IMDb
            </p>

            <h2 className="text-3xl font-bold text-white sm:text-5xl">
              ⭐ Top Rated Movies
            </h2>

          </div>

          <button
            onClick={() =>
              navigate("/top-rated/movies")
            }
            className="w-fit rounded-full border border-yellow-400/20 px-5 py-3 text-sm text-zinc-300 transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-black sm:text-base"
          >
            View All →
          </button>

        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">

          {movies
            .slice(0, 8)
            .map((movie) => (

              <MovieCard
                key={movie.id}
                movie={movie}
              />

            ))}

        </div>

      </div>

    </section>
  );
};

export default TopRatedSection;