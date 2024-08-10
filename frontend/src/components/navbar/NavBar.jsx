import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
function NavBar() {
    const navigation = [
        { name: 'About', href: '/about' },
        { name: 'Job', href: '/job' },
        { name: 'Fetch.ai', href: '/' },
        { name: 'Meet Our Mentor', href: '/mentors' },  // Added Profile page
      ]
  return (
    <Popover>
    <div className="w-full bg-white px-4 sm:px-6 p-2 fixed z-50 border">
      <nav aria-label="Global" className="relative flex items-center justify-between sm:h-10 md:justify-center">
        <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
          <div className="flex w-full items-center justify-between md:w-auto">
            <a href="#">
              <span className="sr-only ">Your Company</span>
              <img
                alt=""
                src="src/assets/logo.png"
                className="py-4"
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
            <Link key={item.name} to={item.href} className="font-medium text-gray-500 hover:text-tertiary hover:bg-hoverBg p-2 rounded-lg">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
          
            <Link
              to="/"
              className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50"
            >
              Log in
            </Link>
          
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
  )
}

export default NavBar
