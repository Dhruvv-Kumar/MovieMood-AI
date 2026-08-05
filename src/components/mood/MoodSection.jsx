import { motion } from "framer-motion";
import moods from "./moods";
import MoodCard from "./MoodCard";

const MoodSection = ({ onMoodSelect }) => {
  const handleMoodSelect = (mood) => {
    onMoodSelect(mood.prompt);

    const aiSection = document.getElementById("ai-search");

    if (aiSection) {
      aiSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-10 text-center sm:mb-14"
        >

          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400 sm:px-4 sm:text-sm">
            Explore by Mood
          </span>

          <h2 className="mt-5 text-3xl font-bold text-white sm:mt-6 sm:text-4xl lg:text-5xl">
            How are you feeling today?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-base leading-7 text-slate-400 sm:mt-5 sm:text-lg sm:leading-8">
            Pick a mood and let MovieMood AI discover movies that perfectly
            match your vibe.
          </p>

        </motion.div>

        {/* Mood Grid */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">

          {moods.map((mood, index) => (

            <motion.div
              key={mood.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
            >

              <MoodCard
                mood={mood}
                onSelect={handleMoodSelect}
              />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default MoodSection;