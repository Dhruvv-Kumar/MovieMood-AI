import { motion } from "framer-motion";

const TrailerSection = ({ trailer }) => {
  if (!trailer) {
    return (
      <section className="mt-20">

        <h2 className="mb-8 text-3xl font-bold text-white">
          🎬 Trailer
        </h2>

        <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-12 text-center">

          <div className="text-6xl">🎥</div>

          <h3 className="mt-6 text-2xl font-bold text-white">
            Trailer Not Available
          </h3>

          <p className="mt-4 text-slate-400">
            Sorry, TMDB doesn't have a trailer for this title.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-bold text-white">
          🎬 Official Trailer
        </h2>

        <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm text-red-300">
          ▶ YouTube
        </span>

      </div>

      <motion.div
        whileHover={{
          scale: 1.01,
        }}
        transition={{
          duration: 0.3,
        }}
        className="overflow-hidden rounded-3xl border border-blue-500/20 bg-[#08111F] shadow-2xl"
      >

        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Official Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

      </motion.div>

      <div className="mt-5 flex items-center justify-between">

        <p className="text-slate-400">
          Watch the official trailer on YouTube.
        </p>

        <a
          href={`https://www.youtube.com/watch?v=${trailer.key}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
        >
          Watch on YouTube →
        </a>

      </div>

    </section>
  );
};

export default TrailerSection;