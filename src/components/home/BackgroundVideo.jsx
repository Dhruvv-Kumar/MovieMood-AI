const BackgroundVideo = () => {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover opacity-25"
      >
        <source src="/videos/cinema.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
};

export default BackgroundVideo;