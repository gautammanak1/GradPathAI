import { useState,  useRef } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const DishaBotLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="32px"
    height="32px"
    className="mr-2"
  >
    <circle cx="32" cy="32" r="30" fill="#4f46e5" />
    <circle cx="32" cy="32" r="28" fill="#ffffff" />
    <path
      d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22a10 10 0 110-20 10 10 0 010 20z"
      fill="#4f46e5"
    />
    <circle cx="28" cy="28" r="2" fill="#4f46e5" />
    <circle cx="36" cy="28" r="2" fill="#4f46e5" />
    <path
      d="M26 34c.912-2 4.088-2 5 0h2c.912-2 4.088-2 5 0"
      stroke="#4f46e5"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(true); // Default to full screen
  const messagesEndRef = useRef(null);

 

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
    <div className={`flex flex-col ${isFullScreen ? 'h-screen' : 'h-auto min-h-screen'} bg-gray-100`}>
      {/* Navigation Bar */}
      <nav className="flex-shrink-0 bg-white border-b border-gray-200 shadow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center text-xl font-semibold">
              <DishaBotLogo />
              DishaBot
            </div>
            <div>
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Chatbox Component */}
      <div className={`flex-1 flex items-center justify-center ${isFullScreen ? 'p-0' : 'p-6'} overflow-hidden`}>
        <div className={`bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden ${isFullScreen ? 'w-full h-full' : 'w-[95vw] md:w-[440px] h-[80vh] md:h-[634px]'}`}>
          <div className="flex flex-col h-full">
            <header className="flex-shrink-0 mb-2 p-4 border-b border-gray-200">
              <div className="flex flex-col space-y-1.5">
                <h2 className="font-semibold text-lg tracking-tight">DishaBot</h2>
                <p className="text-sm text-gray-500 leading-3">Powered by Fetch.ai</p>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 text-sm ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <p className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      <span className="block font-bold">{message.sender === 'user' ? 'You:' : 'Bot:'}</span>
                      <span dangerouslySetInnerHTML={{ __html: message.text }}></span>
                    </p>
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-300'} flex items-center justify-center`}>
                        <svg stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M14.25 16.5l3.75-3.75-3.75-3.75-3.75 3.75zM14.25 16.5L18 13.5l-3.75-3.75zM18 13.5L14.25 16.5zM13.5 14.25L14.25 13.5zM15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0z">
                          </path>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </main>

            <footer className="flex-shrink-0 pt-2 p-4 border-t border-gray-200">
              <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                <input
                  type="text"
                  className="flex-1 rounded-lg border border-gray-300 p-2"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="rounded-md bg-[#5F38FB] px-6 font-medium tracking-wide text-white shadow-md transition md:mr-4 md:mb-0 md:w-auto hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-4 py-2 rounded-lg"
                >
                  Send
                </button>
              </form>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
