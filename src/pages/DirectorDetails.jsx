import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import { IMAGE_BASE_URL } from "../api/tmdb";
import { movieService } from "../services/movieService";
import MovieCard from "../components/trending/MovieCard";

const DirectorDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [director, setDirector] = useState(null);

  const [movies, setMovies] = useState([]);

  const [tvShows, setTVShows] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDirector() {
      try {
        setLoading(true);

        const [
          directorData,
          movieCredits,
          tvCredits,
        ] = await Promise.all([
          movieService.getDirectorDetails(id),
          movieService.getDirectorMovies(id),
          movieService.getDirectorTV(id),
        ]);

        movieCredits.sort(
          (a, b) =>
            (b.vote_average || 0) -
            (a.vote_average || 0)
        );

        tvCredits.sort(
          (a, b) =>
            (b.vote_average || 0) -
            (a.vote_average || 0)
        );

        setDirector(directorData);

        setMovies(movieCredits);

        setTVShows(tvCredits);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load director."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDirector();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <h1 className="text-3xl font-bold text-white">
          Loading Director...
        </h1>
      </div>
    );
  }

  if (error || !director) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <h1 className="text-2xl text-red-400">
          {error || "Director not found."}
        </h1>
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-[#020617] text-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="mb-10 rounded-xl bg-[#08111F] px-6 py-3 transition hover:bg-blue-600"
        >
          ← Back
        </button>

        <div className="grid items-start gap-10 lg:grid-cols-[260px_1fr]">

          {/* Director Image */}

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
              director.profile_path
                ? `${IMAGE_BASE_URL}${director.profile_path}`
                : "https://placehold.co/500x750/111827/FFFFFF?text=No+Image"
            }
            alt={director.name}
            className="h-[390px] w-[260px] rounded-3xl border border-blue-500/20 object-cover shadow-2xl lg:mx-0 mx-auto"
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

            <h1 className="text-5xl font-black">
              {director.name}
            </h1>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="rounded-full bg-blue-600/20 px-4 py-2 text-blue-300">
                ⭐ Popularity: {Math.round(director.popularity)}
              </span>

              <span className="rounded-full bg-purple-600/20 px-4 py-2 text-purple-300">
                🎬 Director
              </span>

              {director.birthday && (
                <span className="rounded-full bg-green-600/20 px-4 py-2 text-green-300">
                  🎂 {director.birthday}
                </span>
              )}

            </div>

            {director.place_of_birth && (

              <p className="mt-8 text-lg text-slate-300">
                📍 {director.place_of_birth}
              </p>

            )}

            {director.also_known_as?.length > 0 && (

              <div className="mt-8">

                <h3 className="mb-3 text-xl font-bold">
                  Also Known As
                </h3>

                <div className="flex flex-wrap gap-3">

                  {director.also_known_as
                    .slice(0, 6)
                    .map((name) => (

                      <span
                        key={name}
                        className="rounded-full bg-[#08111F] px-4 py-2 text-sm"
                      >
                        {name}
                      </span>

                    ))}

                </div>

              </div>

            )}

            {director.biography && (

              <div className="mt-10">

                <h2 className="mb-4 text-3xl font-bold">
                  Biography
                </h2>

                <p className="leading-8 text-slate-300">
                  {director.biography}
                </p>

              </div>

            )}

          </motion.div>

        </div>
                {/* Movies Directed */}

        <section className="mt-24">

          <h2 className="mb-10 text-4xl font-bold">
            🎬 Best Movies Directed
          </h2>

          {movies.length === 0 ? (

            <div className="rounded-3xl bg-[#08111F] p-10 text-center text-slate-400">
              No directed movies found.
            </div>

          ) : (

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

              {movies.slice(0, 12).map((movie) => (

                <MovieCard
                  key={movie.id}
                  movie={movie}
                />

              ))}

            </div>

          )}

        </section>

        {/* TV Shows Directed */}

        <section className="mt-24">

          <h2 className="mb-10 text-4xl font-bold">
            📺 TV Shows Directed
          </h2>

          {tvShows.length === 0 ? (

            <div className="rounded-3xl bg-[#08111F] p-10 text-center text-slate-400">
              No TV shows found.
            </div>

          ) : (

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

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

export default DirectorDetails;