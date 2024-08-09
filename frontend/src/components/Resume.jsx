import { useState } from 'react';
import axios from 'axios';

function App() {
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeAnalysis, setResumeAnalysis] = useState({ summary: '', skills: [], recommended_jobs: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResumeUrl(''); // Clear the search bar immediately after submission
    try {
      const response = await axios.post('http://localhost:5000/api/resume/', { resume_url: resumeUrl });
      setResumeAnalysis(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error occurred while analyzing the resume');
      setResumeAnalysis({ summary: '', skills: [], recommended_jobs: [] });
    }
    setLoading(false);
  };

  const handleClear = () => {
    setResumeAnalysis({ summary: '', skills: [], recommended_jobs: [] });
    setError('');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Resume Analyzer</h1>

      {/* Resume Analysis Form */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Analyze Your Resume</h2>
        <form onSubmit={handleResumeSubmit} className="space-y-4">
          <input
            type="text"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="Enter resume URL"
            className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white p-3 rounded w-full hover:bg-blue-700 transition duration-200">
            Analyze
          </button>
        </form>

        {/* Display Loading Indicator */}
        {loading && <p className="mt-4 text-blue-600">Analyzing resume...</p>}

        {/* Display Analysis Results */}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {resumeAnalysis.summary && (
          <div className="mt-6 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-700">Resume Summary:</h3>
            <p className="text-gray-800">{resumeAnalysis.summary}</p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-gray-700">Skills:</h3>
            <ul className="list-disc list-inside text-gray-800">
              {resumeAnalysis.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-gray-700">Recommended Jobs:</h3>
            <ul className="list-disc list-inside text-gray-800">
              {resumeAnalysis.recommended_jobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>

            {/* Clear Button */}
            <button onClick={handleClear} className="bg-red-500 text-white p-3 rounded w-full mt-4 hover:bg-red-600 transition duration-200">
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
