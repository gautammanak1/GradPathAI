import PropTypes from 'prop-types';

const JobList = ({ jobs }) => {
    return (
        <div>
            {jobs.map((job, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: job }} />
            ))}
        </div>
    );
};

JobList.propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default JobList;
