
import PropTypes from 'prop-types';

const JobList = ({ jobs }) => {
    return (
        <div>
            {jobs.length > 0 ? (
                jobs.map((job, index) => (
                    <div key={index} className="job">
                        <h3>{job.job_title}</h3>
                        <p>{job.company_name}</p>
                        <p>{job.location}</p>
                        <p>{job.salary}</p>
                        <p>{job.summary}</p>
                        <a href={job.url} target="_blank" rel="noopener noreferrer">
                            View Job
                        </a>
                    </div>
                ))
            ) : (
                <p>No jobs found.</p>
            )}
        </div>
    );
};

JobList.propTypes = {
    jobs: PropTypes.arrayOf(
        PropTypes.shape({
            job_title: PropTypes.string.isRequired,
            company_name: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            salary: PropTypes.string,
            summary: PropTypes.string,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default JobList;
