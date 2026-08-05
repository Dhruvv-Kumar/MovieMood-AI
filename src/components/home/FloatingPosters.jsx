import PosterCard from "./PosterCard";
import useTrendingHero from "../../hooks/useTrendingHero";

const layout = [
  // ================= HOLLYWOOD MOVIES =================
  {
    id: 1,
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    rotate: "-12deg",
    top: "5%",
    left: "3%",
    blur: 2,
    opacity: 0.55,
    duration: 18,
    direction: "left",
  },
  {
    id: 2,
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    rotate: "10deg",
    top: "5%",
    right: "10%",
    blur: 2,
    opacity: 0.65,
    duration: 22,
    direction: "right",
  },
  {
    id: 3,
    image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    rotate: "-8deg",
    top: "25%",
    left: "50%",
    blur: 4,
    opacity: 0.5,
    duration: 28,
    direction: "left",
  },
  {
    id: 4,
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rotate: "9deg",
    bottom: "50%",
    right: "55%",
    blur: 4,
    opacity: 0.5,
    duration: 20,
    direction: "right",
  },
  {
    id: 5,
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rotate: "-14deg",
    bottom: "4%",
    left: "2%",
    blur: 3,
    opacity: 0.45,
    duration: 25,
    direction: "left",
  },
  {
    id: 6,
    image: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    rotate: "12deg",
    bottom: "5%",
    right: "2%",
    blur: 2,
    opacity: 0.55,
    duration: 21,
    direction: "right",
  },
  {
    id: 7,
    image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    rotate: "-9deg",
    top: "48%",
    left: "12%",
    blur: 4,
    opacity: 0.35,
    duration: 30,
    direction: "left",
  },

  // ================= WEB SERIES =================

  {
    id: 11,
    image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    rotate: "-11deg",
    top: "2%",
    left: "22%",
    blur: 3,
    opacity: 0.35,
    duration: 34,
    direction: "left",
  },
  {
    id: 12,
    image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    rotate: "10deg",
    top: "4%",
    right: "28%",
    blur: 3,
    opacity: 0.35,
    duration: 33,
    direction: "right",
  },
  {
    id: 13,
    image: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    rotate: "-9deg",
    bottom: "40%",
    left: "1%",
    blur: 4,
    opacity: 0.28,
    duration: 38,
    direction: "left",
  },
  {
    id: 14,
    image: "https://image.tmdb.org/t/p/w500/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
    rotate: "9deg",
    bottom: "40%",
    right: "1%",
    blur: 4,
    opacity: 0.28,
    duration: 36,
    direction: "right",
  },
  {
    id: 15,
    image: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    rotate: "-8deg",
    top: "50%",
    left: "25%",
    blur: 4,
    opacity: 0.25,
    duration: 42,
    direction: "left",
  },
  {
    id: 16,
    image: "https://image.tmdb.org/t/p/w500/pTEFqAjLd5YTsMD6NSUxV6Dq7A6.jpg",
    rotate: "8deg",
    top: "60%",
    right: "21%",
    blur: 4,
    opacity: 0.25,
    duration: 42,
    direction: "right",
  },
  {
    id: 17,
    image: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    rotate: "-7deg",
    bottom: "2%",
    left: "34%",
    blur: 4,
    opacity: 0.25,
    duration: 45,
    direction: "left",
  },
  {
    id: 18,
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    rotate: "7deg",
    bottom: "2%",
    right: "34%",
    blur: 4,
    opacity: 0.25,
    duration: 45,
    direction: "right",
  },
  {
    id: 19,
    image: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
    rotate: "-8deg",
    top: "18%",
    left: "13%",
    blur: 4,
    opacity: 0.28,
    duration: 40,
    direction: "left",
  },
  {
    id: 20,
    image: "https://image.tmdb.org/t/p/w500/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg",
    rotate: "8deg",
    top: "25%",
    right: "18%",
    blur: 4,
    opacity: 0.28,
    duration: 40,
    direction: "right",
  },
];

const FloatingPosters = () => {
  const trending = useTrendingHero();

  return (
    <>
      {layout.map((poster, index) => (
        <PosterCard
          key={poster.id}
          poster={{
            ...poster,
            image: trending[index]?.image || poster.image,
            title: trending[index]?.title || poster.title,
          }}
        />
      ))}
    </>
  );
};

export default FloatingPosters;