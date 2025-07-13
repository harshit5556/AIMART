import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-center gap-6 text-white">
      <h1 className="text-4xl md:text-6xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg md:text-xl text-gray-300">Oops! The page you're looking for doesn't exist.</p>
      <button
        className="bg-white text-black text-lg px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200"
        onClick={() => navigate('/login')}
      >
        Go to Login
      </button>
    </div>
  );
};

export default Notfound;
