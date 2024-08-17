import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Ensure you have your firebaseConfig
import { getDocs, collection } from 'firebase/firestore';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const MentorProfilePage = () => {
  const [mentors, setMentors] = useState([]);
  const [expandedMentorId, setExpandedMentorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      setError('');

      try {
        const mentorCollection = collection(db, 'mentors');
        const mentorSnapshot = await getDocs(mentorCollection);
        const mentorList = mentorSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMentors(mentorList);
      } catch (err) {
        setError('Failed to fetch mentors. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
       Meet Our Mentor
       <p className="mt-2 text-xl font-light  text-secondary  ">
  Engage with our mentors to receive personalized advice and support from industry leaders dedicated to unlocking your full potential.
</p>
        </h1>
 
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mentors.length === 0 ? (
            <p className="text-center text-gray-500">No mentors found</p>
          ) : (
            mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white p-6 mt-12 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={mentor.picture } // Default image if profile_picture is missing
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full object-cover mr-4 border-4 border-indigo-600"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-indigo-600">
                      {mentor.name}
                    </h2>
                    <p className="text-md text-gray-500">{mentor.company}</p>
                    <p className="text-sm text-gray-600">{mentor.tagLine}</p>
                  </div>
                </div>
                {expandedMentorId === mentor.id ? (
                  <div>
                    <p className="text-gray-700 mb-4">{mentor.description}</p>
                    <button
                      className="text-indigo-600 hover:text-indigo-800"
                      onClick={() => setExpandedMentorId(null)}
                    >
                      Show Less
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-indigo-600 hover:text-indigo-800"
                    onClick={() => setExpandedMentorId(mentor.id)}
                  >
                    Read More
                  </button>
                )}
                <div className="mt-4 flex items-center justify-between">
                  {mentor.linkedIn && (
                    <a
                      href={mentor.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 hover:text-indigo-700 flex items-center"
                    >
                      <FaLinkedin className="mr-2" /> LinkedIn
                    </a>
                  )}
                  {mentor.twitter && (
                    <a
                      href={mentor.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 hover:text-indigo-700 flex items-center"
                    >
                      <FaTwitter className="mr-2" /> Twitter
                    </a>
                  )}
                </div>
                {mentor.calendly && (
                  <div className="mt-4">
                    <a
                      href={mentor.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center"
                    >
                      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                        Book a Call
                      </button>
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorProfilePage;
