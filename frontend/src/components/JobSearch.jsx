import { useState } from 'react';
import PropTypes from 'prop-types';

const JobSearch = ({ onSearch }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(description);
    };

    return (
        <div className="min-h-screen bg-blue-500 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Your Ultimate Job Search Companion</h1>
            <p className="text-white mb-8">
                Are you looking for the perfect job or the ideal candidate? Find your dream job with thousands of job postings across industries.
            </p>
            <form onSubmit={handleSubmit} className="flex w-3/4 max-w-xl">
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Job Title"
                    className="w-full p-4 rounded-l-md border-none focus:outline-none"
                    required
                />
                <button type="submit" className="p-4 bg-white text-blue-500 font-bold rounded-r-md">
                    Search
                </button>
            </form>
            <p className="text-white mt-4">10,000+ Jobs</p>
            <div className="flex space-x-2 mt-2">
                {/* Icons can be added here */}
            </div>
        </div>
    );
};

JobSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default JobSearch;
