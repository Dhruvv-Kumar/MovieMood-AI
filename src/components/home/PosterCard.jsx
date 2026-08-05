import { motion } from "framer-motion";

const PosterCard = ({ poster }) => {
  return (
    <motion.div
      className="absolute block"
      style={{
        top: poster.top,
        left: poster.left,
        right: poster.right,
        bottom: poster.bottom,
        rotate: poster.rotate,
        opacity: poster.opacity,
      }}
      animate={{
       x:
  poster.direction === "left"
    ? [0, -25, 15, -12, 0]
    : [0, 25, -15, 12, 0],

       y: [0, -16, 12, -10, 0],
        rotate: [
          poster.rotate,
          `calc(${poster.rotate} + 2deg)`,
          poster.rotate,
        ],
      }}
      transition={{
        duration: poster.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.3,
        y: -10,
        rotate: "0deg",
        opacity: 50,
        transition: {
          duration: 0.9,
        },
      }}
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl transition-all duration-500 hover:border-yellow-400/60 hover:shadow-[0_0_35px_rgba(255,215,0,.35)]">
        <img
          src={poster.image}
          alt={poster.title}
          draggable={false}
          className="
h-[100px]
w-[70px]
object-cover
select-none
transition-transform
duration-500
hover:scale-110

sm:h-[130px]
sm:w-[90px]

md:h-[170px]
md:w-[115px]

lg:h-[220px]
lg:w-[150px]
"
        />
      </div>
    </motion.div>
  );
};

export default PosterCard;