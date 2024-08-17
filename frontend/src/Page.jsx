import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import HomePage from './components/Pages/HomePage'; 
import Footer from './components/Footer';
import AiBot from './components/Pages/AiBot';
import Resume from './components/Resume';

import NavBar from "./components/navbar/NavBar";

import Jobpage from "./components/Pages/JobPage";
import MentorPage from './components/Pages/MentorPage';

const Page = () => {
    return (
        <div className="bg-[#F9FAFB]">
          
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/chatbot" element={<AiBot />} />
                    <Route path="/job" element={<Jobpage />} />
                    <Route 
                        path="/mentors" 
                        element={
                            <>
                                <MentorPage/>
                                
                            </>
                        } 
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Page;
