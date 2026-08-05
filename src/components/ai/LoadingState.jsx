import { motion } from "framer-motion";

const cards = Array.from({ length: 8 });

const LoadingState = () => {
  return (
    <motion.div
      id="loading-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-14"
    >
      {/* Header */}

      <div className="mb-12 text-center">

        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="mb-5 text-6xl"
        >
          🤖
        </motion.div>

        <h2 className="text-3xl font-bold text-white">
          MovieMood AI is Thinking...
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Analyzing your request and finding the best movies & TV shows just for you.
        </p>

        {/* Animated Dots */}

        <div className="mt-6 flex justify-center gap-2">

          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: dot * 0.2,
              }}
              className="h-3 w-3 rounded-full bg-blue-500"
            />
          ))}

        </div>

      </div>

      {/* Skeleton Cards */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {cards.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.4 }}
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              delay: index * 0.08,
            }}
            className="overflow-hidden rounded-3xl border border-blue-500/10 bg-[#08111F]"
          >
            <div className="aspect-[2/3] animate-pulse bg-slate-800" />

            <div className="space-y-3 p-5">

              <div className="h-5 w-3/4 animate-pulse rounded bg-slate-700" />

              <div className="h-4 w-full animate-pulse rounded bg-slate-800" />

              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />

              <div className="mt-6 flex justify-between">

                <div className="h-7 w-20 animate-pulse rounded-full bg-slate-700" />

                <div className="h-5 w-12 animate-pulse rounded bg-slate-700" />

              </div>

            </div>

          </motion.div>
        ))}

      </div>
    </motion.div>
  );
};

export default LoadingState;