import PropTypes from 'prop-types';

const HeroSection = ({ onBecomeMentorClick }) => {
  return (
    <section className="bg-[#F9FAFB] ">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold text-primary tracking-tight leading-none  ">
          Unlock Career Insights with Top Mentors
          </h1>
          <p className="max-w-xl mb-6 text-sm text-secondary lg:mb-8 ">
          Connect with experienced professionals on our Mentor Page for valuable career advice and guidance. Browse profiles, book sessions, and advance your career with expert support. 
          </p>
          <div className="flex gap-3">
            <button 
              className="inline-flex items-center justify-center rounded-md bg-[#5F38FB] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={onBecomeMentorClick}
            >
             Become A  Mentor
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/mentor.svg" alt="mockup" />
          
        </div>
        
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  onBecomeMentorClick: PropTypes.func.isRequired,
};

export default HeroSection;
