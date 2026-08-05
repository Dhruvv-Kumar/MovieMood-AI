const BackgroundEffects = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Top Left Glow */}
      <div
        className="
        absolute
        -left-56
        top-10
        h-[500px]
        w-[500px]
        rounded-full
        bg-yellow-400/10
        blur-[180px]
        "
      />

      {/* Top Right Glow */}
      <div
        className="
        absolute
        -right-52
        top-24
        h-[450px]
        w-[450px]
        rounded-full
        bg-amber-300/10
        blur-[180px]
        "
      />

      {/* Bottom Center Glow */}
      <div
        className="
        absolute
        bottom-[-220px]
        left-1/2
        h-[650px]
        w-[650px]
        -translate-x-1/2
        rounded-full
        bg-yellow-500/10
        blur-[220px]
        "
      />

      {/* Noise Layer */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.04]
        mix-blend-soft-light
        bg-[radial-gradient(circle,white_1px,transparent_1px)]
        bg-[length:24px_24px]
        "
      />
    </div>
  );
};

export default BackgroundEffects;