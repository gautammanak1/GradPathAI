export default function About() {
  return (
      <div className="bg-[#F9FAFB] py-10 sm:py-15">
          <div className="relative isolate">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto flex flex-col-reverse gap-16 bg-white/5 py-16 ring-1 ring-white/10 sm:rounded-3xl lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20">
                      <div className="lg:w-full lg:max-w-lg lg:order-2">
                          <h2 className="text-primary text-3xl lg:text-4xl">
                              About the GradPath AI
                          </h2>
                          <p className="mt-4 text-lg text-secondary sm:max-w-md lg:max-w-none">
                              GradPath AI is designed to bridge the gap between college life and the professional world. Using Fetch.ai technology, our platform provides students with AI-driven tools, including a smart Job Assistant chatbot that delivers personalized job recommendations and career advice. <br />
                              In addition, it offers tailored support in crafting standout resumes, finding job opportunities, and connecting with mentors.
                              <br />GradPath AI equips students with the resources they need to thrive in their chosen careers, ensuring they’re prepared to navigate the challenges of the modern workforce.
                          </p>
                      </div>
                      <div className="relative lg:w-1/2 lg:order-1">
                          <img
                              alt=""
                              src="/about.svg"
                              className="w-full max-w-[37rem] rounded-2xl object-cover"
                          />
                          <div
                              aria-hidden="true"
                              className="absolute inset-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                          >
                              <div
                                  style={{
                                      clipPath:
                                          'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                                  }}
                                  className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80cafe] to-[#4f46e5] opacity-25"
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}
