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
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Explore by Mood
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            How are you feeling today?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Pick a mood and let MovieMood AI discover movies that perfectly
            match your vibe.
          </p>
        </motion.div>

        {/* Mood Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {moods.map((mood, index) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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