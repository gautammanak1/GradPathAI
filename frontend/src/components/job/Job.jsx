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

const JobListPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showJobList, setShowJobList] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const jobsCollectionRef = collection(db, 'jobs');

  useEffect(() => {
    const fetchJobs = async () => {
      const jobData = await getDocs(jobsCollectionRef);
      setJobs(jobData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchJobs();
  }, [jobsCollectionRef]);

  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    technologies: '',
    jobType: 'Full-Time',
    applyLink: '',
    name: '',
    email: '',
    mobile: '',
    logo: '',
    salaryPackage: 'Negotiable',
    experience: '',
    postedAt: new Date(),
  });

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowJobList(!showJobList);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(jobsCollectionRef, {
      ...newJob,
      technologies: newJob.technologies.split(','),
      postedAt: newJob.postedAt,
    });

    setNewJob({
      title: '',
      company: '',
      location: '',
      description: '',
      technologies: '',
      jobType: 'Full-Time',
      applyLink: '',
      name: '',
      email: '',
      mobile: '',
      logo: '',
      salaryPackage: 'Negotiable',
      experience: '',
      postedAt: new Date(),
    });
    setShowForm(false);
    setShowJobList(true);
  };

  return (
    <><div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="border-b border-gray-200 pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Recent Jobs</h1>
        <p className="mt-4 text-base text-gray-500">
          Checkout out the latest release of Jobs and Interships!
        </p>
      </div>
    </div><div className="min-h-screen bg-[#F9FAFB] ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              className="border p-3 w-full md:w-1/3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={!showJobList} />
            <button
              className=" rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
              onClick={toggleForm}
            >
              {showForm ? 'Close' : 'Post a Job'}
            </button>
          </div>

          {showForm && (
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
              <h2 className="text-xl font-bold mb-6 text-indigo-600">Post a New Job</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Form fields here */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                      type="text"
                      className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      placeholder="Enter job title"
                      name="title"
                      value={newJob.title}
                      onChange={handleInputChange}
                      required />
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
                      required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Logo URL</label>
                    <input
                      type="url"
                      className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      placeholder="Enter company logo URL"
                      name="logo"
                      value={newJob.logo}
                      onChange={handleInputChange} />
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
                      required />
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
                      required />
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
                      required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Job Type</label>
                    <select
                      className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      name="jobType"
                      value={newJob.jobType}
                      onChange={handleInputChange}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Apply Link</label>
                    <input
                      type="url"
                      className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      placeholder="Enter apply link"
                      name="applyLink"
                      value={newJob.applyLink}
                      onChange={handleInputChange}
                      required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input
                      type="text"
                      className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      placeholder="Enter your name"
                      name="name"
                      value={newJob.name}
                      onChange={handleInputChange}
                      required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Your Email</label>
                    <input
                      type="email"
                      className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      placeholder="Enter your email"
                      name="email"
                      value={newJob.email}
                      onChange={handleInputChange}
                      required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Your Mobile Number</label>
                    <input
                      type="tel"
                      className="mt-1 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      placeholder="Enter your mobile number"
                      name="mobile"
                      value={newJob.mobile}
                      onChange={handleInputChange}
                      required />
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
                      required />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="mt-4 w-full inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          )}

          {showJobList && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {jobs.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase())).map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <img className="h-16 w-16 rounded-full object-cover" src={job.logo} alt={`${job.company} logo`} />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500"> <span className="font-bold">Location: </span> {job.location}</p>
                  <p className="mt-2 text-sm text-gray-500"><span className="font-bold">Experience: </span>{job.experience}</p>
                  <p className="mt-2 text-sm text-gray-500"><span className="font-bold">Salary: </span> {job.salaryPackage}</p>
                  <p className="mt-2 text-sm text-gray-500">
                  <span className="font-bold">Experience: </span> {job.postedAt ? job.postedAt.toDate().toLocaleDateString() : 'Unknown'}
                  </p>

                  {expandedJobId === job.id ? (
                    <div>
                      <p className="mt-4 text-sm text-gray-700">{job.description}</p>
                      <button
                        onClick={() => setExpandedJobId(null)}
                        className="mt-4 text-indigo-600 hover:text-indigo-900"
                      >
                        Show Less
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="mt-4 text-sm text-gray-700">
                        {job.description.split(' ').slice(0, 30).join(' ')}...
                      </p>
                      <button
                        onClick={() => setExpandedJobId(job.id)}
                        className="mt-4 text-indigo-600 hover:text-indigo-900"
                      >
                        Read More
                      </button>
                    </div>
                  )}

                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Apply
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div></>
  );
};

export default JobListPage;
