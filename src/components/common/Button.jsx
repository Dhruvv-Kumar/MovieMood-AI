const Button = ({ children }) => {
  return (
    <button
      className="
      rounded-xl
      bg-gradient-to-r
      from-blue-600
      via-blue-500
      to-cyan-500
      px-6
      py-3
      font-semibold
      text-white
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-xl
      hover:shadow-blue-500/40
      "
    >
      {children}
    </button>
  );
};

export default Button;