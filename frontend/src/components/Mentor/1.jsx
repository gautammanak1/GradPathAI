import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1EhmBxv62wFC4mZ53pWwhZ2cmlsxzLb4",
  authDomain: "possible-coast-432420-b1.firebaseapp.com",
  projectId: "possible-coast-432420-b1",
  storageBucket: "possible-coast-432420-b1.appspot.com",
  messagingSenderId: "851592020188",
  appId: "1:851592020188:web:f559f7aefb9992cb6ff419",
  measurementId: "G-DH4FQT1CHS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MentorListPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showMentorList, setShowMentorList] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mentors, setMentors] = useState([]);
  const [expandedMentorId, setExpandedMentorId] = useState(null);

  const mentorsCollectionRef = collection(db, 'mentors');

  useEffect(() => {
    const fetchMentors = async () => {
      const mentorData = await getDocs(mentorsCollectionRef);
      setMentors(mentorData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchMentors();
  }, [mentorsCollectionRef]);

  const [newMentor, setNewMentor] = useState({
    name: '',
    company: '',
    tagLine: '',
    description: '',
    picture: '',
    linkedIn: '',
    twitter: '',
    calendly: '',
    postedAt: new Date(),
  });

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowMentorList(!showMentorList);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMentor({ ...newMentor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(mentorsCollectionRef, {
        ...newMentor,
        postedAt: newMentor.postedAt,
      });

      // Fetch the updated list of mentors
      const updatedMentorData = await getDocs(mentorsCollectionRef);
      setMentors(updatedMentorData.docs.map(doc => ({ ...doc.data(), id: doc.id })));

      // Clear form fields
      setNewMentor({
        name: '',
        company: '',
        tagLine: '',
        description: '',
        picture: '',
        linkedIn: '',
        twitter: '',
        calendly: '',
        postedAt: new Date(),
      });

      setShowForm(false);
      setShowMentorList(true);
    } catch (error) {
      console.error("Error adding mentor: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            className="border p-3 w-full md:w-1/3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Search mentors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={!showMentorList}
          />
          <button
            className="rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
            onClick={toggleForm}
          >
            {showForm ? 'Close' : 'Add Mentor'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
            <h2 className="text-xl font-bold mb-6 text-indigo-600">Add New Mentor</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="Enter mentor's name"
                    name="name"
                    value={newMentor.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="Enter company name"
                    name="company"
                    value={newMentor.company}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tag Line</label>
                  <input
                    type="text"
                    className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="Enter tag line"
                    name="tagLine"
                    value={newMentor.tagLine}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="Enter mentor description"
                    name="description"
                    value={newMentor.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Picture URL</label>
                  <input
                    type="url"
                    className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="Enter picture URL"
                    name="picture"
                    value={newMentor.picture}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                  <input
                    type="url"
                    className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="Enter LinkedIn profile URL"
                    name="linkedIn"
                    value={newMentor.linkedIn}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
                  <input
                    type="url"
                    className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="Enter Twitter profile URL"
                    name="twitter"
                    value={newMentor.twitter}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Calendly URL</label>
                  <input
                    type="url"
                    className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="Enter Calendly link"
                    name="calendly"
                    value={newMentor.calendly}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-4 w-full inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add Mentor
                </button>
              </div>
            </form>
          </div>
        )}

        {showMentorList && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mentors
              .filter(mentor => mentor.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((mentor) => (
                <div key={mentor.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={mentor.picture}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-full object-cover mr-4" />
                    <div>
                      <h2 className="text-xl font-semibold text-indigo-600">{mentor.name}</h2>
                      <p className="text-sm text-gray-500">{mentor.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{mentor.tagLine}</p>
                  {expandedMentorId === mentor.id ? (
                    <div>
                      <p className="mt-4 text-gray-600">{mentor.description}</p>
                      <button
                        className="mt-4 text-indigo-600"
                        onClick={() => setExpandedMentorId(null)}
                      >
                        Show Less
                      </button>
                    </div>
                  ) : (
                    <button
                      className="mt-4 text-indigo-600"
                      onClick={() => setExpandedMentorId(mentor.id)}
                    >
                      Read More
                    </button>
                  )}
                  <div className="mt-4 flex space-x-4">
                    {mentor.linkedIn && (
                      <a
                        href={mentor.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        LinkedIn
                      </a>
                    )}
                    {mentor.twitter && (
                      <a
                        href={mentor.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Twitter
                      </a>
                    )}
                    {mentor.calendly && (
                      <a
                        href={mentor.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Calendly
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorListPage;
