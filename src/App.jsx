import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import TrendingPage from "./pages/TrendingPage";
import ActorDetails from "./pages/ActorDetails";
import DirectorDetails from "./pages/DirectorDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Movie Details */}
        <Route
          path="/movie/:mediaType/:id"
          element={<MovieDetails />}
        />

        {/* Trending Movies */}
        <Route
          path="/trending/movies"
          element={<TrendingPage type="movie" />}
        />

        {/* Trending TV Shows */}
        <Route
          path="/trending/tv"
          element={<TrendingPage type="tv" />}
        />

        <Route
        path="/top-rated/movies"
       element={<TrendingPage type="top-movie" />}
      />

        <Route
        path="/top-rated/tv"
        element={<TrendingPage type="top-tv" />}
        />

        <Route
        path="/director/:id"
        element={<DirectorDetails />}
      />

        {/* Actor Details */}
        <Route
          path="/actor/:id"
          element={<ActorDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;