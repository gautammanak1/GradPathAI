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
    setResumeUrl(''); // Clear the input field immediately after submission
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
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-5 text-center text-gray-800">Resume Analyzer</h1>

      {/* Resume Analysis Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Analyze Your Resume</h2>
        <form onSubmit={handleResumeSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="Enter resume URL"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-hoverBg text-tertiary rounded-lg p-4 shadow-lg"
          >
            Analyze
          </button>
        </form>

        {/* Display Loading Indicator */}
        {loading && <p className="mt-4 text-blue-600">Analyzing resume...</p>}

        {/* Display Analysis Results */}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {resumeAnalysis.summary && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Resume Summary:</h3>
            <p className="text-gray-700">{resumeAnalysis.summary}</p>

            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">Skills:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {resumeAnalysis.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">Recommended Jobs:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {resumeAnalysis.recommended_jobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">ATS Score:</h3>
            <p className="text-gray-700">{resumeAnalysis.ats_score}</p>

            {/* Clear Button */}
            <button
              onClick={handleClear}
              className="bg-red-500 text-white py-2 mt-4 rounded-md w-full hover:bg-red-600 transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;
