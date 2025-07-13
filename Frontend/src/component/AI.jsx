import React, { useContext, useState } from 'react';
import ai from '../assets/ai2.png';
import { userDatacontext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopDataContext } from '../context/ShopContext';

const AI = () => {
  const { showsearch, setshowsearch } = useContext(ShopDataContext);
  const navigate = useNavigate();
  const [activeai, setActiveai] = useState(false);
  const {  userData } = useContext(userDatacontext);

  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    new Audio('/chime.mp3').play(); // Optional chime
    window.speechSynthesis.speak(utterance);
  }

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.log("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.onstart = () => setActiveai(true);
    recognition.onend = () => setActiveai(false);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase();
    

      if (! userData) {
        speak("Please login first");
        toast.error("Please login first to use AI assistant");
        return;
      }

      if (transcript.includes("search") && transcript.includes("open") && !showsearch) {
        speak("Opening search");
        setshowsearch(true);
        navigate("/collection");
      } else if (["collection", "collections", "product", "products"].some(word => transcript.includes(word))) {
        speak("Opening collection page");
        navigate("/collection");
      } else if (transcript.includes("search") && transcript.includes("close") && showsearch) {
        speak("Closing search");
        setshowsearch(false);
      } else if (transcript.includes("about") || transcript.includes("aboutpage")) {
        speak("Opening about page");
        navigate("/about");
        setshowsearch(false);
      } else if (transcript.includes("home") || transcript.includes("homepage")) {
        speak("Opening home page");
        navigate("/");
      } else if (["cart", "kaat", "caat"].some(word => transcript.includes(word))) {
        speak("Opening your cart");
        navigate("/cart");
        setshowsearch(false);
      } else if (transcript.includes("contact")) {
        speak("Opening contact page");
        navigate("/contact");
        setshowsearch(false);
      } else if (["order", "orders", "my order", "myorders"].some(word => transcript.includes(word))) {
        speak("Opening your orders page");
        navigate("/order");
        setshowsearch(false);
      } else {
        toast.error("Sorry, I didn't get that. Try again.");
      }
    };

    recognition.start();
  };

  return (
    <div
      className='fixed lg:bottom-6 md:bottom-10 bottom-[80px] left-4 z-50 group'
      onClick={startRecognition}
    >
      {/* Tooltip */}
      <div className='absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition'>
        Click to speak
      </div>

      {/* Glowing border when active */}
      <div className={`p-2 rounded-full transition-all duration-300 ${activeai ? 'ring-4 ring-blue-400 animate-pulse' : ''}`}>
        <img
          src={ai}
          alt="AI Voice Assistant"
          className={`w-[85px] md:w-[90px] lg:w-[100px] cursor-pointer transition-transform duration-300 hover:scale-110 ${
            activeai ? 'scale-110' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default AI;
