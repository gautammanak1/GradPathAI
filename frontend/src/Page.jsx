import { useState } from 'react';
import JobSearch from './components/JobSearch';
import JobList from './components/JobList';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import ChatInterface from './components/chatbox';
import Resume from './components/Resume';
import Mentor from './components/Mentor'
import MentorProfiles from './components/MentorProfiles'
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
                body: JSON.stringify({ description })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            console.log('Jobs:', data);
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
            <Hero/>
            <About/>
            {error && <div className="error">{error}</div>}  {/* Display error messages */}
            <JobSearch onSearch={fetchJobs} />
            <JobList jobs={jobs} />
            <ChatInterface/>
            {/* <Mentor/> */}
            <MentorProfiles/>
            <Mentor/>
            <Resume/>
            <Footer/>
            
            
        </div>
    );
};

export default Page;
