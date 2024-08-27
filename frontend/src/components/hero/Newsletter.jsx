import { useState } from 'react';
import axios from 'axios';

function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/subscribe/', { email });
      setMessage(response.data.message); 
      setEmail(''); 
    } catch (error) {
      setMessage(error.response?.data?.error || 'Subscription failed'); // Show error message
    }
  };

  return (
    <div className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-light tracking-tight text-primary sm:text-4xl">Subscribe to our Newsletter</h2>
          <p className="mt-2 text-lg text-primary">
            Sign up to receive updates and product news directly in your inbox.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-[#5F38FB] px-3.5 py-2.5 text-sm font-light text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Subscribe
            </button>
          </div>
          {message && <p className="mt-4 text-sm leading-6 text-gray-900">{message}</p>}
          <p className="mt-4 text-sm leading-6 text-gray-900">
            We care about your data. Read our{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              privacy&nbsp;policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}

export default NewsletterSubscription;
