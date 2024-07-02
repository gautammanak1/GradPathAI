
import { useState } from 'react';
/// frontend/src/App.jsx

import JobSearch from './components/JobSearch';
import JobList from './components/JobList';

const App = () => {
    const [jobs, setJobs] = useState([]);
    
    const fetchJobs = async (description) => {
        try {
            const response = await fetch(`http://localhost:5000/api/jobs/${description}`);
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]); // Optionally clear jobs state on error
        }
    };
    
    return (
        <div>
            <h1>Job Finder</h1>
            <JobSearch onSearch={fetchJobs} />
            <JobList jobs={jobs} />
        </div>
    );
};

export default App;
