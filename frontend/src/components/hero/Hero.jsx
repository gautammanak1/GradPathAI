

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

      <div className="relative py-10 sm:py-15">
        <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Smart AI Agents Guiding Students from </span>{' '} <br />
              <span className="block mt-2 text-[#5F38FB]  xl:inline">Academia to Industry with Personalized Career Insights </span>
            </h1>
            <p className="mx-auto mt-2 text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              GradPath AI is an intelligent platform that empowers college students with personalized career guidance. Leveraging Fetch.ai agents, it offers resume analysis, job search assistance, AI-driven mentorship, and an AI Job Assistant chatbot, helping students transition seamlessly from academia to professional success.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="/"
                  className="flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg"
                >
                  Try GradPath AI for Free
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
