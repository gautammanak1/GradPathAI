// src/App.js
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import MentorProfiles from './components/MentorProfiles';

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className="App">
      <MentorProfiles />
    </div>
  );
}

export default App;
