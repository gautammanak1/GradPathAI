import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const JobList = ({ jobs }) => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        // Send job details to the provided email using the Node.js server
        axios.post('http://localhost:5000/send-email', { email, jobs })
            .then(response => {
                console.log(response.data);
                setEmailSent(true);
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <div className="p-6">
            {jobs.length > 0 ? (
                <>
                    {jobs.map((job, index) => (
                        <div key={index} className="job bg-white flex flex-col justify-center shadow-md rounded-lg p-6 mb-4">
                            <h3 className="text-2xl font-semibold text-gray-800">{job.position}</h3>
                            <p className="text-gray-600">{job.company}</p>
                            <p className="text-gray-600">{job.location}</p>
                            <p className="text-gray-600">{job.work_type}</p>
                            <p className="text-gray-600">{job.date_posted}</p>
                            {job.job_link && (
                                <a
                                    href={job.job_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline mt-2 block"
                                >
                                    View Job Details
                                </a>
                            )}
                            {job.website && (
                                <a
                                    href={job.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline mt-2 block"
                                >
                                    Company Website
                                </a>
                            )}
                        </div>
                    ))}
                    <div className="email-form bg-white shadow-md rounded-lg p-6 mt-4">
                        <h3 className="text-xl font-semibold text-gray-800">Want job details sent to your email?</h3>
                        {emailSent ? (
                            <p className="text-green-500">Email sent successfully!</p>
                        ) : (
                            <form onSubmit={handleEmailSubmit} className="flex flex-col mt-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email"
                                    className="p-2 border border-gray-300 rounded-lg mb-2"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                >
                                    Send Details
                                </button>
                            </form>
                        )}
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500">No jobs found.</p>
            )}
        </div>
    );
};

JobList.propTypes = {
    jobs: PropTypes.arrayOf(
        PropTypes.shape({
            company: PropTypes.string.isRequired,
            website: PropTypes.string,
            position: PropTypes.string.isRequired,
            job_link: PropTypes.string,
            location: PropTypes.string.isRequired,
            work_type: PropTypes.string.isRequired,
            date_posted: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default JobList;
