import { motion } from "framer-motion";
import { useState } from "react";
import searchSuggestions from "../../data/searchSuggestions";

const SearchBox = ({
  prompt,
  setPrompt,
  onSearch,
}) => {
  const [listening, setListening] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    await onSearch(prompt);

    setTimeout(() => {
      document
        .getElementById("ai-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 200);
  };

  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice Search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    setListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const transcript =
        event.results[0][0].transcript;

      setPrompt(transcript);

      setListening(false);
      setRecognizing(true);

      setTimeout(async () => {
        await onSearch(transcript);

        setRecognizing(false);

        setTimeout(() => {
          document
            .getElementById("ai-results")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }, 200);
      }, 700);
    };

    recognition.onerror = (event) => {
      setListening(false);
      setRecognizing(false);

      if (event.error === "not-allowed") {
        alert(
          "🎤 Please allow microphone permission."
        );
      } else if (
        event.error === "no-speech"
      ) {
        alert(
          "😅 I couldn't hear anything."
        );
      } else {
        alert("Voice search failed.");
      }
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-4xl px-1 sm:px-0"
    >
      <div
        className={`
        group
        flex
        items-center
        rounded-full
        border
        px-2 py-2 sm:px-3 sm:py-3
        backdrop-blur-3xl
        transition-all
        duration-500

        ${
          listening
            ? "border-red-500 shadow-[0_0_45px_rgba(239,68,68,0.35)]"
            : recognizing
            ? "border-blue-500 shadow-[0_0_45px_rgba(59,130,246,0.35)]"
            : "border-white/10 bg-white/5 hover:border-yellow-400/40 focus-within:border-yellow-400/60"
        }
      `}
      >
        <span className="px-2 text-lg text-zinc-500 sm:px-4 sm:text-xl">
          ⌕
        </span>

        <input
          type="text"
          value={prompt}
        onChange={(e) => {
  const value = e.target.value;

  setPrompt(value);

  if (!value.trim()) {
    setSuggestions([]);
    setShowSuggestions(false);
    return;
  }

  const filtered = searchSuggestions
    .filter((item) =>
      item
        .toLowerCase()
        .includes(value.toLowerCase())
    )
    .slice(0, 6);

  setSuggestions(filtered);
  setShowSuggestions(true);
}}
          placeholder={
            listening
              ? "🎤 Listening..."
              : recognizing
              ? "🧠 Understanding your request..."
              : "Describe your movie mood..."
          }
          className="
          flex-1
          bg-transparent
          px-2
          py-3
          text-base
          text-white
          placeholder:text-zinc-500
          outline-none
          sm:px-2
          sm:py-3
          sm:text-lg
          "
        />

        {/* Voice Button */}

        <button
          type="button"
          disabled={recognizing}
          onClick={startVoiceSearch}
          className={`
          relative
          mr-2
          flex
          h-11
          w-11
          text-xl
          sm:h-14
          sm:w-14
          sm:text-2xl
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300

          ${
            listening
              ? "bg-red-500 text-white"
              : recognizing
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-white hover:bg-blue-600"
          }
          `}
        >
          {recognizing ? "🧠" : "🎤"}
        </button>

        {/* Search */}

        <button
          type="submit"
          className="
          flex
          h-11
          w-11
          text-xl
          sm:h-14
          sm:w-14
          sm:text-2xl
          items-center
          justify-center
          rounded-full
          bg-gradient-to-r
          from-yellow-300
          to-amber-500
          text-black
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-xl
          hover:shadow-yellow-400/40
          "
        >
          →
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
  <div
    className="
      absolute
      left-0
      right-0
      top-[74px] sm:top-[92px]
      z-50
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-[#08111F]/95
      backdrop-blur-xl
    "
  >
    {suggestions.map((item) => (
      <button
        key={item}
        type="button"
        onClick={async () => {
          setPrompt(item);
          setShowSuggestions(false);

          await onSearch(item);

          setTimeout(() => {
            document
              .getElementById("ai-results")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          }, 200);
        }}
        className="
          block
          w-full
          border-b
          border-white/5
          px-4 py-3 sm:px-5 sm:py-4
          text-left
          text-white
          transition
          hover:bg-blue-600
        "
      >
        🔍 {item}
      </button>
    ))}
  </div>
)}

      {/* Voice Wave */}

      {listening && (
        <div className="mt-5 flex justify-center gap-[3px] sm:gap-1">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: [
                  8,
                  24,
                  12,
                  30,
                  10,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: i * 0.08,
              }}
              className="w-1 rounded-full bg-red-400"
            />
          ))}
        </div>
      )}

      {recognizing && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-blue-300 sm:text-base"
        >
          🧠 Understanding your request...
        </motion.p>
      )}
    </motion.form>
  );
};

export default SearchBox;