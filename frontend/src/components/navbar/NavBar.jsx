import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';

const navigation = [
    { name: 'Resume', href: '/resume' },
    { name: 'Job', href: '/job' },
    { name: 'AiBot', href: '/chatbot' },
    { name: 'Meet Our Mentor', href: '/mentors' },
];

export default function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/');
  };

  return (
    <Disclosure as="nav" className="bg-[#F9FAFB]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img
                  alt="Your Company"
                  src="logo.svg"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-primary hover:text-tertiary hover:bg-hoverBg p-2 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              /* Profile dropdown */
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="User Profile"
                      src={user.photoURL}
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <MenuItem>
                    <span className="block px-4 py-2 text-sm text-primary">
                      {user.displayName}
                    </span>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-primary hover:text-tertiary hover:bg-hoverBg"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              /* Sign in with Google button */
              <button
                onClick={handleGoogleLogin}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className="text-primary hover:text-tertiary hover:bg-hoverBg p-2 rounded-lg"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="px-2 pb-3 pt-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
