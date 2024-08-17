// src/components/hero/HomePage.js

import StudyLinks from '../Chatbot/StudyLinks';
import Chatbox from '../Chatbot/chat';
import Roadmap from '../Chatbot/Roadmap';
import About from '../Chatbot/AboutChat';
import Hero from '../Chatbot/HeroChat'
import Feature from '../Chatbot/Feature'

const ChatBox = () => {
    return (
        <div>
            <Hero/>
            <About/>
            <Feature />
            <StudyLinks/>
            <Roadmap/>
<Chatbox />
        </div>
    );
};

export default ChatBox;
