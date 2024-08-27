import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const convertMarkdownToHTML = (markdown) => {
  return markdown
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/- (.*)/g, '<li>$1</li>')
    .replace(/\n/g, '<br>')
    .replace(/([A-Z][a-z]+):/g, '<strong>$1:</strong>');
};

const JobListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const jobsCollectionRef = collection(db, 'jobs');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobData = await getDocs(jobsCollectionRef);
      setJobs(jobData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchJobs();
  }, [jobsCollectionRef]);

  const toggleSelection = (selectedItems, setSelectedItems, value) => {
    setSelectedItems(
      selectedItems.includes(value)
        ? selectedItems.filter(item => item !== value)
        : [...selectedItems, value]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.jobCategory); // Ensure jobCategory matches your form field
    const matchesEmploymentType = selectedEmploymentTypes.length === 0 || selectedEmploymentTypes.includes(job.employmentType); // Ensure employmentType matches your form field
    const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType); // Ensure jobType matches your form field

    return matchesSearch && matchesCategory && matchesEmploymentType && matchesJobType;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Filter Section */}
        <div className="w-full md:w-1/4 mr-0 md:mr-8 mb-8 md:mb-0">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">Job Category</h3>
            <div className="flex flex-col space-y-2">
              {['Engineering', 'Human Resource', 'Management', 'Business Development', 'Accounts', 'Marketing', 'Others'].map(category => (
                <label key={category} className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleSelection(selectedCategories, setSelectedCategories, category)}
                  />
                  <span className="ml-2">{category}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">Employment Type</h3>
            <div className="flex flex-col space-y-2">
              {['Full Time', 'Part Time', 'Intern'].map(type => (
                <label key={type} className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedEmploymentTypes.includes(type)}
                    onChange={() => toggleSelection(selectedEmploymentTypes, setSelectedEmploymentTypes, type)}
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Job Type</h3>
            <div className="flex flex-col space-y-2">
              {['Remote', 'On Site', 'Hybrid'].map(type => (
                <label key={type} className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedJobTypes.includes(type)}
                    onChange={() => toggleSelection(selectedJobTypes, setSelectedJobTypes, type)}
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Job Listing Section */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              className="border p-3 w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            {currentJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-md w-full">
                <div
                  className="flex flex-col md:flex-row items-center cursor-pointer"
                  onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                >
                  <img
                    className="h-16 w-16 rounded object-cover"
                    src={job.logo}
                    alt={`${job.company} logo`}
                  />
                  <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-center md:text-left w-full">
                    <h3 className="text-lg font-bold text-gray-900">{job.company}</h3>
                    <h4 className="text-xl font-semibold text-gray-900">{job.title}</h4>
                    <div className="flex justify-center md:justify-start items-center text-gray-600 mt-2 space-x-4">
                      <span>📍 {job.location}</span>
                      <span>📂 {job.jobCategory}</span>
                      <span>📅 {job.experience}</span>
                    </div>
                    <div className="flex justify-center md:justify-start space-x-2 mt-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{job.jobType}</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Open</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Job Post: {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Unknown'}</span>
                    </div>
                  </div>
                </div>

                {expandedJobId === job.id && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Job Description</h3>
                    <p
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(job.description) }}
                    ></p>
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                      Apply Now
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <div>
              Rows per page: 
              <select
                className="ml-2 border rounded-md"
                value={jobsPerPage}
                onChange={(e) => {
                  setJobsPerPage(parseInt(e.target.value));
                  setCurrentPage(1); // Reset to first page on items per page change
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              >
                Previous
              </button>
              <span className="mx-4">{currentPage} / {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListPage;
