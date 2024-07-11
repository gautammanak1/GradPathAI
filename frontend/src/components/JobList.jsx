import PropTypes from 'prop-types';

const JobList = ({ jobs }) => {
    return (
        <div>
            {jobs.length > 0 ? (
                jobs.map((job, index) => (
                    <div key={index} className="job">
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <p>{job.salary}</p>
                        <p>{job.summary}</p>
                        <p>{job.url}</p>
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
            title: PropTypes.string.isRequired,
            company: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            salary: PropTypes.string,
            summary: PropTypes.string,
        })
    ).isRequired,
};

export default JobList;
