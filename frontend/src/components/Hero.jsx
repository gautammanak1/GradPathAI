import  { useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Page from '../Page'; // Import the Page component

const navigation = [
  { name: 'About', href: '#' },
  { name: 'Job', href: '' },
  { name: 'Fetch.ai', href: '' },
  { name: 'Meet Our Mentor', href: '/MentorProfiles' },  // Added Profile page
];

export default function Hero() {
  const [user, setUser] = useState(null); // State to handle logged-in user

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <div className="relative overflow-hidden bg-gray-50">
      <div aria-hidden="true" className="hidden sm:absolute sm:inset-y-0 sm:block sm:h-full sm:w-full">
        {/* SVG background omitted for brevity */}
      </div>

      <div className="relative pb-16 pt-6 sm:pb-24">
        <Popover>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <nav aria-label="Global" className="relative flex items-center justify-between sm:h-10 md:justify-center">
              <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
                <div className="flex w-full items-center justify-between md:w-auto">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <img
                      alt=""
                      src="src/assets/logo.png"
                      className=""
                      width={150}
                      height={150}
                    />
                  </a>
                  <div className="-mr-2 flex items-center md:hidden">
                    <PopoverButton className="relative inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </PopoverButton>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-tertiary hover:bg-hoverBg p-2 rounded-lg">
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
                {user ? (
                  <Page user={user} /> // Render user info if logged in
                ) : (
                  <a
                    href="/Login"
                    className="block bg-gray-50 px-4 py-2 text-center font-medium text-indigo-600 hover:bg-gray-100"
                  >
                    Log in
                  </a>
                )}
              </div>
            </nav>
          </div>

          <PopoverPanel
            focus
            transition
            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in md:hidden"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  <img
                    alt=""
                    src=""
                    className="h-8 w-auto"
                  />
                </div>
                <div className="-mr-2">
                  <PopoverButton className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </PopoverButton>
                </div>
              </div>
              <div className="px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <a
                href="/Login"
                className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100"
              >
                Log in
              </a>
            </div>
          </PopoverPanel>
        </Popover>

        <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">No More Solo Job Hunting</span>
              <br />
              <span className="block text-indigo-600 font-bold xl:inline">DO IT WITH FETCH.AI AGENTS</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Agents find the job, find ideal candidates, and have your resumes analyzed and tailored in less than 1 minute. No longer will you navigate the job market alone; let Fetch.AI agents streamline your search, connect you with the right opportunities, and optimize your resume to stand out.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="/Chat"
                  className="flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg"
                >
                  Try Jobright for Free
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
