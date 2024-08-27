export default function About() {
    return (
        <div className="bg-[#F9FAFB]">
        <div className="mx-auto h-full px-4 py-28 md:py-40 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
    <div className="flex flex-col items-center justify-between lg:flex-row">
      <div className="">
        <div className="lg:max-w-xl lg:pr-5">
          
          <h2 className="mb-6 max-w-lg text-5xl font-bold leading-snug tracking-tight text-gray-900 sm:text-5xl sm:leading-snug">
           One Step at a Time with
            
            <span className="my-1 inline-block px-3 font-bold text-indigo-600">DishaBot</span>

          </h2>
          <p className="text-base text-gray-400">DishaBot is your AI-powered career assistant, offering personalized job recommendations, resume advice, and real-time guidance to help you navigate your job search with confidence.</p>
        </div>
        <div className="mt-10 flex flex-col items-center md:flex-row">
          <a href="/" className="mb-3 inline-flex h-12 w-full items-center justify-center rounded-md bg-[#5F38FB] px-6 font-medium tracking-wide text-white shadow-md transition md:mr-4 md:mb-0 md:w-auto hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lets Chat With DishaBot </a>
          
            

        </div>
      </div>
      <div className="relative lg:w-1/2 lg:order-1">
                            <img
                                alt=""
                                src="/chat.svg"
                                className="w-full max-w-[36rem] rounded-2xl object-cover"
                            />
       </div>
    
        </div>
        </div>
</div>

    );
  }
  