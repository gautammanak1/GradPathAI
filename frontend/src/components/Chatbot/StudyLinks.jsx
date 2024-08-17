
import { FaCode, FaDatabase, FaRobot, FaCloud, FaPaintBrush, FaCogs, FaNetworkWired, FaLock } from 'react-icons/fa';

const topics = [
  {
    title: 'Front-End Development',
    description: 'Learn HTML, CSS, JavaScript, and modern frameworks like React and Angular.',
    icon: <FaCode size={40} />,
    link: 'https://frontendmasters.com/',
  },
  {
    title: 'Back-End Development',
    description: 'Master server-side technologies like Node.js, Express, and databases.',
    icon: <FaDatabase size={40} />,
    link: 'https://www.theodinproject.com/paths/full-stack-javascript',
  },
  {
    title: 'AI/ML',
    description: 'Dive into machine learning and AI with Python, TensorFlow, and more.',
    icon: <FaRobot size={40} />,
    link: 'https://www.coursera.org/courses?query=machine%20learning',
  },
  {
    title: 'DevOps',
    description: 'Learn about CI/CD pipelines, Docker, Kubernetes, and cloud infrastructure.',
    icon: <FaCloud size={40} />,
    link: 'https://www.udemy.com/course/learn-devops/',
  },
  {
    title: 'UI/UX Design',
    description: 'Explore design principles, tools like Figma, and create stunning user interfaces.',
    icon: <FaPaintBrush size={40} />,
    link: 'https://www.interaction-design.org/',
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Strengthen your problem-solving skills with DSA, essential for technical interviews.',
    icon: <FaCogs size={40} />,
    link: 'https://www.geeksforgeeks.org/data-structures/',
  },
  {
    title: 'Networking',
    description: 'Understand computer networks, protocols, and how data travels across the internet.',
    icon: <FaNetworkWired size={40} />,
    link: 'https://www.coursera.org/courses?query=networking',
  },
  {
    title: 'Cybersecurity',
    description: 'Learn to protect systems and data from cyber threats with hands-on security training.',
    icon: <FaLock size={40} />,
    link: 'https://www.cybrary.it/',
  },
  {
    title: 'System Design',
    description: 'Learn how to design scalable and efficient systems, crucial for advanced developers.',
    icon: <FaCogs size={40} />,
    link: 'https://www.educative.io/courses/grokking-the-system-design-interview',
  },
];

const StudyLinks = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
        Study Resources
      </h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
          >
            <div className="mb-4 text-indigo-500">{topic.icon}</div>
            <h3 className="text-xl font-bold text-gray-900">{topic.title}</h3>
            <p className="mt-2 text-gray-600">{topic.description}</p>
            <a
              href={topic.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyLinks;
