import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth'; // Import Firebase authentication

const questions = [
  "What's your name?",
  "Which company are you working at?",
  "Could you give me a catchy tagline that describes you?",
  "Could you provide a brief description of yourself?",
  "Can you share a link to your profile picture?",
  "Could you also share the link to your LinkedIn profile?",
  "If you have a Twitter profile, please share the link with me!",
  "Do you use Calendly? If yes, can you provide your booking link?",
  "Can I have your email address so I can reach out to you?",
  "Finally, what skills do you have? You can list them with commas!",
];

const ChatBox = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [userDetails, setUserDetails] = useState({ name: '', profilePicture: '' });

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
    setChat([{ bot: `Hello ${user?.displayName || 'there'}! Welcome to MentorBot. Let's get started!` }]);

    // Start asking questions after a delay
    setTimeout(() => sendNextQuestion(), 3000);
  }, []);

  const sendNextQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      setChat((prevChat) => [...prevChat, { bot: questions[currentQuestionIndex] }]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const userAnswer = e.target.elements.answer.value.trim();

    if (!userAnswer) return;

    setChat((prevChat) => [...prevChat, { user: userAnswer }]);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex - 1]: userAnswer,
    }));
    e.target.reset();

    if (currentQuestionIndex < questions.length) {
      setTimeout(() => sendNextQuestion(), 2000);
    } else {
      setLoading(true);
      await submitMentorDetails();
    }
  };

  const submitMentorDetails = async () => {
    const mentorDetails = {
      name: answers[0],
      company: answers[1],
      tagLine: answers[2],
      description: answers[3],
      picture: answers[4],
      linkedIn: answers[5],
      twitter: answers[6],
      calendly: answers[7],
      email: answers[8],
      skills: answers[9],
    };

    try {
      const response = await fetch('http://localhost:5000/api/add_mentor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentorDetails),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Mentor details submitted successfully!');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
          <div className="flex items-center">
            <img
              src={userDetails.profilePicture}
              alt="Profile"
              className="h-10 w-10 rounded-full mr-3"
            />
            <h2 className="text-xl font-semibold">{userDetails.name}</h2>
          </div>
          <h2 className="text-2xl font-bold">MentorBot Chat</h2>
        </header>
        <div className="p-4 h-[70vh] overflow-y-auto bg-gray-100">
          {chat.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.bot ? 'text-left' : 'text-right'}`}>
              <div className={`inline-block p-3 rounded-lg ${msg.bot ? 'bg-blue-200' : 'bg-green-200'}`}>
                {msg.bot || msg.user}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          {loading ? (
            <div className="text-center">Submitting your details...</div>
          ) : (
            <>
              {message ? (
                <div className="text-center text-green-500">{message}</div>
              ) : (
                <form onSubmit={handleSend} className="flex">
                  <input
                    type="text"
                    name="answer"
                    placeholder="Type your answer..."
                    className="w-full p-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-4 rounded-r-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Send
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
