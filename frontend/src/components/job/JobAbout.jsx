

const ContentSection = () => {
  return (
    <section className="bg-[#F9FAFB]">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg ">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-primary">
          About
          </h2>
          <p className="mb-4">
          Welcome to the GradPath AI Job Page, where your next career opportunity is just a click away. Our platform connects you with a range of job listings tailored to your skills and aspirations. Whether you&apos;re looking for internships, entry-level positions, or career-changing roles, GradPath AI helps you find the perfect fit.
          </p>
          <p>
          Powered by Fetch.ai technology, we provide personalized job search assistance, ensuring that you receive recommendations that align with your career goals. Explore job listings, get detailed descriptions, and take the next step in your professional journey with confidence.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="/src/assets/job1.jpg"
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
            alt="office content 2"
          />
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
