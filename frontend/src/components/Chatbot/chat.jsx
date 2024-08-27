import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth'; // Import Firebase auth
import 'tailwindcss/tailwind.css';

const EyeWithBlinkAnimation = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="32px"
    height="32px"
    className="mr-2"
  >
    <circle cx="32" cy="32" r="30" fill="#4f46e5" />
    <circle cx="32" cy="32" r="28" fill="#ffffff" />
    <circle cx="32" cy="32" r="14" fill="#4f46e5" />
    <circle cx="32" cy="32" r="6" fill="#ffffff">
      <animate
        attributeName="r"
        values="6;3;6"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userDetails, setUserDetails] = useState({ name: '', profilePicture: '' });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserDetails({
        name: user.displayName || 'User',
        profilePicture: user.photoURL || 'https://via.placeholder.com/150',
      });
    }

    // Start the conversation with a greeting message
    setMessages([{ text: `Hello ${user?.displayName || 'there'}! Welcome to DishaBot. Let's get started!`, sender: 'bot' }]);

    // Event listener for when the user leaves the page
    const handleBeforeUnload = (_event) => {
      alert(`Hi ${user?.displayName || 'User'}, how are you?`);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { user_message: inputMessage };

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, sender: 'user' },
    ]);
    setInputMessage('');

    try {
      await axios.post('http://localhost:5000/api/chat/', userMessage);
    } catch (error) {
      console.error('Error sending message:', error);

      let errorMessage = 'Error: Could not send message';
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || 'Could not send message'}`;
      } else if (error.request) {
        errorMessage = 'Error: No response from server';
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: errorMessage, sender: 'system' },
      ]);
    }
  };

  return (
    <><h2 className="text-4xl font-light text-center text-primary sm:text-5xl  mb-12">
      DishaBot
    </h2><div className="flex flex-col h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex-1 flex items-center justify-center overflow-hidden bg-gray-100">
          <div className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden w-full h-full">
            <div className="flex flex-col h-full">
              <header className="flex-shrink-0 mb-2 p-4 border-b border-gray-200 flex items-center">
                <img
                  src={userDetails.profilePicture}
                  alt="Profile"
                  className="h-10 w-10 rounded-full mr-3" />
                <h2 className="text-xl font-semibold">{userDetails.name}</h2>
              </header>

              <main className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 text-sm ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <p className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                        <span className="block font-bold">{message.sender === '' ? '' : ''}</span>
                        <span dangerouslySetInnerHTML={{ __html: message.text }}></span>
                      </p>
                      <div className="flex-shrink-0">
                        {message.sender === 'user' && userDetails.profilePicture ? (
                          <img
                            src={userDetails.profilePicture}
                            alt="User"
                            className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span class="blink-left-right">👀</span>

                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </main>

              <footer className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Type your message"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') sendMessage();
                    } }
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  <button
                    onClick={sendMessage}
                    className="bg-[#5F38FB] text-white px-4 py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Send
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div></>
  );
};

export default Chat;
