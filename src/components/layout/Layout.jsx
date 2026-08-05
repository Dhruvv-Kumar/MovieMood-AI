import Navbar from "../common/Navbar";

const Layout = ({ children }) => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      <Navbar />

      <div className="pt-28">
        {children}
      </div>

    </main>
  );
};

export default Layout;