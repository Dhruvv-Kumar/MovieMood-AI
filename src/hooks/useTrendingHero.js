import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";
import { IMAGE_BASE_URL } from "../api/tmdb";

export default function useTrendingHero() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await movieService.getTrendingAll();

        const posters = data
          .filter((item) => item.poster_path)
          .sort(() => Math.random() - 0.5) // shuffle
          .map((item) => ({
            title: item.title || item.name,
            image: `${IMAGE_BASE_URL}${item.poster_path}`,
          }));

        setImages(posters);
      } catch (err) {
        console.log(err);
      }
    }

    load();
  }, []);

  return images;
}