import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../api/tmdb";

const SimilarMovies = ({
  movies = [],
  mediaType = "movie",
}) => {
  const navigate = useNavigate();

  if (!movies.length) return null;

  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-bold text-white">
          🎥 Similar Movies
        </h2>

        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300">
          {movies.length} Results
        </span>

      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

        {movies.slice(0, 15).map((movie) => {

          const title =
            movie.title || movie.name;

          const year = (
            movie.release_date ||
            movie.first_air_date ||
            ""
          ).slice(0, 4);

          return (

            <motion.div
              key={`${movie.media_type || mediaType}-${movie.id}`}
              whileHover={{
                y: -8,
                scale: 1.04,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() =>
                navigate(
                  `/movie/${
                    movie.media_type ||
                    mediaType
                  }/${movie.id}`
                )
              }
              className="min-w-[220px] cursor-pointer overflow-hidden rounded-3xl border border-blue-500/20 bg-[#08111F] hover:border-blue-500/50"
            >

              <img
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : "https://placehold.co/500x750/111827/FFFFFF?text=No+Poster"
                }
                alt={title}
                className="aspect-[2/3] w-full object-cover"
              />

              <div className="p-5">

                <h3 className="line-clamp-1 text-lg font-bold text-white">
                  {title}
                </h3>

                <p className="mt-2 text-slate-400">
                  {year || "Unknown"}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm text-yellow-300">
                    ⭐{" "}
                    {movie.vote_average
                      ? movie.vote_average.toFixed(1)
                      : "N/A"}
                  </span>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                    {movie.media_type === "tv"
                      ? "TV"
                      : "Movie"}
                  </span>

                </div>

              </div>

            </motion.div>

          );
        })}

      </div>

    </section>
  );
};

export default SimilarMovies;