import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { IMAGE_BASE_URL } from "../api/tmdb";
import movieService from "../services/movieService";

import MovieInfoGrid from "../components/movie/MovieInfoGrid";
import TrailerSection from "../components/movie/TrailerSection";
import CastSection from "../components/movie/CastSection";
import ReviewSection from "../components/movie/ReviewSection";
import SimilarMovies from "../components/movie/SimilarMovies";

const MovieDetails = () => {
  const { id, mediaType } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  const [credits, setCredits] = useState({
    cast: [],
    crew: [],
  });

  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [providers, setProviders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        const [
          details,
          creditsData,
          videosData,
          reviewsData,
          similarData,
          providerData,
        ] = await Promise.all([
          movieService.getMovieDetails(id, mediaType),
          movieService.getMovieCredits(id, mediaType),
          movieService.getMovieVideos(id, mediaType),
          movieService.getMovieReviews(id, mediaType),
          movieService.getSimilarMovies(id, mediaType),
          movieService.getWatchProviders(id, mediaType),
        ]);

        setMovie(details);

        setCredits(creditsData);

        setVideos(videosData.results || []);

        setReviews(reviewsData.results || []);

        setSimilar(similarData || []);

        setProviders(
          providerData?.results?.IN?.flatrate ||
          providerData?.results?.US?.flatrate ||
          []
        );
      } catch (err) {
        console.error(err);

        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, mediaType]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712]">
        <div className="text-center">

          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

          <h2 className="mt-8 text-2xl font-bold text-white">
            Loading Movie...
          </h2>

        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712]">
        <div className="text-center">

          <h2 className="text-4xl font-bold text-red-400">
            {error || "Movie Not Found"}
          </h2>

          <button
            onClick={() => navigate("/")}
            className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Back Home
          </button>

        </div>
      </div>
    );
  }

  const title = movie.title || movie.name;

  const releaseDate =
    movie.release_date ||
    movie.first_air_date;

  const trailer =
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    ) || videos[0];

    const director =
  credits?.crew?.find(
    (person) => person.job === "Director"
  ) ||
  credits?.crew?.find(
    (person) =>
      person.known_for_department === "Directing"
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 rounded-xl border border-blue-500/20 bg-[#08111F] px-4 py-3 text-sm transition hover:border-blue-500 sm:mb-10 sm:px-5 sm:text-base"
        >
          ← Back
        </button>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-12">

          {/* Sticky Poster */}

          <div className="mx-auto w-full max-w-[280px] self-start lg:sticky lg:top-24 lg:max-w-none">

            <motion.img
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : "https://placehold.co/500x750/111827/FFFFFF?text=No+Poster"
              }
              alt={title}
              className="w-full rounded-3xl border border-blue-500/20 shadow-2xl"
            />

          </div>

          {/* Right Side Starts */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >

                        {/* Movie Title */}

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {movie.tagline && (
              <p className="mt-3 text-base italic text-blue-400 sm:mt-4 sm:text-xl">
                "{movie.tagline}"
              </p>
            )}

            {/* Rating Cards */}

            <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-5 xl:grid-cols-4">

              <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-5">
                <p className="text-sm text-yellow-300">
                  Rating
                </p>

                <h3 className="mt-2 text-xl font-bold sm:text-3xl">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </h3>
              </div>

              <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-5">
                <p className="text-sm text-blue-300">
                  Votes
                </p>

                <h3 className="mt-2 text-xl font-bold sm:text-3xl">
                  {movie.vote_count?.toLocaleString()}
                </h3>
              </div>

              <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-5">
                <p className="text-sm text-blue-300">
                  Runtime
                </p>

                <h3 className="mt-2 text-xl font-bold sm:text-3xl">
                  {movie.runtime
                    ? `${Math.floor(movie.runtime / 60)}h ${
                        movie.runtime % 60
                      }m`
                    : "-"}
                </h3>
              </div>

              <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-5">
                <p className="text-sm text-blue-300">
                  Release Date
                </p>

                <h3 className="mt-2 text-base font-bold sm:text-xl">
                  {releaseDate || "-"}
                </h3>
              </div>

            </div>

            {/* Meta */}

            <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">

              <span className="rounded-full border border-blue-500/20 bg-[#08111F] px-3 py-2 text-sm sm:px-4">
                🌍 {movie.original_language?.toUpperCase()}
              </span>

              <span className="rounded-full border border-blue-500/20 bg-[#08111F] px-3 py-2 text-sm sm:px-4">
                📌 {movie.status}
              </span>

              <span className="rounded-full border border-blue-500/20 bg-[#08111F] px-3 py-2 text-sm sm:px-4">
                🎬 {mediaType === "tv" ? "TV Show" : "Movie"}
              </span>

            </div>

            {/* Genres */}

            <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">

              {movie.genres?.map((genre) => (

                <span
                  key={genre.id}
                  className="rounded-full bg-blue-600/20 px-3 py-2 text-xs text-blue-300 sm:px-5 sm:text-sm"
                >
                  {genre.name}
                </span>

              ))}

            </div>

            {/* Overview */}

            <section className="mt-12">

              <h2 className="mb-4 text-2xl font-bold sm:mb-5 sm:text-3xl">
                📖 Overview
              </h2>

              <p className="max-w-4xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-9">
                {movie.overview ||
                  "No overview available."}
              </p>

            </section>

            {/* Movie Information */}

            <MovieInfoGrid
              movie={movie}
              credits={credits}
            />

            {/* Director */}

{director && (

  <section className="mt-12">

    <h2 className="mb-4 text-2xl font-bold sm:mb-5 sm:text-3xl">
      🎬 Director
    </h2>

    <motion.div
      whileHover={{
        y: -5,
      }}
      onClick={() =>
        navigate(`/director/${director.id}`)
      }
      className="flex cursor-pointer items-center gap-5 rounded-3xl border border-blue-500/20 bg-[#08111F] p-5 transition hover:border-blue-500"
    >

      <img
        src={
          director.profile_path
            ? `${IMAGE_BASE_URL}${director.profile_path}`
            : "https://placehold.co/150x150/111827/FFFFFF?text=No+Image"
        }
        alt={director.name}
        className="h-24 w-24 rounded-full object-cover"
      />

      <div>

        <h3 className="text-2xl font-bold">
          {director.name}
        </h3>

        <p className="mt-2 text-slate-400">
          Director
        </p>

      </div>

    </motion.div>

  </section>

)}

          </motion.div>

        </div>

        {/* ============================
            GRID ENDS HERE
            BELOW THIS EVERYTHING
            WILL BE FULL WIDTH
        ============================ */}

                {/* =========================
              OTT Platforms
        ========================== */}

        {providers.length > 0 && (
          <section className="mt-20">

            <div className="mb-8 flex items-center justify-between">

              <h2 className="text-3xl font-bold text-white">
                📺 Available On
              </h2>

              <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300">
                {providers.length} Platforms
              </span>

            </div>

            <div className="flex flex-wrap gap-6">

              {providers.map((provider) => (

                <motion.div
                  key={provider.provider_id}
                  whileHover={{
                    y: -6,
                    scale: 1.05,
                  }}
                  className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-5"
                >

                  <img
                    src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />

                  <h3 className="mt-4 text-center font-semibold text-white">
                    {provider.provider_name}
                  </h3>

                </motion.div>

              ))}

            </div>

          </section>
        )}

        {/* =========================
              Languages
        ========================== */}

        <section className="mt-20">

          <h2 className="mb-8 text-3xl font-bold">
            🗣 Available Languages
          </h2>

          <div className="flex flex-wrap gap-4">

            {movie.spoken_languages?.map((language) => (

              <span
                key={language.iso_639_1}
                className="rounded-full border border-blue-500/20 bg-[#08111F] px-5 py-3 text-blue-300"
              >
                {language.english_name}
              </span>

            ))}

          </div>

        </section>

        {/* =========================
              Trailer
        ========================== */}

        <TrailerSection trailer={trailer} />

                {/* =========================
              Cast Section
        ========================== */}

        <CastSection
          cast={credits?.cast || []}
        />

        {/* =========================
              Reviews
        ========================== */}

        <ReviewSection
          reviews={reviews}
        />

        {/* =========================
              Movie Statistics
        ========================== */}

        <section className="mt-20">

          <h2 className="mb-8 text-3xl font-bold">
            📊 Statistics
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-6">

              <p className="text-sm text-blue-400">
                Popularity
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                {Math.round(movie.popularity || 0)}
              </h3>

            </div>

            <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-6">

              <p className="text-sm text-blue-400">
                Vote Average
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                ⭐ {movie.vote_average?.toFixed(1)}
              </h3>

            </div>

            <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-6">

              <p className="text-sm text-blue-400">
                Total Votes
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                {movie.vote_count?.toLocaleString()}
              </h3>

            </div>

            <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-6">

              <p className="text-sm text-blue-400">
                Original Language
              </p>

              <h3 className="mt-3 text-3xl font-bold uppercase">
                {movie.original_language}
              </h3>

            </div>

          </div>

        </section>

        {/* =========================
              Production Companies
        ========================== */}

        {movie.production_companies?.length > 0 && (

          <section className="mt-20">

            <h2 className="mb-8 text-3xl font-bold">
              🏢 Production Companies
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {movie.production_companies.map((company) => (

                <motion.div
                  key={company.id}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-6"
                >

                  {company.logo_path ? (

                    <img
                      src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                      alt={company.name}
                      className="mb-5 h-20 object-contain"
                    />

                  ) : (

                    <div className="mb-5 flex h-20 items-center justify-center rounded-2xl bg-[#0F172A] text-4xl">
                      🎬
                    </div>

                  )}

                  <h3 className="text-xl font-bold text-white">
                    {company.name}
                  </h3>

                  <p className="mt-2 text-slate-400">
                    🌍 {company.origin_country || "Unknown"}
                  </p>

                </motion.div>

              ))}

            </div>

          </section>

        )}

                {/* =========================
              Similar Movies
        ========================== */}

        <SimilarMovies
          movies={similar}
          mediaType={mediaType}
        />

      </div>

    </div>
  );
};

export default MovieDetails;