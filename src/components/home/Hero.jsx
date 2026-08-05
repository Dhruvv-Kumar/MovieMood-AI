import { useEffect, useState } from "react";

import BackgroundEffects from "./BackgroundEffects";
import FloatingPosters from "./FloatingPosters";
import Particles from "./Particles";
import SearchBox from "./SearchBox";
import MoodChips from "./MoodChips";
import RecentSearches from "./RecentSearches";

const Hero = ({
  prompt,
  setPrompt,
  onSearch,
}) => {

  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved =
  JSON.parse(localStorage.getItem("recent-searches")) || [];

setRecentSearches(saved.slice(0, 3));
  }, []);

  const saveSearch = (query) => {
    const value = query.trim();

    if (!value) return;

    let updated = [
      value,
      ...recentSearches.filter(
        (item) =>
          item.toLowerCase() !==
          value.toLowerCase()
      ),
    ];

    updated = updated.slice(0, 3);

    setRecentSearches(updated);

    localStorage.setItem(
      "recent-searches",
      JSON.stringify(updated)
    );
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    saveSearch(query);

    document
      .getElementById("ai-search")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setTimeout(() => {
      onSearch(query);
    }, 300);
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden 
      bg-gradient-to-br from-[#020617] via-[#08111F] to-black px-4 py-20 sm:px-6"
    >

      <BackgroundEffects />
      <Particles />
      <FloatingPosters />

      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center text-center">

        <span className="mb-5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-300 backdrop-blur-md sm:px-4 sm:text-sm">
          ✨ AI Powered Movie Discovery
        </span>
        

        <p className="mt-6 max-w-2xl px-2 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
          Describe your mood in natural language and let AI recommend
          movies you'll actually enjoy.
        </p>

        <div className="mt-10 w-full">

          <SearchBox
            prompt={prompt}
            setPrompt={setPrompt}
            onSearch={handleSearch}
          />

        </div>

        {/* Recent Searches */}

        <RecentSearches
          searches={recentSearches}
          onSearch={handleSearch}
        />

        <div className="mt-10 w-full">

          <MoodChips
            setPrompt={setPrompt}
          />

        </div>

        <div className="mt-12 hidden animate-bounce text-zinc-500 md:block">

          <div className="flex flex-col items-center gap-2">

            <span className="text-sm uppercase tracking-widest">
              Scroll
            </span>

            <div className="h-10 w-[2px] rounded-full bg-gradient-to-b from-blue-500 to-transparent" />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;