import  { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, googleProvider, signInWithPopup, storage } from '/src/firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({
    name: '',
    email: '',
    organization: '',
    position: '',
    about: '',
    linkedin_id: '',
    skills: '',
    availability: '',
    profile_picture: '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:8005/fetch_profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({
      ...newProfile,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profilePictureUrl = '';
      if (profilePictureFile) {
        const storageRef = ref(storage, `profile_pictures/${profilePictureFile.name}`);
        await uploadBytes(storageRef, profilePictureFile);
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      await axios.post('http://localhost:8005/save_profile', { ...newProfile, profile_picture: profilePictureUrl });
      setNewProfile({
        name: '',
        email: '',
        organization: '',
        position: '',
        about: '',
        linkedin_id: '',
        skills: '',
        availability: '',
        profile_picture: '',
      });
      setProfilePictureFile(null);
      fetchProfiles();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mentor Profiles</h1>
      {!user ? (
        <div className="flex justify-center">
          <button onClick={handleGoogleSignIn} className="bg-blue-500 text-white p-2 rounded-md">
            Sign in with Google
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
                {profile.profile_picture && (
                  <img src={profile.profile_picture} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                )}
                <h2 className="text-2xl font-semibold mb-2">{profile.name}</h2>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Organization:</strong> {profile.organization}</p>
                <p><strong>Position:</strong> {profile.position}</p>
                <p><strong>About:</strong> {profile.about}</p>
                <p><strong>LinkedIn:</strong> <a href={`https://linkedin.com/in/${profile.linkedin_id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{profile.linkedin_id}</a></p>
                <p><strong>Skills:</strong> {profile.skills.split(',').map(skill => <span key={skill} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{skill}</span>)}</p>
                <p><strong>Availability:</strong> {profile.availability.split(',').map(time => <span key={time} className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">{time}</span>)}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="border p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">Add New Profile</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={newProfile.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={newProfile.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input
                type="text"
                name="organization"
                value={newProfile.organization}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={newProfile.position}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
              <textarea
                name="about"
                value={newProfile.about}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn ID</label>
              <input
                type="text"
                name="linkedin_id"
                value={newProfile.linkedin_id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <input
                type="text"
                name="skills"
                value={newProfile.skills}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Comma separated"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <input
                type="text"
                name="availability"
                value={newProfile.availability}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Comma separated"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Save Profile</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
