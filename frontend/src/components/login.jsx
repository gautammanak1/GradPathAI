import { useState } from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from './firebaseConfig';
import Page from '../Page';

const App = () => {
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setIsLoggedIn(true);
      setUser(result.user); // Set the user information
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      setIsLoggedIn(true);
      setUser(result.user); // Set the user information
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="">
      {isLoggedIn ? (
        <Page user={user} /> // Pass user information to the Page component
      ) : (
        <>
        <div className="flex w-screen h-screen flex-wrap text-slate-800">
          <div className="flex w-full flex-col md:w-1/2">
            <div className="flex justify-center pt-12 md:justify-start md:pl-12">
            <img alt="Your Company" src="logo.svg" className="h-8 w-auto" />
            </div>
            <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
              <p className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
                Welcome back <br />
                to <span className="text-blue-600">GradPathAI</span>
              </p>
              <p className="mt-6 text-center font-medium md:text-left">Sign in to your account below.</p>
              
              <div className="py-12 text-center">
                <div className="mt-6 flex flex-col items-center justify-center gap-4 w-full sm:max-w-md mx-auto">
                  <button
                    onClick={handleGoogleLogin}
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                      <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                      <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                      <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                    </svg>
                    <span className="text-sm font-semibold leading-6">Sign in with Google</span>
                  </button>

                  <button
                    onClick={handleGithubLogin}
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 .297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.111.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.611-4.042-1.611-.546-1.387-1.332-1.758-1.332-1.758-1.088-.744.083-.729.083-.729 1.204.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.997.108-.775.42-1.305.762-1.605-2.665-.305-5.467-1.335-5.467-5.933 0-1.311.469-2.382 1.236-3.222-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.231.957-.266 1.982-.399 3.003-.404 1.02.005 2.046.138 3.005.404 2.291-1.554 3.297-1.231 3.297-1.231.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.222 0 4.61-2.807 5.625-5.48 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.292 0 .322.218.694.825.577 4.765-1.584 8.198-6.081 8.198-11.385 0-6.627-5.373-12-12-12z" fill="currentColor" />
                    </svg>
                    <span className="text-sm font-semibold leading-6">Sign in with GitHub</span>
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                
              </div>
            </div>
          </div>
          <div className="relative hidden h-screen select-none bg-blue-600 bg-gradient-to-br md:block md:w-1/2">
            <div className="py-16 px-8 text-white xl:w-[40rem]">
              <span className="rounded-full bg-white px-3 py-1 font-medium text-blue-600">GradPath AI</span>
              <h1 className="mt-8 text-4xl font-bold leading-tight md:text-6xl">Empowering Your Career Journey with  <span className="text-yellow-200">FetchAI Agents</span></h1>
              <p className="mt-8 text-lg font-light">
              GradPath AI guides students from college to career with AI-driven job tips, resume help, and mentor connections. Your career success starts here.</p>
              <div className="absolute bottom-0 left-0 right-0 -z-10 -mb-6 overflow-hidden mix-blend-multiply opacity-30">
                <svg className="relative -translate-y-1/2 -translate-x-1/2 rotate-[30deg] sm:rotate-[10deg]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="200" cy="200" r="200" fill="url(#pattern0_radial)" />
                  <defs>
                    <radialGradient id="pattern0_radial" cx="100%" cy="100%" r="100%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#FF0081" />
                      <stop offset="100%" stopColor="#FF8A00" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
