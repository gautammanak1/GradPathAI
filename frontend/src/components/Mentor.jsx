import { useState } from 'react';
import axios from 'axios';

const MentorFinder = () => {
  const [filter, setFilter] = useState('');
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/mentor/', { filter });
      setMentors(response.data.mentors);
    } catch (err) {
      setError('Failed to fetch mentors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Find the Best Mentor for Your Skills</h1>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mb-4"
        placeholder="Enter skills or criteria"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded-md"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Search'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4">
        {mentors.length === 0 ? (
          <p>No mentors found</p>
        ) : (
          mentors.map((mentor, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-md mb-4">
              <h2 className="text-xl font-bold">{mentor.name}</h2>
              <p>{mentor.title}</p>
              <p>{mentor.experience}</p>
              <p>Skills: {mentor.skills}</p>
              <p>{mentor.description}</p>
              {mentor.profile_link && (
                <a href={mentor.profile_link} className="text-blue-500">
                  View Profile
                </a>
              )}
              {mentor.book_call_link && (
                <a href={mentor.book_call_link} className="text-green-500">
                  Book a Call
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorFinder;
