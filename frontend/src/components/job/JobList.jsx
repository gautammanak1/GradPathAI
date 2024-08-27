import PropTypes from 'prop-types';
import { FaBuilding, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';

const JobList = ({ jobs }) => {
    return (
        <div className="p-6">
            {jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {jobs.map((job, index) => (
                        <div key={index} className="border p-4 rounded-md shadow-sm">
                            <h3 className="text-2xl font-semibold text-gray-800">{job.position}</h3>
                            <p className="mt-2 flex items-center text-gray-800">
                                <FaBuilding className="mr-2" />
                                <span className="font-bold">Company:</span> <span className="ml-1 font-light">{job.company}</span>
                            </p>
                            <p className="mt-2 flex items-center text-gray-800">
                                <FaMapMarkerAlt className="mr-2" />
                                <span className="font-bold">Location:</span> <span className="ml-1 font-light">{job.location}</span>
                            </p>
                            <p className="mt-2 flex items-center text-gray-800">
                                <FaBriefcase className="mr-2" />
                                <span className="font-bold">Work Type:</span> <span className="ml-1 font-light">{job.work_type}</span>
                            </p>
                            <p className="mt-2 text-gray-600">
                                <span className="font-bold">Summary:</span> <span className="ml-1 font-light">{job.summary}</span>
                            </p>
                            <p className="mt-2 flex items-center text-gray-600">
                                <FaCalendarAlt className="mr-2" />
                                <span className="font-bold">Date:</span> <span className="ml-1 font-light">{job.date_posted}</span>
                            </p>
                            {job.url && (
                                <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline mt-2 block flex items-center"
                                >
                                    <FaExternalLinkAlt className="mr-2" />
                                    View Job Details
                                </a>
                            )}
                            {job.website && (
                                <a
                                    href={job.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline mt-2 block flex items-center"
                                >
                                    <FaExternalLinkAlt className="mr-2" />
                                    Company Website
                                </a>
                            )}
                        </div>
                    ))}
                </div>
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
            summary: PropTypes.string,
        })
    ).isRequired,
};

export default JobList;
