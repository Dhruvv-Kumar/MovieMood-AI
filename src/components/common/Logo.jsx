import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="select-none">
      <h1 className="text-3xl font-black tracking-tight">
        <span className="text-white">Suggestion</span>{" "}
        <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          Cinema
        </span>
        <span className="ml-1 text-sm font-semibold text-zinc-400">
          AI
        </span>
      </h1>
    </Link>
  );
};

export default Logo;