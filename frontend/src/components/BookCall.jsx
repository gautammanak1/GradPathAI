// src/components/BookCall.js

import PropTypes from 'prop-types';

function BookCall({ mentor }) {
  return (
    <div>
      <h2>Book a Call with {mentor.name}</h2>
      <img src={mentor.picture} alt={`${mentor.name}'s profile`} />
      <p>Email: {mentor.email}</p>
      <p>Organization: {mentor.organization}</p>
      <p>Position: {mentor.position}</p>
      <p>About: {mentor.about}</p>
      <p>LinkedIn: {mentor.linkedin_id}</p>
      <p>Skills: {mentor.skills}</p>
      <p>Availability: {mentor.availability}</p>
      
    </div>
  );
}

BookCall.propTypes = {
  mentor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    organization: PropTypes.string,
    position: PropTypes.string,
    about: PropTypes.string,
    linkedin_id: PropTypes.string,
    skills: PropTypes.string,
    availability: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

export default BookCall;
