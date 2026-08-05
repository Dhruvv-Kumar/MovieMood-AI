import movieService from "../services/movieService";

const today = new Date().toISOString().split("T")[0];

const baseParams = {
  include_adult: false,
  sort_by: "popularity.desc",
  page: 1,
  "vote_count.gte": 100,
  "primary_release_date.lte": today,
  "first_air_date.lte": today,
};

const mergeUnique = (...lists) => {
  const map = new Map();

  lists.flat().forEach((item) => {
    if (!item) return;

    const key = `${item.media_type}-${item.id}`;

    if (!map.has(key)) {
      map.set(key, item);
    }
  });

  return [...map.values()].sort(
    (a, b) => (b.popularity || 0) - (a.popularity || 0)
  );
};

export const executeSearch = async (intent) => {
  if (!intent) return [];

  switch (intent.type) {
    // --------------------------------
    // Actor Search
    // --------------------------------
    case "actor": {
      const person = await movieService.searchPerson(intent.person);

      let actorResults = [];

      if (person) {
        actorResults = await movieService.discoverByActor(person.id);
      }

      // Fallback if discover returns very few results
     if (actorResults.length < 15) {
  const keywordResults = await movieService.searchMovies(
    intent.person
  );

  actorResults = mergeUnique(
    actorResults,
    keywordResults
  );
}

return actorResults;
    }

    // --------------------------------
    // Movie Search
    // --------------------------------
    case "movie":
      return await movieService.searchMovies(intent.query);

    // --------------------------------
    // TV Search
    // --------------------------------
    case "tv":
      return await movieService.searchTVShows(intent.query);

    // --------------------------------
    // Franchise / Character Search
    // --------------------------------
    case "franchise":
      return await movieService.searchMovies(intent.query);

    // --------------------------------
    // AI Discover
    // --------------------------------
    case "discover": {
      const params = {
        ...baseParams,
      };

      if (intent.genres?.length) {
        params.with_genres = intent.genres.join(",");
      }

      if (intent.language) {
        params.with_original_language = intent.language;
      }

      if (intent.region) {
        params.region = intent.region;
      }

      if (intent.year) {
        params.primary_release_year = intent.year;
        params.first_air_date_year = intent.year;
      }

      let discoverResults = [];

      // Use Discover only when AI actually found genres
      if (intent.genres?.length) {
        discoverResults = await movieService.discoverMovies(params);
      }

      let keywordResults = [];

      if (intent.keywords?.length) {
        keywordResults = await movieService.searchMovies(
          intent.keywords.join(" ")
        );
      }

      let moodResults = [];

      if (intent.mood) {
        moodResults = await movieService.searchMovies(intent.mood);
      }

      let personResults = [];

      if (intent.person) {
        const person = await movieService.searchPerson(intent.person);

        if (person) {
          personResults =
            await movieService.discoverByActor(person.id);
        }
      }

      let franchiseResults = [];

      if (intent.franchise) {
        franchiseResults = await movieService.searchMovies(
          intent.franchise
        );
      }

      let queryResults = [];

      if (intent.query) {
        queryResults = await movieService.searchMovies(
          intent.query
        );
      }

      return mergeUnique(
        discoverResults,
        keywordResults,
        moodResults,
        personResults,
        franchiseResults,
        queryResults
      );
    }

    default:
      return [];
  }
};

export default executeSearch;