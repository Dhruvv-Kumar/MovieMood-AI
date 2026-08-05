import { useState } from "react";
import getAIRecommendations from "../services/aiService";

const useAISearch = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  // updateInput = true -> PromptInput update hoga
  // updateInput = false -> Hero Search / Hero Chips
  const searchMovies = async (
    customPrompt = null,
    updateInput = true
  ) => {
    if (loading) return;

    const query = (customPrompt ?? prompt).trim();

    if (!query) {
      setError("Please enter a movie prompt.");
      return;
    }

    // Sirf PromptInput search ke liye input update hoga
    if (customPrompt !== null && updateInput) {
      setPrompt(customPrompt);
    }

    try {
      setLoading(true);
      setError("");
      setResults([]);
      setAnalysis(null);

      const response = await getAIRecommendations(query);

      if (!response.success) {
        throw new Error(response.error || "Search failed.");
      }

      setResults(response.movies ?? []);
      setAnalysis(response.analysis ?? null);

      setTimeout(() => {
        document
          .getElementById("ai-results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 150);
    } catch (err) {
      console.error(err);

      const message = err?.message || "";

      if (
        message.includes("429") ||
        message.toLowerCase().includes("quota")
      ) {
        setError(
          "AI request limit reached. Please try again after a while."
        );
      } else if (
        message.toLowerCase().includes("network")
      ) {
        setError(
          "Network error. Please check your internet connection."
        );
      } else {
        setError(message || "Something went wrong.");
      }

      setResults([]);
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    prompt,
    setPrompt,
    loading,
    results,
    analysis,
    error,
    searchMovies,
  };
};

export default useAISearch;