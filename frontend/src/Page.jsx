import { useState } from "react";
import JobSearch from "./components/JobSearch";
import JobList from "./components/JobList";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import ChatInterface from "./components/chatbox";
import Resume from "./components/Resume";
import Mentor from "./components/Mentor";
import MentorProfiles from "./components/MentorProfiles";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Page = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  const fetchJobs = async (description) => {
    try {
      console.log("Searching for jobs:", description);
      const response = await fetch("http://localhost:5000/api/jobs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      console.log("Jobs:", data);
      setJobs(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to fetch jobs. Please try again later.");
      setJobs([]); // Optionally clear jobs state on error
    }
  };

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/" element={<Resume />} />
          <Route path="/about" element={<About />} />
          <Route path="/job" element={<JobSearch onSearch={fetchJobs} />} />
          <Route path="/job" element={<JobList jobs={jobs} />} />
          <Route path="/mentors" element={<MentorProfiles />} />
          <Route path="/mentors" element={<Mentor />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* Display error messages */}
      {error && <div className="error">{error}</div>}{" "}
      
      <ChatInterface />
      
    </div>
  );
};

export default Page;
