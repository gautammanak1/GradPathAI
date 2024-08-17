const FetchPlatformSection = () => {
    return (
      <div className="bg-[#F9FAFB] flex flex-col items-center justify-center mt-24 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <h1 className="mx-auto text-center text-5xl  text-black leading-tight sm:text-6xl md:text-7xl">
          Ready to get started with <br /> GradPath AI Platform?
        </h1>
  
        <div className="mt-8 flex space-x-4">
          <button className="rounded-full border-2 border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-200">
            Schedule a demo
          </button>
          <button className="rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-700">
            Try GradPath AI
          </button>
        </div>
  
        {/* SVG Images */}
        <div className="relative w-full mt-12 flex justify-center items-center">
          <img
            alt="Left SVG"
            src="/src/assets/left-svg.svg"
            className="w-1/3 sm:w-1/3 lg:w-1/3 absolute left-0 bottom-8 transform -translate-x-1/2"
          />
          <img
            alt="Right SVG"
            src="/src/assets/right-svg.svg"
            className="w-1/3 sm:w-1/3 lg:w-1/3 absolute right-0 bottom-8 transform translate-x-1/2"
          />
        </div>
      </div>
    );
  };
  
  export default FetchPlatformSection;
  