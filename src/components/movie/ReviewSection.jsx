import { useState } from "react";

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const content = review.content || "";

  const shortText =
    content.length > 320
      ? content.slice(0, 320) + "..."
      : content;

  return (
    <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-6">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-bold text-white">
            {review.author}
          </h3>

          <p className="text-sm text-slate-400">
            {new Date(
              review.created_at
            ).toLocaleDateString()}
          </p>
        </div>

        {review.author_details?.rating && (
          <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-yellow-300">
            ⭐ {review.author_details.rating}/10
          </span>
        )}

      </div>

      <p className="mt-5 whitespace-pre-line leading-8 text-slate-300">
        {expanded ? content : shortText}
      </p>

      {content.length > 320 && (
        <button
          onClick={() =>
            setExpanded(!expanded)
          }
          className="mt-5 text-blue-400 hover:text-blue-300"
        >
          {expanded
            ? "Read Less"
            : "Read More"}
        </button>
      )}
    </div>
  );
};

const ReviewSection = ({ reviews = [] }) => {
  if (!reviews.length) {
    return (
      <section className="mt-20">
        <h2 className="mb-8 text-3xl font-bold text-white">
          ⭐ Reviews
        </h2>

        <div className="rounded-3xl border border-blue-500/20 bg-[#08111F] p-8 text-center text-slate-400">
          No Reviews Available
        </div>
      </section>
    );
  }

  return (
    <section className="mt-20">

      <h2 className="mb-8 text-3xl font-bold text-white">
        ⭐ Reviews
      </h2>

      <div className="space-y-6">

        {reviews.slice(0, 5).map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
          />
        ))}

      </div>

    </section>
  );
};

export default ReviewSection;