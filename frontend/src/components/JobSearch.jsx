import { useState } from 'react';
import PropTypes from 'prop-types';

const JobSearch = ({ onSearch }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(description);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter job description"
                required
            />
            <button type="submit">Search</button>
        </form>
    );
};

JobSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default JobSearch;
