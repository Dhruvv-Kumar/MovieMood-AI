import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PromptInput from "./PromptInput";
import LoadingState from "./LoadingState";
import AIResults from "./AIResults";

const genreNames = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const AIMoodSearch = ({
  prompt,
  setPrompt,
  loading,
  results,
  analysis,
  error,
  searchMovies,
  initialPrompt = "",
}) => {
  useEffect(() => {
    if (initialPrompt) {
      searchMovies(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  return (
    <section
      id="ai-search"
      className="relative py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#2563eb20,transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12"
        >

          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs text-blue-400 sm:px-4 sm:text-sm">
            🤖 AI Powered
          </span>

          <h2 className="mt-5 text-3xl font-bold text-white sm:mt-6 sm:text-4xl lg:text-5xl">
            Find Movies & TV Shows With AI
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm leading-7 text-slate-400 sm:mt-5 sm:text-base">
            Search naturally like ChatGPT.
            <span className="text-blue-400">
              {" "}
              Romantic Bollywood, SRK Movies, Korean Thriller,
              Anime, Weekend Movies
            </span>
          </p>

        </motion.div>

        {/* Prompt */}

        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          onSearch={searchMovies}
        />

        {/* Error */}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-300 sm:text-base"
          >
            {error}
          </motion.div>
        )}

        {/* AI Analysis */}

        {analysis && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 rounded-3xl border border-blue-500/20 bg-[#08111F]/80 p-4 sm:p-6"
          >

            <h3 className="mb-5 text-lg font-bold text-white sm:text-xl">
              🧠 AI Analysis
            </h3>

            <div className="flex flex-wrap gap-2 sm:gap-3">

              {analysis.mood && (
                <span className="rounded-full bg-blue-600/20 px-3 py-2 text-xs text-blue-300 sm:px-4 sm:text-sm">
                  😊 {analysis.mood}
                </span>
              )}

              {analysis.language && (
                <span className="rounded-full bg-green-600/20 px-3 py-2 text-xs text-green-300 sm:px-4 sm:text-sm">
                  🌍 {analysis.language.toUpperCase()}
                </span>
              )}

              {analysis.genres?.map((id) => (
                <span
                  key={id}
                  className="rounded-full bg-purple-600/20 px-3 py-2 text-xs text-purple-300 sm:px-4 sm:text-sm"
                >
                  🎭 {genreNames[id] || id}
                </span>
              ))}

            </div>

          </motion.div>
        )}

        {/* Results */}

        <AnimatePresence mode="wait">
          {loading ? (
            <div id="loading-state">
              <LoadingState />
            </div>
          ) : (
            <AIResults results={results} />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default AIMoodSearch;