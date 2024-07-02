import { useState } from 'react';
import PropTypes from 'prop-types';

const JobSearch = ({ onSearch }) => {
    const [jobDescription, setJobDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(jobDescription);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter job description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

JobSearch.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default JobSearch;
