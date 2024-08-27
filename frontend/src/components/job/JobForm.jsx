import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobPostForm = () => {
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    technologies: '',
    employmentType: '',
    applyLink: '',
    name: '',
    email: '',
    mobile: '',
    logo: '',
    salaryPackage: 'Negotiable',
    experience: '',
    jobType: 'Full-Time',
    jobCategory: '',
    postedAt: new Date().toISOString(),
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/add_job/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Job posted successfully!');
        // Reset the form fields
        setNewJob({
          title: '',
          company: '',
          location: '',
          description: '',
          technologies: '',
          employmentType: '',
          applyLink: '',
          name: '',
          email: '',
          mobile: '',
          logo: '',
          salaryPackage: 'Negotiable',
          experience: '',
          jobType: 'Full-Time',
          jobCategory: '',
          postedAt: new Date().toISOString(),
        });
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
      <h2 className="text-xl font-bold mb-6 text-indigo-600">Post a New Job</h2>
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="mb-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
      >
        Back
      </button>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Message */}
        {message && <p className="text-center text-red-500">{message}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter job title"
              name="title"
              value={newJob.title}
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
              value={newJob.company}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Logo URL</label>
            <input
              type="url"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter company logo URL"
              name="logo"
              value={newJob.logo}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter job location"
              name="location"
              value={newJob.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter job description"
              name="description"
              value={newJob.description}
              onChange={handleInputChange}
              required
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Technologies</label>
            <input
              type="text"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter technologies used (comma separated)"
              name="technologies"
              value={newJob.technologies}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
            <input
              type="text"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter experience level"
              name="experience"
              value={newJob.experience}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary Package</label>
            <input
              type="text"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter salary package"
              name="salaryPackage"
              value={newJob.salaryPackage}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              name="jobType"
              value={newJob.jobType}
              onChange={handleInputChange}
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Category</label>
            <input
              type="text"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter job category"
              name="jobCategory"
              value={newJob.jobCategory}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Apply Link</label>
            <input
              type="url"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter apply link"
              name="applyLink"
              value={newJob.applyLink}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Name</label>
            <input
              type="text"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter contact name"
              name="name"
              value={newJob.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter contact email"
              name="email"
              value={newJob.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Mobile</label>
            <input
              type="tel"
              className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter contact mobile number"
              name="mobile"
              value={newJob.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 w-full"
        >
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
