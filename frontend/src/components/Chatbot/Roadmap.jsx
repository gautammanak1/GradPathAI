
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaTools, FaMobileAlt } from 'react-icons/fa';

const roadmapStages = [
  {
    title: '1. HTML Basics',
    description: 'Start with the basics of HTML, learn how to structure web pages.',
    icon: <FaHtml5 size={30} />,
    resources: [
      { name: 'W3Schools - HTML', link: 'https://www.w3schools.com/html/' },
      { name: 'MDN - HTML', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    ],
  },
  {
    title: '2. CSS Basics',
    description: 'Learn CSS to style your web pages and make them visually appealing.',
    icon: <FaCss3Alt size={30} />,
    resources: [
      { name: 'W3Schools - CSS', link: 'https://www.w3schools.com/css/' },
      { name: 'MDN - CSS', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    ],
  },
  {
    title: '3. JavaScript Basics',
    description: 'Understand JavaScript to add interactivity to your web pages.',
    icon: <FaJs size={30} />,
    resources: [
      { name: 'JavaScript.info', link: 'https://javascript.info/' },
      { name: 'MDN - JavaScript', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    ],
  },
  {
    title: '4. Version Control with Git',
    description: 'Learn Git and GitHub to manage your code and collaborate with others.',
    icon: <FaGitAlt size={30} />,
    resources: [
      { name: 'GitHub - Learning Lab', link: 'https://lab.github.com/' },
      { name: 'Git Documentation', link: 'https://git-scm.com/doc' },
    ],
  },
  {
    title: '5. Responsive Design',
    description: 'Make your web pages responsive to work on all devices, including mobile.',
    icon: <FaMobileAlt size={30} />,
    resources: [
      { name: 'W3Schools - Responsive Web Design', link: 'https://www.w3schools.com/html/html_responsive.asp' },
      { name: 'MDN - Responsive Design', link: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design' },
    ],
  },
  {
    title: '6. Advanced JavaScript (ES6+)',
    description: 'Learn advanced JavaScript concepts and modern ES6+ features.',
    icon: <FaJs size={30} />,
    resources: [
      { name: 'ES6+ Cheatsheet', link: 'https://es6.io/' },
      { name: 'JavaScript ES6', link: 'https://www.javascripttutorial.net/es6/' },
    ],
  },
  {
    title: '7. Front-End Frameworks (React)',
    description: 'Learn React to build dynamic and fast web applications.',
    icon: <FaReact size={30} />,
    resources: [
      { name: 'React Official Documentation', link: 'https://reactjs.org/docs/getting-started.html' },
      { name: 'Codecademy - Learn React', link: 'https://www.codecademy.com/learn/react-101' },
    ],
  },
  {
    title: '8. Tooling and Build Tools',
    description: 'Learn about build tools like Webpack, Babel, and package managers like npm/yarn.',
    icon: <FaTools size={30} />,
    resources: [
      { name: 'Webpack Documentation', link: 'https://webpack.js.org/concepts/' },
      { name: 'npm Documentation', link: 'https://docs.npmjs.com/' },
    ],
  },
  {
    title: '9. Deployment and Hosting',
    description: 'Deploy your applications using platforms like Netlify, Vercel, or GitHub Pages.',
    icon: <FaTools size={30} />,
    resources: [
      { name: 'Netlify - Quickstart Guide', link: 'https://docs.netlify.com/get-started/' },
      { name: 'Vercel - Deploying with Vercel', link: 'https://vercel.com/docs' },
    ],
  },
];

const FrontEndRoadmap = () => {
  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
        Front-End Developer Roadmap
      </h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {roadmapStages.map((stage, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4 text-indigo-500">
              {stage.icon}
              <h3 className="ml-4 text-xl font-bold text-gray-900">{stage.title}</h3>
            </div>
            <p className="text-gray-600">{stage.description}</p>
            <ul className="mt-4 space-y-2">
              {stage.resources.map((resource, idx) => (
                <li key={idx}>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrontEndRoadmap;
