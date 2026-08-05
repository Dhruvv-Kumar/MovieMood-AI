import { motion } from "framer-motion";

const MoodCard = ({ mood, onSelect }) => {
  return (
    <motion.button
      whileHover={{
        y: -8,
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.96,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={() => onSelect(mood)}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${mood.color} p-[1px] text-left backdrop-blur-xl`}
    >
      <div
        className="
          h-full
          rounded-3xl
          bg-[#08111F]/90

          p-4

          sm:p-5

          lg:p-6

          transition-all
          duration-300
          group-hover:bg-[#0d1729]
        "
      >
        <div
          className="
            mb-3

            text-4xl

            sm:text-5xl
          "
        >
          {mood.emoji}
        </div>

        <h3
          className="
            text-lg

            sm:text-xl

            font-bold
            text-white
          "
        >
          {mood.title}
        </h3>

        <p
          className="
            mt-2

            text-xs

            leading-6

            text-gray-400

            sm:text-sm
          "
        >
          {mood.prompt}
        </p>

        <div
          className="
            mt-5

            flex
            items-center
            gap-2

            text-xs

            font-medium
            text-blue-400

            sm:mt-6
            sm:text-sm
          "
        >
          <span>Discover</span>

          <motion.span
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
            }}
          >
            →
          </motion.span>
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      </div>
    </motion.button>
  );
};

export default MoodCard;