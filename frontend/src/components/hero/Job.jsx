import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';

const JobListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);

  const jobsCollectionRef = collection(db, 'jobs');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const jobData = await getDocs(jobsCollectionRef);
      setJobs(jobData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchJobs();
  }, [jobsCollectionRef]);

  // Filtered jobs based on search
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleBrowseAllJobs = () => {
    navigate('/job'); // Adjust the path as per your routing setup
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <input
            type="text"
            className="border p-3 w-full md:w-1/3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleBrowseAllJobs}
            className="rounded-md bg-[#5F38FB] px-3.5 py-2.5 text-sm font-light text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Browse All Jobs
          </button>
        </div>

        <div className="space-y-6">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center"
            >
              <img
                className="h-16 w-16 rounded object-cover"
                src={job.logo}
                alt={`${job.company} logo`}
              />
              <div className="mt-4 md:mt-0 md:ml-6 flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-900">{job.company}</h3>
                <h4 className="text-xl font-semibold text-gray-900">{job.title}</h4>
                <div className="flex flex-col md:flex-row items-center md:items-start text-gray-600 mt-2 space-y-2 md:space-y-0">
                  <span className="mr-0 md:mr-4">📍 {job.location}</span>
                  <span className="mr-0 md:mr-4">📂 {job.jobCategory}</span>
                  <span className="mr-0 md:mr-4">📅 {job.experience}</span>
                </div>
                <div className="flex space-x-2 mt-4 justify-center md:justify-start">
                  <span className=" text-blue-800  rounded-full">{job.jobType}</span>
                  <span className=" text-blue-800  rounded-full">Open</span>
                  <span className=" text-blue-800  rounded-full">
                    Job Post: {job.postedAt ? job.postedAt.toDate().toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
              </div>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 rounded-lg bg-[#5F38FB] px-3.5 py-2.5 text-sm font-light text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Apply
              </a>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <div className="mb-4 md:mb-0">
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
            <span>{`${indexOfFirstJob + 1}-${Math.min(indexOfLastJob, filteredJobs.length)} of ${filteredJobs.length}`}</span>
            <button
              className="ml-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ❮
            </button>
            <button
              className="ml-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListPage;
