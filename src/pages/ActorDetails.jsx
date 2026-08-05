import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import { IMAGE_BASE_URL } from "../api/tmdb";
import { movieService } from "../services/movieService";
import MovieCard from "../components/trending/MovieCard";

const ActorDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [actor, setActor] = useState(null);

  const [movies, setMovies] = useState([]);

  const [tvShows, setTVShows] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadActor() {
      try {
        setLoading(true);

        const [
          actorData,
          movieCredits,
          tvCredits,
        ] = await Promise.all([
          movieService.getActorDetails(id),
          movieService.getActorMovieCredits(id),
          movieService.getActorTVCredits(id),
        ]);

        setActor(actorData);

        setMovies(movieCredits);

        setTVShows(tvCredits);
      } catch (err) {
        console.error(err);

        setError("Failed to load actor.");
      } finally {
        setLoading(false);
      }
    }

    loadActor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <h1 className="text-3xl font-bold text-white">
          Loading Actor...
        </h1>
      </div>
    );
  }

  if (error || !actor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <h1 className="text-2xl text-red-400">
          {error || "Actor not found."}
        </h1>
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-[#020617] text-white">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">

        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="mb-8 rounded-xl bg-[#08111F] px-5 py-3 text-sm transition hover:bg-blue-600 sm:mb-10 sm:px-6 sm:text-base"
        >
          ← Back
        </button>

        {/* Actor Hero */}

        <div className="grid gap-8 lg:grid-cols-[260px,1fr] lg:gap-12">

          {/* Image */}

          <motion.img
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            src={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${actor.profile_path}`
                : "https://placehold.co/500x750/111827/FFFFFF?text=No+Image"
            }
            alt={actor.name}
            className="mx-auto h-[300px] w-[210px] rounded-3xl border border-blue-500/20 object-cover shadow-2xl sm:h-[360px] sm:w-[240px] lg:mx-0 lg:h-[390px] lg:w-[260px]"
          />

          {/* Details */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">
              {actor.name}
            </h1>

            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">

              <span className="rounded-full bg-blue-600/20 px-3 py-2 text-xs text-blue-300 sm:px-4 sm:text-sm">
                ⭐ Popularity: {Math.round(actor.popularity)}
              </span>

              {actor.known_for_department && (
                <span className="rounded-full bg-purple-600/20 px-3 py-2 text-xs text-purple-300 sm:px-4 sm:text-sm">
                  🎭 {actor.known_for_department}
                </span>
              )}

              {actor.birthday && (
                <span className="rounded-full bg-green-600/20 px-3 py-2 text-xs text-green-300 sm:px-4 sm:text-sm">
                  🎂 {actor.birthday}
                </span>
              )}

            </div>

            {actor.place_of_birth && (

              <p className="mt-6 text-base text-slate-300 sm:mt-8 sm:text-lg">

                📍 {actor.place_of_birth}

              </p>

            )}

            {actor.also_known_as?.length > 0 && (

              <div className="mt-8">

                <h3 className="mb-3 text-lg font-bold sm:text-xl">
                  Also Known As
                </h3>

                <div className="flex flex-wrap gap-3">

                  {actor.also_known_as
                    .slice(0, 6)
                    .map((name) => (

                      <span
                        key={name}
                        className="rounded-full bg-[#08111F] px-3 py-2 text-xs sm:px-4 sm:text-sm"
                      >
                        {name}
                      </span>

                    ))}

                </div>

              </div>

            )}

            {actor.biography && (

              <div className="mt-10">

                <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                  Biography
                </h2>

                <p className="text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                  {actor.biography}
                </p>

              </div>

            )}

          </motion.div>

        </div>
                {/* Movies */}

        <section className="mt-24">

          <h2 className="mb-8 text-3xl font-bold sm:mb-10 sm:text-4xl">
            🎬 Popular Movies
          </h2>

          {movies.length === 0 ? (

            <div className="rounded-3xl bg-[#08111F] p-10 text-center text-slate-400">
              No movies found.
            </div>

          ) : (

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">

              {movies.slice(0, 12).map((movie) => (

                <MovieCard
                  key={movie.id}
                  movie={movie}
                />

              ))}

            </div>

          )}

        </section>

        {/* TV Shows */}

        <section className="mt-24">

          <h2 className="mb-8 text-3xl font-bold sm:mb-10 sm:text-4xl">
            📺 TV Shows
          </h2>

          {tvShows.length === 0 ? (

            <div className="rounded-3xl bg-[#08111F] p-10 text-center text-slate-400">
              No TV shows found.
            </div>

          ) : (

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">

              {tvShows.slice(0, 12).map((show) => (

                <MovieCard
                  key={show.id}
                  movie={show}
                />

              ))}

            </div>

          )}

        </section>
              </div>

    </div>
  );
};

export default ActorDetails;