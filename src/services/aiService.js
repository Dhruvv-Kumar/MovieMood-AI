import { analyzeMood } from "../api/gemini";
import { parseGeminiResponse } from "../utils/promptParser";
import resolveIntent from "../search/intentRouter";
import executeSearch from "../search/searchEngine";

export const getAIRecommendations = async (prompt) => {
  try {
    const cleanPrompt = prompt?.trim();

    if (!cleanPrompt) {
      return {
        success: false,
        analysis: null,
        intent: null,
        movies: [],
        error: "Please enter a prompt.",
      };
    }

    // STEP 1 → Initial Intent Detection
    let intent = resolveIntent({}, cleanPrompt);

    let analysis = {
      genres: [],
      keywords: [],
      mood: "",
      language: "",
      region: "",
      year: "",
      person: "",
      franchise: "",
      mediaType: "movie",
      familyFriendly: false,
    };

    // STEP 2 → AI only for complex prompts
    if (intent.type === "ai") {
        const rawResponse = await analyzeMood(cleanPrompt);

console.log("===== RAW AI RESPONSE =====");
console.log(rawResponse);

analysis = parseGeminiResponse(rawResponse);
      try {
        const rawResponse = await analyzeMood(cleanPrompt);

        analysis = parseGeminiResponse(rawResponse);

        intent = {
          type: "discover",
          ...analysis,
          query: cleanPrompt,
        };
      } catch (err) {
        console.warn("AI unavailable. Falling back to TMDB.", err);

        intent = {
          type: "movie",
          query: cleanPrompt,
        };
      }
    }

    // STEP 3 → Execute Search
    const movies = await executeSearch(intent);

    return {
      success: true,
      analysis,
      intent,
      movies,
    };
  } catch (error) {
    console.error("AI Service Error:", error);

    return {
      success: false,
      analysis: null,
      intent: null,
      movies: [],
      error: error.message || "Something went wrong.",
    };
  }
};

export default getAIRecommendations;