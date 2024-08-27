
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
