import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';



const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { message: inputMessage };

    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/chat/', userMessage);
      const botMessage = response.data.bot_response;

      setMessages(prevMessages => [...prevMessages, { text: botMessage, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Error: Could not send message', sender: 'bot' }]);
    }
  };

  return (
    <div>
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button" aria-haspopup="dialog" aria-expanded={isOpen} data-state={isOpen ? "open" : "closed"}
        onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[95vw] md:w-[440px] h-[80vh] md:h-[634px] overflow-y-auto shadow-lg">
          {/* Heading */}
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight">Fetch.ai Chatbot</h2>
            <p className="text-sm text-[#6b7280] leading-3">Powered by Fetch.ai</p>
          </div>

          {/* Chat Container */}
          <div className="flex flex-col gap-4 h-[calc(100%-4rem)] overflow-y-auto pr-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 text-sm ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                {message.sender === 'bot' ? (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                        </path>
                      </svg>
                    </div>
                  </div>
                ) : null}
                <p className={`text-gray-700 p-2 rounded-lg ${message.sender === 'bot' ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}>
                  <span className="block font-bold">{message.sender === 'bot' ? 'AI' : 'You'}:</span>
                  <span dangerouslySetInnerHTML={{ __html: message.text }}></span>
                </p>
                {message.sender === 'user' ? (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14.25 16.5l3.75-3.75-3.75-3.75-3.75 3.75zM14.25 16.5L18 13.5l-3.75-3.75zM18 13.5L14.25 16.5zM13.5 14.25L14.25 13.5zM15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0z">
                        </path>
                      </svg>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input box */}
          <div className="flex items-center pt-2 border-t border-gray-200">
            <form className="flex items-center w-full space-x-2" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <input
                className="flex-1 h-10 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] text-[#030712]"
                placeholder="Type your message"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
