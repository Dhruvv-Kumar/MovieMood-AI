import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IMAGE_BASE_URL } from "../../api/tmdb";

const CastSection = ({ cast = [] }) => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  if (!cast.length) return null;

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -700,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 700,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-20">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <h2 className="text-3xl font-bold text-white">
            👥 Top Cast
          </h2>

          <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300">
            {cast.length} Cast Members
          </span>

        </div>

        {/* Arrows */}

        <div className="flex gap-3">

          <button
            onClick={scrollLeft}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/20 bg-[#08111F] text-xl text-white transition hover:bg-blue-600"
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/20 bg-[#08111F] text-xl text-white transition hover:bg-blue-600"
          >
            →
          </button>

        </div>

      </div>

      {/* Cast Slider */}

      <div
        ref={sliderRef}
        className="
          flex
          gap-6
          overflow-x-auto
          scroll-smooth
          pb-4
          scrollbar-hide
        "
      >
        {cast.map((actor) => (
          <motion.div
  onClick={() => navigate(`/actor/${actor.id}`)}
            key={actor.id}
            whileHover={{
              y: -8,
              scale: 1.04,
            }}
            transition={{
              duration: 0.25,
            }}
            className="min-w-[190px] cursor-pointer rounded-3xl border border-blue-500/20 bg-[#08111F] p-5 transition hover:border-blue-500"
          >
            <img
              src={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${actor.profile_path}`
                  : "https://placehold.co/300x450/111827/FFFFFF?text=No+Image"
              }
              alt={actor.name}
              className="mx-auto h-36 w-36 rounded-full border-4 border-blue-500/20 object-cover"
            />

            <h3 className="mt-5 line-clamp-1 text-center text-lg font-bold text-white">
              {actor.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-center text-sm text-slate-400">
              {actor.character}
            </p>

            <div className="mt-4 text-center">
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                {actor.known_for_department}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default CastSection;