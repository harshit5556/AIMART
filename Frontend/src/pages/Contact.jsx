import React from 'react';
import Title from '../component/Title';
import contact from "../assets/contact.jpg";
import NewLetterBox from '../component/NewLetterBox';

const Contact = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] gap-16 py-20 px-4'>

      {/* Section Title */}
      <Title text1={'CONTACT'} text2={'US'} />

      {/* Main Content */}
      <div className='w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12'>

        {/* Contact Image */}
        <div className='w-full lg:w-1/2 flex items-center justify-center'>
          <img 
            src={contact} 
            alt="Contact AIMART" 
            className='w-[80%] lg:w-[70%] rounded-md shadow-xl shadow-black'
          />
        </div>

        {/* Contact Info */}
        <div className='w-full lg:w-1/2 flex flex-col gap-5 text-white'>

          <div>
            <h3 className='text-xl md:text-2xl font-bold text-[#a5faf7] mb-2'>Our Store</h3>
            <p className='text-sm md:text-base'>12345 Random Station</p>
            <p className='text-sm md:text-base'>Random City, State, India</p>
          </div>

          <div>
            <h3 className='text-xl md:text-2xl font-bold text-[#a5faf7] mb-2'>Get in Touch</h3>
            <p className='text-sm md:text-base'>Tel: +91-8840641186</p>
            <p className='text-sm md:text-base'>Email: <a href="mailto:admin@aimart.com" className="text-blue-200 underline hover:text-blue-400">admin@aimart.com</a></p>
          </div>

          <div>
            <h3 className='text-xl md:text-2xl font-bold text-[#a5faf7] mb-2'>Careers at AIMART</h3>
            <p className='text-sm md:text-base mb-4'>Learn more about our teams and job openings.</p>
            <button className='px-6 py-3 bg-[#00d9ff1f] border border-[#00e1ff7b] hover:bg-[#00e1ff3c] transition-all duration-200 rounded text-white font-medium shadow-md'>
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

    
      <NewLetterBox />

    </div>
  );
};

export default Contact;
