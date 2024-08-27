import React from 'react';
import {
  CloudArrowUpIcon,
  DocumentMagnifyingGlassIcon,
  LightBulbIcon,
  BriefcaseIcon,
  CpuChipIcon,
  ClipboardDocumentIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
} from '@heroicons/react/20/solid';

const features = [
  {
    icon: CloudArrowUpIcon,
    title: 'Resume Upload',
    description: 'Easily upload your resume in PDF format for analysis.',
  },
  {
    icon: DocumentMagnifyingGlassIcon,
    title: 'Resume Analysis',
    description: 'Receive in-depth analysis and identify areas to enhance your resume.',
  },
  {
    icon: LightBulbIcon,
    title: 'Resume Suggestions',
    description: 'Get actionable suggestions for improving your resume\'s content and layout.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Job Recommendations',
    description: 'Get job recommendations tailored to your resume and career goals.',
  },
];

const upcomingFeatures = [
  {
    icon: CpuChipIcon,
    title: 'Enhanced NLP Capabilities',
    description: 'Advanced natural language processing for more accurate feedback.',
    releaseDate: 'Q4 2024',
  },
  {
    icon: ClipboardDocumentIcon,
    title: 'Advanced ATS Analysis',
    description: 'Deep insights into ATS compatibility with tailored industry-specific recommendations.',
    releaseDate: 'Q1 2025',
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Interactive Resume Builder',
    description: 'Build and optimize resumes in real-time with interactive tools.',
    releaseDate: 'Q2 2025',
  },
  {
    icon: AcademicCapIcon,
    title: 'Personalized Career Coaching',
    description: 'Access one-on-one career coaching sessions directly through the platform.',
    releaseDate: 'Q3 2025',
  },
];

const AboutPage = () => {
  return (
    <div className="py-16 bg-[#F9FAFB]">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-8">
        <div className="flex justify-center items-center">
          <CloudArrowUpIcon className="w-12 h-12 mr-4  text-tertiary" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">About the Resume Analysis Agent</h1>
        </div>
        <h2 className="text-2xl text-gray-600">Your Personal Resume Improvement Companion</h2>
        <p className="mt-4 text-lg text-gray-700">
          The Resume Analysis Agent harnesses AI and NLP to deliver personalized resume feedback, ensuring you make a strong impression in today’s job market.
        </p>
      </header>

      <section className="py-16">
        <h3 className="text-3xl font-semibold text-center mb-12 ">Current Features</h3>
        <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-1">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg relative"
            >
              <div className="flex items-center justify-center absolute -top-6 left-1/2 transform -translate-x-1/2 bg-hoverBg text-tertiary rounded-lg p-4 shadow-lg">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="pt-10 text-center">
                <h4 className="text-xl font-semibold text-gray-800">{feature.title}</h4>
                <p className="mt-2 text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <h3 className="text-3xl font-semibold text-center mb-12">Upcoming Features</h3>
        <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-1">
          {upcomingFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg relative"
            >
               <div className="flex items-center justify-center absolute -top-6 left-1/2 transform -translate-x-1/2 bg-hoverBg text-tertiary rounded-lg p-4 shadow-lg">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="pt-10 text-center">
                <h4 className="text-xl font-semibold text-gray-800">{feature.title}</h4>
                <p className="mt-2">{feature.description}</p>
                <p className="text-gray-500 mt-1">Expected Release: {feature.releaseDate}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">Get Started Today</h3>
        <p className="text-lg text-gray-700 mb-6">
          Upload your resume and receive actionable feedback to enhance your job search.
        </p>
      </section>
    </div>
    </div>
  );
};

export default AboutPage;
