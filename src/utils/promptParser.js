export const parseGeminiResponse = (response) => {
  const emptyResult = {
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

  try {
    if (!response || typeof response !== "string") {
      return emptyResult;
    }

    // Remove markdown if AI sends it
    let cleaned = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Extract JSON if AI adds extra text
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
      cleaned = cleaned.substring(start, end + 1);
    }

    const parsed = JSON.parse(cleaned);

    return {
      genres: Array.isArray(parsed.genres)
        ? parsed.genres.filter(Number.isFinite)
        : [],

      keywords: Array.isArray(parsed.keywords)
        ? parsed.keywords
        : parsed.keywords
        ? [parsed.keywords]
        : [],

      mood: parsed.mood || "",

      language: parsed.language || "",

      region: parsed.region || "",

      year: parsed.year || "",

      person: parsed.person || "",

      franchise: parsed.franchise || "",

      mediaType:
        parsed.mediaType === "tv"
          ? "tv"
          : "movie",

      familyFriendly:
        typeof parsed.familyFriendly === "boolean"
          ? parsed.familyFriendly
          : false,
    };
  } catch (error) {
    console.error("Prompt Parser Error:", error);

    return emptyResult;
  }
};

export default parseGeminiResponse;