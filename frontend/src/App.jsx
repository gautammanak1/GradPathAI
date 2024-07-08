import { useState } from 'react';
import JobSearch from './components/JobSearch';
import JobList from './components/JobList';

const App = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null); // State to hold error messages

    const fetchJobs = async (description) => {
        try {
            const response = await fetch('http://localhost:5000/api/jobs', {  // Ensure this matches your backend port
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            setJobs(data);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setError('Failed to fetch jobs. Please try again later.');
            setJobs([]); // Optionally clear jobs state on error
        }
    };

    return (
        <div>
            <h1>Job Finder</h1>
            {error && <div className="error">{error}</div>}  {/* Display error messages */}
            <JobSearch onSearch={fetchJobs} />
            <JobList jobs={jobs} />
        </div>
    );
};

export default App;
