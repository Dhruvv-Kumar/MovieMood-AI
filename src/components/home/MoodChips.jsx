const moods = [
  {
    label: "😊 Happy",
    prompt: "Recommend a feel good happy movie.",
  },
  {
    label: "😢 Sad",
    prompt: "Recommend an emotional movie that might make me cry.",
  },
  {
    label: "😂 Comedy",
    prompt: "Recommend a hilarious comedy movie.",
  },
  {
    label: "🔥 Action",
    prompt: "Recommend an exciting action movie.",
  },
  {
    label: "👻 Horror",
    prompt: "Recommend a scary horror movie.",
  },
  {
    label: "❤️ Romance",
    prompt: "Recommend a beautiful romantic movie.",
  },
  {
    label: "🚀 Sci-Fi",
    prompt: "Recommend a mind-blowing science fiction movie.",
  },
  {
    label: "🍿 Weekend",
    prompt: "Recommend an entertaining weekend movie.",
  },
];

const MoodChips = ({
  setPrompt,
}) => {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {moods.map((mood) => (
        <button
          key={mood.label}
          onClick={() => setPrompt(mood.prompt)}
          className="rounded-full border border-zinc-700 px-4 py-2 text-sm transition hover:border-red-500 hover:text-red-500"
        >
          {mood.label}
        </button>
      ))}
    </div>
  );
};

export default MoodChips;