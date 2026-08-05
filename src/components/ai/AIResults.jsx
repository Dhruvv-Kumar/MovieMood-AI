import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const AIResults = ({ results = [] }) => {
  if (!results.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-14 rounded-3xl border border-dashed border-blue-500/20 bg-[#08111F]/60 p-12 text-center backdrop-blur-xl"
      >
        <div className="mb-5 text-6xl">🎬</div>

        <h3 className="text-2xl font-bold text-white">
          No Recommendations Found
        </h3>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
          Try searching something like
          <br />
          <span className="text-blue-400">
            Romantic Bollywood • Marvel • SRK Movies • Anime • Korean Thriller
          </span>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.section
      id="ai-results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-14"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          AI Recommendations
        </h2>

        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400">
          {results.length} Results
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((item) => {
          const title = item.title || item.name;

          const year = (
            item.release_date ||
            item.first_air_date ||
            ""
          ).slice(0, 4);

          const mediaType =
            item.media_type === "tv"
              ? "TV"
              : "Movie";

          return (
            <Link
              key={`${item.media_type}-${item.id}`}
              to={`/movie/${item.media_type || "movie"}/${item.id}`}
            >
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#08111F] shadow-lg transition-all hover:border-blue-500/40"
              >
                <div className="relative">
                  <img
                    src={
                      item.poster_path
                        ? `${IMAGE_BASE_URL}${item.poster_path}`
                        : "https://placehold.co/500x750/111827/FFFFFF?text=No+Poster"
                    }
                    alt={title}
                    className="aspect-[2/3] w-full object-cover"
                  />

                  <div className="absolute left-3 top-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
                        mediaType === "TV"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {mediaType === "TV"
                        ? "📺 TV"
                        : "🎬 Movie"}
                    </span>
                  </div>

                  <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-yellow-300 backdrop-blur">
                    ⭐{" "}
                    {item.vote_average
                      ? item.vote_average.toFixed(1)
                      : "N/A"}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-1 text-lg font-bold text-white">
                    {title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {year || "Unknown Year"}
                  </p>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
                    {item.overview ||
                      "No description available."}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                      Popularity {Math.round(item.popularity || 0)}
                    </span>

                    <span className="text-sm font-semibold text-blue-400">
                      View →
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
};

export default AIResults;