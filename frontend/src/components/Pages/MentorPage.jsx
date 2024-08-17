// src/components/hero/HomePage.js
import { useState } from 'react';
import Hero from '../Mentor/Hero';
import MentorProfile from '../Mentor/MentorProfiles';
import MentorForm from '../Mentor/MentorFormPage';
import About from '../Mentor/About';
import Feature from '../Mentor/Feature'
const MentorPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleBecomeMentorClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      {showForm ? (
        <MentorForm />
      ) : (
        <>
          <Hero onBecomeMentorClick={handleBecomeMentorClick} />
          <About/>
          <Feature/>
          <MentorProfile />

        </>
      )}
    </div>
  );
};

export default MentorPage;
