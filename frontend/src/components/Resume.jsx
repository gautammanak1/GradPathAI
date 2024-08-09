import  { useState } from 'react';
import axios from 'axios';

function App() {
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeAnalysis, setResumeAnalysis] = useState({ summary: '', skills: [], recommended_jobs: [] });
  const [error, setError] = useState('');

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/resume/', { resume_url: resumeUrl });
      setResumeAnalysis(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error occurred while analyzing the resume');
      setResumeAnalysis({ summary: '', skills: [], recommended_jobs: [] });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resume Analyzer</h1>

      {/* Resume Analysis Form */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Analyze Resume</h2>
        <form onSubmit={handleResumeSubmit} className="space-y-4">
          <input
            type="text"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="Enter resume URL"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Analyze</button>
        </form>

        {/* Display Analysis Results */}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {resumeAnalysis.summary && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Resume Summary:</h3>
            <p>{resumeAnalysis.summary}</p>
            <h3 className="text-lg font-semibold mt-4">Skills:</h3>
            <ul>
              {resumeAnalysis.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4">Recommended Jobs:</h3>
            <ul>
              {resumeAnalysis.recommended_jobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
