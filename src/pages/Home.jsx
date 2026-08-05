import { useState } from "react";

import Hero from "../components/home/Hero";
import TrendingSection from "../components/trending/TrendingSection";
import MoodSection from "../components/mood/MoodSection";
import AIMoodSearch from "../components/ai/AIMoodSearch";
import TopRatedSection from "../components/trending/TopRatedSection";

import useAISearch from "../hooks/useAISearch";

const Home = () => {

  const {
    prompt,
    setPrompt,
    loading,
    results,
    analysis,
    error,
    searchMovies,
  } = useAISearch();

  const [selectedPrompt, setSelectedPrompt] = useState("");

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020617] text-white">

      <Hero
        prompt={prompt}
        setPrompt={setPrompt}
        onSearch={searchMovies}
      />

      <TrendingSection />
      <TopRatedSection />

      <MoodSection
        onMoodSelect={setSelectedPrompt}
      />

      <AIMoodSearch
        prompt={prompt}
        setPrompt={setPrompt}
        loading={loading}
        results={results}
        analysis={analysis}
        error={error}
        searchMovies={searchMovies}
        initialPrompt={selectedPrompt}
      />

    </main>
  );
};

export default Home;