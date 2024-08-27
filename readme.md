# 🚀 GradPath AI: Your Smart Career Guide

**GradPath AI** is an AI-powered platform designed to help students and recent graduates transition from academia to industry. It offers personalized career guidance, resume analysis, job search assistance, mentorship connections, and more, all powered by Fetch.ai technology.

## 🌟 Features

### 🔍 Job Finder
Discover job opportunities that match your skills, preferences, and location. Our Job Finder provides personalized job recommendations to streamline your search.

### 📝 Resume Analyzer
Optimize your resume with our Resume Analyzer. It reviews your resume, suggests improvements, and ensures it meets industry standards.

### 🤖 AI Chat Bot Job Assistant (DishaBot)
Meet **DishaBot**, your AI-powered career assistant. Available 24/7, DishaBot guides you through the job application process, answers your questions, and provides real-time advice.

### 🧑‍🏫 Mentor
Connect with experienced professionals for career guidance. Our Mentor tool helps you find mentors who align with your professional goals.

### 📋 Post a Job and Show on Website
Employers can post jobs directly on GradPath AI, and these jobs will be displayed on our platform, making it easier for job seekers to discover new opportunities.

## 🔔 Notification Agent
Stay informed with our **Notification Agent**. Get timely updates about new job opportunities, deadlines, and important career-related information.

## 🚀 Upcoming Features

- **Profile Recommendations:** Get suggestions to improve your profile and stand out to employers and mentors.
- **Event Management System:** Participate in hackathons, meetups, and professional events directly through the platform.

## 🛠️ Tech Stack

- **Frontend:** Tailwind CSS, React
- **Backend:** Firebase
- **APIs:** RapidAPI
- **Core Technologies:** Fetch.ai, uAgents, Python

## 🚀 Getting Started

1. **Sign Up:** Create an account on GradPath AI to access all features.
2. **Explore Tools:** Use the Job Finder, Resume Analyzer, and Mentor tools.
3. **Chat with DishaBot:** Start a chat with DishaBot for personalized advice and job recommendations.

## 💬 How to Communicate with DishaBot

1. **Start a Chat:** Click the chat icon on the bottom right of the screen.
2. **Ask Questions:** Type in your queries, like job recommendations or resume tips.
3. **Receive Advice:** Get personalized responses from DishaBot.

## 🌟 My Journey with Fetch.ai

During my three-month internship at Fetch.ai, I developed a Proof of Concept (POC) aimed at helping students transition from academia to industry. This experience led to the creation of GradPath AI, a platform designed to provide meaningful career guidance.

## 💻 Explore the Code

Interested in how GradPath AI works? Check out our [GitHub repository](https://github.com/your-repo-link) to explore the code, contribute, or learn more about the tech stack.



# 🛠️ GradPath AI Installation Guide

This guide will walk you through the steps to set up and run the GradPath AI platform, which includes both the backend and frontend components, as well as the agents.

## 📋 Prerequisites

Make sure you have the following installed on your machine:

- Python 3.x
- Node.js and npm
- pip (Python package installer)

## 📦 Installation Steps

### 1. Clone the Repository

First, clone the GradPath AI repository to your local machine:

\`\`\`bash
git clone https://github.com/gautammanak1/GradPathAI.git
cd GradPathAI
\`\`\`

### 2. Backend Setup

Navigate to the \`backend\` directory and set up the backend server using Flask and Firebase.

#### Install Required Packages

\`\`\`bash
cd backend
pip install -r requirements.txt
pip install uAgents firebase-admin
\`\`\`

#### Configure Firebase

1. Create a Firebase project in the Firebase console.
2. Download the \`serviceAccountKey.json\` file from Firebase.
3. Place the \`serviceAccountKey.json\` file in the \`backend\` directory.
4. Update \`firebaseConfig.js\` with your Firebase project credentials.

#### Start the Backend

Run the backend server:

\`\`\`bash
python app.py
\`\`\`

### 3. Agent Setup

The GradPath AI platform uses uAgents for various functionalities. Navigate to the \`agents\` directory to set up and start the agents.

#### Install uAgents

If not already installed, install uAgents:

\`\`\`bash
pip install uAgents
\`\`\`

#### Start the Agents

For each agent (e.g., \`job_finder_agent.py\`, \`resume_analyzer_agent.py\`), you can start it by running the respective Python file:

\`\`\`bash
python <agentname.py>
\`\`\`

Example:

\`\`\`bash
python job_finder_agent.py
\`\`\`

### 4. Frontend Setup

Now, let's set up the frontend using React and Tailwind CSS.

#### Navigate to the Frontend Directory

\`\`\`bash
cd frontend
\`\`\`

#### Install Dependencies

Install the necessary dependencies using npm:

\`\`\`bash
npm install
\`\`\`

#### Start the Frontend

Run the frontend application:

\`\`\`bash
npm start
\`\`\`

### 5. Connecting Backend and Frontend

The frontend communicates with the backend via APIs. Ensure both the frontend and backend servers are running. The frontend will make requests to the backend as needed.



## 🎉 You're All Set!

Once you’ve completed the above steps, you should have GradPath AI up and running on your local machine. Explore the features like Job Finder, Resume Analyzer, and DishaBot, and start your journey from academia to industry!

If you encounter any issues, please check the repository's issues page or contact us directly.


## 📈 Contributing

We welcome contributions! If you'd like to contribute to GradPath AI, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you'd like to change.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 📧 Contact

For any inquiries or feedback, feel free to reach out to us at [gautammanak1@gmail.com](mailto:gautammanak1@gmail.com).

---

Thank you for checking out **GradPath AI**! We hope our platform helps you on your journey to career success.

