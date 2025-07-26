import React, { useContext, useState } from 'react';
import ai from '../assets/ai2.png';
import { userDatacontext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopDataContext } from '../context/ShopContext';

const AI = () => {
  const { showsearch, setshowsearch } = useContext(ShopDataContext);
  const navigate = useNavigate();
  const [activeai, setActiveai] = useState(false);
  const { userData } = useContext(userDatacontext);

  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    const voices = window.speechSynthesis.getVoices();

    const femaleVoice = voices.find(
      voice =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("woman") ||
        voice.name.toLowerCase().includes("girl") ||
        voice.name.toLowerCase().includes("zira") ||
        voice.name.toLowerCase().includes("susan") ||
        voice.name.toLowerCase().includes("karen")
    );

    utterance.voice = femaleVoice || voices[0];
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
      console.log("Transcript:", transcript);

      if (!userData) {
        speak("Please login first");
        toast.error("Please login first to use AI assistant");
        return;
      }

      const match = (keywords) => keywords.some(word => transcript.includes(word));

      if (match(["open search", "show search", "search open"]) && !showsearch) {
        speak("Opening search");
        setshowsearch(true);
        navigate("/collection");
      } else if (match(["collection", "collections", "product", "products"])) {
        speak("Opening collection page");
        navigate("/collection");
      } else if (match(["close search", "hide search"]) && showsearch) {
        speak("Closing search");
        setshowsearch(false);
      } else if (match(["about", "about page"])) {
        speak("Opening about page");
        navigate("/about");
        setshowsearch(false);
      } else if (match(["home", "homepage"])) {
        speak("Opening home page");
        navigate("/");
      } else if (match(["cart", "kaat", "caat"])) {
        speak("Opening cart page");
        navigate("/cart");
        setshowsearch(false);
      } else if (match(["contact", "contact page"])) {
        speak("Opening contact page");
        navigate("/contact");
        setshowsearch(false);
      } else if (match(["order", "orders", "my order", "my orders"])) {
        speak("Opening your orders page");
        navigate("/order");
      }

      // Men
      if (transcript.includes("men")|| transcript.includes("ladka")) {
        if (transcript.includes("pant") || transcript.includes("pants")) {
          speak("Opening men's pants");
          navigate("/ProductDetails/68735cc27906fcced0312735");
        }
        if (transcript.includes("shirt") || transcript.includes("shirts")) {
          speak("Opening men's shirt");
          navigate("/ProductDetails/6873434b7906fcced0312700");
        }
        if (transcript.includes("jacket") || transcript.includes("jackets")) {
          speak("Opening men's jacket");
          navigate("/ProductDetails/687361747906fcced0312744");
        }
        if (transcript.includes("t-shirt") || transcript.includes("tshirts")) {
          speak("Opening men's t-shirt");
          navigate("/ProductDetails/68735b2e7906fcced031271d");
        }
        if (transcript.includes("anime")) {
          speak("Opening men's anime t-shirt");
          navigate("/ProductDetails/687349597906fcced0312716");
        }
        setshowsearch(false);
        return;
      }

      // Women
      if (transcript.includes("ladki") || transcript.includes("women") || transcript.includes("womens")) {
        if (transcript.includes("pant") || transcript.includes("pants")) {
          speak("Opening women's pants");
          navigate("/ProductDetails/68736e277906fcced031276b");
        }
        if (transcript.includes("shirt") || transcript.includes("shirts")) {
          speak("Opening women's shirt");
          navigate("/ProductDetails/68736bc77906fcced0312766");
        }
        if (transcript.includes("t-shirt") || transcript.includes("tshirts")) {
          speak("Opening women's t-shirt");
          navigate("/ProductDetails/687368367906fcced0312759");
        }
        if (transcript.includes("jacket") || transcript.includes("jackets")) {
          speak("Opening women's jacket");
          navigate("/ProductDetails/687367447906fcced0312756");
        }
        setshowsearch(false);
        return;
      }

      // Kids
      if (transcript.includes("kid") || transcript.includes("kids")|| transcript.includes("bacha")) {
        if (transcript.includes("pant") || transcript.includes("pants")) {
          speak("Opening kids' pants");
          navigate("/ProductDetails/6873773e7906fcced0312776");
        }
        if (transcript.includes("t-shirt") || transcript.includes("tshirts")) {
          speak("Opening kids' t-shirt");
          navigate("/ProductDetails/68737b637906fcced0312788");
        }
        if (transcript.includes("jacket") || transcript.includes("jackets")) {
          speak("Opening kids' jacket");
          navigate("/ProductDetails/687379287906fcced031277e");
        }
        setshowsearch(false);
        return;
      }

      toast.error("Sorry, I didn't get that. Try again.");
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
