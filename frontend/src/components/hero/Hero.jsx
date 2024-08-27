

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-50">
      <div aria-hidden="true" className="hidden sm:absolute sm:inset-y-0 sm:block sm:h-full sm:w-full">
        <div className="relative mx-auto h-full max-w-7xl">
          {/* Existing Right Side SVG */}
          <svg
            fill="none"
            width={404}
            height={784}
            viewBox="0 0 404 784"
            className="absolute right-full translate-x-1/4 translate-y-1/4 transform lg:translate-x-1/2"
          >
            <defs>
              <pattern
                x={0}
                y={0}
                id="4522f7d5-8e8c-43ee-89bd-ad34cbfb07fa"
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} fill="currentColor" width={4} height={4} className="text-gray-200" />
              </pattern>
            </defs>
            <rect fill="url(#4522f7d5-8e8c-43ee-89bd-ad34cbfb07fa)" width={404} height={784} />
          </svg>

          {/* Existing Left Side SVG */}
          <svg
            fill="none"
            width={404}
            height={784}
            viewBox="0 0 404 784"
            className="absolute left-full -translate-x-1/4 -translate-y-3/4 transform md:-translate-y-1/2 lg:-translate-x-1/2"
          >
            <defs>
              <pattern
                x={0}
                y={0}
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} fill="currentColor" width={4} height={4} className="text-gray-200" />
              </pattern>
            </defs>
            <rect fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" width={404} height={784} />
          </svg>

          
        </div>
      </div>

      <div className="relative py-5 sm:py-10">
        <main className="mx-auto max-w-7xl px-4 sm:mt-12">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Smart AI Agents Guiding Students from </span>{' '} <br />
              <span className="block text-[#5F38FB]  xl:inline">Academia to Industry with Personalized Career Insights </span>
            </h1>
            <p className="mx-auto mt-2 text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            GradPath AI offers career guidance with resume analysis, job search, AI mentorship, and a job assistant chatbot.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
