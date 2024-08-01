
import PropTypes from 'prop-types';

const JobList = ({ jobs }) => {
    return (
        <div className="p-6">
            {jobs.length > 0 ? (
                jobs.map((job, index) => (
                    <div key={index} className="job bg-white flex flex-col justify-center   shadow-md rounded-lg p-6 mb-4">
                        <h3 className="text-2xl font-semibold text-gray-800">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-gray-600">{job.location}</p>
                        {job.salary && <p className="text-green-600">{job.salary}</p>}
                        {job.summary && <p className="text-gray-600 mt-2">{job.summary}</p>}
                        {job.url && (
                            <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline mt-2 block"
                            >
                                View Job Details
                            </a>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No jobs found.</p>
            )}
        </div>
    );
};

JobList.propTypes = {
    jobs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            company: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            salary: PropTypes.string,
            summary: PropTypes.string,
            url: PropTypes.string,
        })
    ).isRequired,
};

export default JobList;
