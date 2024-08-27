import { useState } from 'react';
import JobSearch from '../job/JobSearch';
import JobList from '../job/JobList';
import JobListPage from '../job/JobListPage';

import JobAbout from '../job/JobAbout';
import JobHero from '../job/JobHero';
import Feature from '../job/Feature';
import JobForm from '../job/JobForm'; 

const Page = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

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

  const handlePostClick = () => {
    setShowForm(true); // Show the JobForm when the button is clicked
  };

  return (
    <div>
      {showForm ? (
        <JobForm />
      ) : (
        <>
          <JobHero  /> {/* Pass the handler correctly */}
          <JobAbout onPostJobClick={handlePostClick} />
          <JobListPage />
          <Feature />
          <JobSearch onSearch={fetchJobs} />
          <JobList jobs={jobs} />
        </>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Page;
