
import { RiTwitterXLine, RiLinkedinBoxFill } from "react-icons/ri";

const navigation = [
  {
    name: "X",
    href: "",
    icon: (props) => <RiTwitterXLine {...props} className="text-xl cursor-pointer"/>,
  },
  {
    name: "Linkedin",
    href: "",
    icon: (props) => <RiLinkedinBoxFill {...props} className="text-2xl cursor-pointer" />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-50 px-6 lg:px-8">
      <hr className="mt-10 " />
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-tertiary"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} GradPath AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
