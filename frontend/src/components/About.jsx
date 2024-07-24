export default function About() {
    return (
      <div className="bg-white py-10 sm:py-15 ">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 py-16 ring-1 ring-white/10 sm:rounded-3xl  lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 ">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg">
                <h2 className="text-primary text-3xl lg:text-4xl">
                 About the Job Hunting
                </h2>
                <p className="mt-4 text-lg text-secondary sm:max-w-md lg:max-w-none">
                Embark on your job hunting journey with the power of Fetch.AI agents by your side. 
                No longer will you have to navigate the intricate job market alone. With Fetch.AI agents, you gain access to a network of intelligent,
                 autonomous agents that streamline your job search, match your skills with the best opportunities, and negotiate terms on your behalf. 
                 <br /> 
                 <br />  These agents work tirelessly, leveraging advanced AI technology to ensure you find the perfect job faster and more efficiently.
                  Connected way to advance your career with Fetch.AI agents. </p>
                
              </div>
              <img
                alt=""
                src="https://fetch.ai/docs/_next/static/media/decentralised_network.bfbc658d.svg"
                className="w-full max-w-[37rem] rounded-2xl bg-gray-50 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }