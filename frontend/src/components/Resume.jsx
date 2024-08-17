import { useState } from 'react';
import axios from 'axios';

function Resume() {
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeAnalysis, setResumeAnalysis] = useState({
    summary: '',
    skills: [],
    recommended_jobs: [],
    ats_score: 0,
  });
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
      setError('❌ Error occurred while analyzing the resume');
      setResumeAnalysis({ summary: '', skills: [], recommended_jobs: [], ats_score: 0 });
    }
    setLoading(false);
  };

  const handleClear = () => {
    setResumeAnalysis({ summary: '', skills: [], recommended_jobs: [], ats_score: 0 });
    setError('');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-lg text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center animate-bounce">🎯 Resume Analyzer</h1>

      {/* Resume Analysis Form */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🔍 Analyze Your Resume</h2>
        <form onSubmit={handleResumeSubmit} className="space-y-4">
          <input
            type="text"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="Enter resume URL"
            className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button type="submit" className="bg-blue-700 text-white p-3 rounded w-full hover:bg-blue-800 transition duration-200 animate-pulse">
            Analyze 🚀
          </button>
        </form>

        {/* Display Loading Indicator */}
        {loading && <p className="mt-4 text-blue-200 animate-pulse">🔄 Analyzing resume...</p>}

        {/* Display Analysis Results */}
        {error && <p className="mt-4 text-red-200">{error}</p>}
        {resumeAnalysis.summary && (
          <div className="mt-6 bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-200">📄 Resume Summary:</h3>
            <p className="text-gray-300">{resumeAnalysis.summary}</p>

            <h3 className="text-xl font-bold mt-6 mb-3 text-gray-200">🛠 Skills:</h3>
            <ul className="list-disc list-inside text-gray-300">
              {resumeAnalysis.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3 text-gray-200">💼 Recommended Jobs:</h3>
            <ul className="list-disc list-inside text-gray-300">
              {resumeAnalysis.recommended_jobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3 text-gray-200">📊 ATS Score:</h3>
            <p className="text-gray-300">{resumeAnalysis.ats_score}</p>

            {/* Clear Button */}
            <button onClick={handleClear} className="bg-red-600 text-white p-3 rounded w-full mt-4 hover:bg-red-700 transition duration-200">
              Clear 🧹
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;
