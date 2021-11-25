const Background = () => {
  return (
    <div className="fixed h-screen w-screen">
      <img
        className="object-cover absolute w-full h-full"
        src="/wallpaper.jpg"
        alt="wallpaper"
      />
    </div>
  );
};

export default Background;
