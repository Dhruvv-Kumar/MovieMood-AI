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
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">

          <h2 className="mb-10 text-4xl font-bold text-white">
            ⭐ Top Rated Movies
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-[430px] animate-pulse rounded-3xl bg-zinc-800"
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
          Couldn't load top rated movies.
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
          className="mb-16 flex items-end justify-between"
        >

          <div>

            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-yellow-400">
              IMDb
            </p>

            <h2 className="text-5xl font-bold text-white">
              ⭐ Top Rated Movies
            </h2>

          </div>

          <button
            onClick={() =>
              navigate("/top-rated/movies")
            }
            className="rounded-full border border-yellow-400/20 px-5 py-3 text-zinc-300 transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            View All →
          </button>

        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

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