import { motion } from "framer-motion";

const genres = [
  { label: "All", value: "" },
  { label: "Action", value: "28" },
  { label: "Adventure", value: "12" },
  { label: "Comedy", value: "35" },
  { label: "Drama", value: "18" },
  { label: "Horror", value: "27" },
  { label: "Romance", value: "10749" },
  { label: "Sci-Fi", value: "878" },
  { label: "Thriller", value: "53" },
];

const languages = [
  { label: "All", value: "" },
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "Korean", value: "ko" },
  { label: "Japanese", value: "ja" },
];

const ratings = [
  "",
  "6",
  "7",
  "8",
  "9",
];

const sorts = [
  {
    label: "Popularity",
    value: "popularity.desc",
  },
  {
    label: "Rating",
    value: "vote_average.desc",
  },
  {
    label: "Newest",
    value: "primary_release_date.desc",
  },
];

const years = Array.from(
  { length: 26 },
  (_, i) => `${2025 - i}`
);

const FilterBar = ({
  filters,
  setFilters,
}) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="mb-20 rounded-3xl border border-white/10 bg-[#08111F] p-6"
    >
      <div className="grid gap-5 md:grid-cols-5">

        <select
          value={filters.genre}
          onChange={(e) =>
            handleChange(
              "genre",
              e.target.value
            )
          }
          className="rounded-xl bg-[#020617] p-3 text-white outline-none"
        >
          {genres.map((g) => (
            <option
              key={g.value}
              value={g.value}
            >
              {g.label}
            </option>
          ))}
        </select>

        <select
          value={filters.language}
          onChange={(e) =>
            handleChange(
              "language",
              e.target.value
            )
          }
          className="rounded-xl bg-[#020617] p-3 text-white outline-none"
        >
          {languages.map((l) => (
            <option
              key={l.value}
              value={l.value}
            >
              {l.label}
            </option>
          ))}
        </select>

        <select
          value={filters.year}
          onChange={(e) =>
            handleChange(
              "year",
              e.target.value
            )
          }
          className="rounded-xl bg-[#020617] p-3 text-white outline-none"
        >
          <option value="">
            All Years
          </option>

          {years.map((year) => (
            <option
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>

        <select
          value={filters.rating}
          onChange={(e) =>
            handleChange(
              "rating",
              e.target.value
            )
          }
          className="rounded-xl bg-[#020617] p-3 text-white outline-none"
        >
          <option value="">
            Rating
          </option>

          {ratings.map((rating) =>
            rating ? (
              <option
                key={rating}
                value={rating}
              >
                {rating}+
              </option>
            ) : null
          )}
        </select>

        <select
          value={filters.sort}
          onChange={(e) =>
            handleChange(
              "sort",
              e.target.value
            )
          }
          className="rounded-xl bg-[#020617] p-3 text-white outline-none"
        >
          {sorts.map((sort) => (
            <option
              key={sort.value}
              value={sort.value}
            >
              {sort.label}
            </option>
          ))}
        </select>

      </div>
    </motion.div>
  );
};

export default FilterBar;