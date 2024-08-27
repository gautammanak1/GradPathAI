import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faRobot, faLightbulb, faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    icon: faBook,
    title: "Study Material Roadmap",
    description:
      "Access a comprehensive roadmap of study materials, guiding you step-by-step through the learning process to achieve your career goals.",
  },
  {
    icon: faRobot,
    title: "DishaBot Assistant",
    description:
      "Meet DishaBot, your AI-driven study companion, offering personalized learning paths, answering queries, and keeping you on track 24/7.",
  },
  {
    icon: faLightbulb,
    title: "Skill Enhancement & Feedback",
    description:
      "Receive detailed feedback on your skills and actionable suggestions for improvement, tailored to your career objectives.",
  },
  {
    icon: faMapMarkedAlt,
    title: "Global Learning Insights",
    description:
      "Stay informed with the latest global learning trends and insights, helping you make informed decisions on your educational journey.",
  },
];


const ProductFeatures = () => {
  return (
    <div className=" bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary text-3xl lg:text-5xl">
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
                <FontAwesomeIcon icon={feature.icon} className="h-6 w-6" aria-hidden="true" />
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
        
      </div>
    </div>
  );
};

export default ProductFeatures;
