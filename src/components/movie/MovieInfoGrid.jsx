import formatCurrency from "../../utils/formatters/formatCurrency";

const MovieInfoGrid = ({ movie, credits }) => {
  if (!movie) return null;

  const director = credits?.crew?.find(
    (person) => person.job === "Director"
  );

  const writers = credits?.crew
    ?.filter(
      (person) =>
        person.job === "Writer" ||
        person.job === "Screenplay"
    )
    .map((person) => person.name)
    .filter(
      (name, index, arr) =>
        arr.indexOf(name) === index
    );

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Movie Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <InfoCard
          title="🎬 Director"
          value={director?.name || "Unknown"}
        />

        <InfoCard
          title="✍️ Writers"
          value={
            writers?.length
              ? writers.join(", ")
              : "Unknown"
          }
        />

        <InfoCard
          title="📅 Status"
          value={movie.status}
        />

        <InfoCard
          title="💰 Budget"
          value={formatCurrency(movie.budget)}
        />

        <InfoCard
          title="💵 Revenue"
          value={formatCurrency(movie.revenue)}
        />

        <InfoCard
          title="⭐ Popularity"
          value={Math.round(movie.popularity)}
        />

        <InfoCard
          title="🌍 Original Title"
          value={movie.original_title || movie.original_name}
        />

        <InfoCard
          title="🗣 Languages"
          value={
            movie.spoken_languages
              ?.map((l) => l.english_name)
              .join(", ") || "-"
          }
        />

        <InfoCard
          title="🌎 Countries"
          value={
            movie.production_countries
              ?.map((c) => c.name)
              .join(", ") || "-"
          }
        />

        <InfoCard
          title="🏢 Production"
          value={
            movie.production_companies
              ?.map((c) => c.name)
              .join(", ") || "-"
          }
        />
      </div>
    </section>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-6 transition hover:border-blue-500/40">
    <p className="mb-2 text-sm text-blue-400">
      {title}
    </p>

    <p className="text-lg font-semibold text-white break-words">
      {value || "-"}
    </p>
  </div>
);

export default MovieInfoGrid;