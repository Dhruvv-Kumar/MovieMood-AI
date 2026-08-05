import { motion } from "framer-motion";
import { IMAGE_BASE_URL } from "../../api/tmdb";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const mediaType = movie.media_type || "movie";

  const handleExplore = () => {
    navigate(`/movie/${mediaType}/${movie.id}`);
  };

  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      transition={{
        duration: 0.35,
      }}
      onClick={handleExplore}
      className="
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-zinc-900/60
        shadow-xl
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-blue-500/50
        hover:shadow-[0_15px_45px_rgba(59,130,246,0.25)]
      "
    >
      <div
        className="
          relative
          h-[310px]
          overflow-hidden
          rounded-3xl

          sm:h-[360px]

          lg:h-[430px]
        "
      >
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : "https://placehold.co/500x750/111827/FFFFFF?text=No+Poster"
          }
          alt={movie.title || movie.name}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-white/10
            via-transparent
            to-transparent
            opacity-0
            transition
            duration-500
            group-hover:opacity-100
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            w-full

            p-3

            sm:p-4

            lg:p-6
          "
        >
          <div className="flex items-center justify-between">

            <span
              className="
                rounded-full
                border
                border-blue-500/40
                bg-blue-500

                px-2
                py-1
                text-[11px]

                sm:px-3
                sm:text-xs

                font-bold
                text-black
                shadow-lg
              "
            >
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
            </span>

            <span
              className="
                text-[11px]
                text-zinc-300

                sm:text-sm
              "
            >
              {(
                movie.release_date ||
                movie.first_air_date ||
                ""
              ).split("-")[0] || "----"}
            </span>

          </div>

          <h3
            className="
              mt-3
              line-clamp-2

              text-base

              sm:text-lg

              lg:text-2xl

              font-bold
              text-white
              transition
              duration-300
              group-hover:text-blue-300
            "
          >
            {movie.title || movie.name}
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleExplore();
            }}
            className="
              mt-4
              w-full
              rounded-xl
              bg-blue-600

              py-2

              text-sm

              sm:py-3
              sm:text-base

              font-semibold
              text-black
              transition-all
              duration-300
              hover:bg-blue-500

              opacity-100
              translate-y-0

              lg:translate-y-6
              lg:opacity-0
              lg:group-hover:translate-y-0
              lg:group-hover:opacity-100
            "
          >
            ▶ Explore
          </button>

        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;