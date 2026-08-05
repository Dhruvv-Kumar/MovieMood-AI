import { Link } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = () => {
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Discover",
      path: "/home",
    },
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "Watchlist",
      path: "/watchlist",
    },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <nav
          className="
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-blue-500/20
          bg-[#08111F]/60
          px-7
          py-4
          backdrop-blur-2xl
          shadow-[0_8px_40px_rgba(37,99,235,.12)]
        "
        >
          <Logo />

          <ul className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="
                  text-zinc-300
                  transition
                  duration-300
                  hover:text-blue-400
                  "
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <Button>Login</Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;