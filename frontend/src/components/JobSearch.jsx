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

            <div className="bg-gradient-to-b from-blue-500 to-blue-700 min-h-32 flex flex-col justify-center items-center text-center text-white py-10">
                <h1 className="text-5xl font-bold mb-4 animate-bounce">Your Ultimate Job Search Companion</h1>
                <p className="mb-8 text-lg">
                    Are you looking for the perfect job or the ideal candidate? Find your dream job with thousands of job postings across industries.
                </p>
                <form onSubmit={handleSubmit} className="flex w-11/12 max-w-2xl space-x-2">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Job Title"
                        className="w-full p-4 rounded-md border-none focus:outline-none text-black"
                        required
                    />
                    <button type="submit" className="p-4 bg-black text-blue-500 font-bold rounded-md">
                        Search
                    </button>
                </form>
                <p className="mt-4 text-xl">10,000+ Jobs</p>
                <div className="flex space-x-2 mt-2 animate-pulse">
                    <img src="https://fetch.ai/Images/logo/fetch-logo.svg" alt="Fetch.ai Logo" className="h-12" />
                </div>
            </div>
        );
    };

JobSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default JobSearch;
