
import {
  BriefcaseIcon,
  ClipboardDocumentIcon,
  ChatBubbleLeftIcon,
  AcademicCapIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    icon: BriefcaseIcon,
    title: "Job Finder",
    description:
      "Our Job Finder agent helps you discover relevant job opportunities by analyzing your skills, preferences, and location. It provides personalized job recommendations to streamline your job search.",
  },
  {
    icon: ClipboardDocumentIcon,
    title: "Resume Analyzer",
    description:
      "The Resume Analyzer reviews and optimizes your resume to match industry standards. It identifies key areas of improvement, ensuring that your resume stands out to potential employers.",
  },
  {
    icon: ChatBubbleLeftIcon,
    title: "AI Chat Bot Job Assistant",
    description:
      "This AI-powered chatbot guides you through the job application process, answers your queries, and provides real-time advice. It's like having a personal job assistant available 24/7.",
  },
  {
    icon: AcademicCapIcon,
    title: "Mentor",
    description:
      "The Mentor agent offers guidance and career advice based on your professional goals. It connects you with resources, learning opportunities, and expert insights to help you advance in your career.",
  },
];

const ProductFeatures = () => {
  return (
    <div className="py-16 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary text-3xl lg:text-5xl ">
            Our Product Features
          </h2>
          <p className="mt-4 text-sm text-secondary">
            Explore the innovative tools we offer to enhance your career journey.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg relative"
            >
              <div className="flex items-center justify-center absolute -top-6 left-1/2 transform -translate-x-1/2 bg-hoverBg text-tertiary rounded-lg p-4 shadow-lg">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mt-10">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-secondary text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 p-2 text-sm bg-slate-100 rounded-md">
          Disclaimer :{" "}
          <span className="mt-2 w-full text-secondary">
            Our agents are designed to assist and enhance your job search
            experience. They do not guarantee employment or specific outcomes.
            Users should verify all information and follow best practices in
            their job search.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductFeatures;
