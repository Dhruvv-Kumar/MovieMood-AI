import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const placeholders = [
  "Romantic Bollywood movies...",
  "SRK movies...",
  "Movies like Interstellar...",
  "Best Korean thriller...",
  "Weekend family movie...",
  "Mind blowing ending...",
  "Best anime series...",
  "Marvel movies...",
];

const suggestions = [
  "Romantic Bollywood",
  "SRK Movies",
  "Marvel",
  "Anime",
  "Korean Thriller",
  "Comedy",
  "Weekend Movies",
  "Mind Bending",
];

const PromptInput = ({
  prompt,
  setPrompt,
  onSearch,
  loading,
}) => {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setPlaceholder(placeholders[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !loading
    ) {
      e.preventDefault();
      onSearch();
    }
  };

  const handleSuggestion = (text) => {
  if (loading) return;

  onSearch(text);
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl"
    >
      <div className="rounded-3xl border border-blue-500/20 bg-[#08111F]/80 p-6 backdrop-blur-xl">

        {/* Suggestions */}

        <div className="mb-5 flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button
              key={item}
              disabled={loading}
              onClick={() => handleSuggestion(item)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500 hover:bg-blue-500/20 hover:text-white disabled:opacity-50"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Textarea */}

        <textarea
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={loading}
          className="w-full resize-none rounded-2xl bg-transparent text-lg text-white placeholder:text-slate-500 outline-none disabled:opacity-70"
        />

        {/* Footer */}

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <span className="text-sm text-slate-500">
            {prompt.length}/500 characters
          </span>

          <motion.button
            whileHover={
              loading
                ? {}
                : { scale: 1.04 }
            }
            whileTap={
              loading
                ? {}
                : { scale: 0.96 }
            }
            disabled={
              loading || !prompt.trim()
            }
            onClick={onSearch}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "🎬 Searching MovieMood AI..."
              : "✨ Ask MovieMood AI"}
          </motion.button>

        </div>

      </div>
    </motion.div>
  );
};

export default PromptInput;