import { motion } from "framer-motion";

const RecentSearches = ({ searches = [], onSearch }) => {
  if (!searches.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 flex flex-wrap items-center justify-center gap-3"
    >
      <span className="text-zinc-400">
        Recent Searches:
      </span>

      {searches.map((item) => (
        <button
          key={item}
          onClick={() => onSearch(item)}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-blue-500 hover:bg-blue-600"
        >
          🕒 {item}
        </button>
      ))}
    </motion.div>
  );
};

export default RecentSearches;