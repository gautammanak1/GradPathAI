import { useState } from 'react';
import JobSearch from '../job/JobSearch';
import JobList from '../job/JobList';
import Job from '../job/Job';
import JobUpdate from '../job/JobUpdate';
import JobAbout from '../job/JobAbout';
import JobHero from '../job/JobHero';
import Feature from '../job/Feature'

const Page = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null); 

    const fetchJobs = async (description) => {
        try {
            console.log('Searching for jobs:', description);
            const response = await fetch('http://localhost:5000/api/jobs/', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ job_description: description })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            console.log('Jobs:', data);
            setJobs(data.jobs); 
            setError(null); 
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setError('Failed to fetch jobs. Please try again later.');
            setJobs([]); 
        }
    };

    return (
        <div>
            <JobHero/>
            <JobAbout/>
            <Job />
            <Feature/>
            <JobSearch onSearch={fetchJobs} />
            <JobList jobs={jobs} />
            <JobUpdate/>
            

            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Page;
