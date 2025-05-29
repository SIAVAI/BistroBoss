const Cover = ({ bgImg, heading, text }) => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat bg-fixed h-[50vh] md:h-[70vh] flex items-center justify-center "
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Text Content */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="bg-[#15151599] bg-opacity-40 p-12 md:p-12 rounded-md inline-block">
          <h1 className="text-4xl md:text-8xl font-bold uppercase mb-2 text-white font-cinzel">
            {heading}
          </h1>
          <p className="text-sm md:text-lg tracking-wide">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
