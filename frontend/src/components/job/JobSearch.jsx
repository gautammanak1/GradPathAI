import { useState } from 'react';
import PropTypes from 'prop-types';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is included in your project

const JobSearch = ({ onSearch }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(description);
  };

  return (
    <div className="  flex flex-col justify-center items-center text-center text-primary py-10 mt-16">
      <h1 className="text-5xl font-bold mb-4 text-primary">Your Ultimate Job Search Companion with fetch.ai agents</h1>
      <p className="mb-8 text-lg">
       Find your dream job with thousands of job postings across industries.
      </p>
      <form onSubmit={handleSubmit} className="flex w-11/12 max-w-2xl space-x-2 outline-[#5F38FB] ">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Job Title"
          className="w-full p-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        />
        <button type="submit" className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Search
        </button>
      </form>

    </div>
  );
};

JobSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default JobSearch;
