import React from 'react';
import Title from "../component/Title";
import about from '../assets/about.png';
import NewLetterBox from "../component/NewLetterBox"
const About = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] py-20 px-4 gap-20'>
      
      {/* About Us Section */}
      <div className='flex flex-col items-center justify-center gap-12 w-full max-w-7xl'>
        <Title text1={'ABOUT'} text2={'US'} />
        <div className='w-full flex flex-col lg:flex-row items-center justify-center gap-10'>
          
          {/* Image Section */}
          <div className='w-full lg:w-1/2 flex items-center justify-center'>
            <img 
              src={about} 
              alt="About AIMART" 
              className='w-3/5 md:w-[50%] lg:w-[65%] h-auto shadow-lg shadow-black rounded-sm'
            />
          </div>

          {/* Text Section */}
          <div className='w-full lg:w-1/2 flex flex-col gap-5 text-white'>
            <p className='text-sm md:text-base lg:w-[80%]'>
              AIMART was born for smart, seamless shopping — created to deliver quality products, trending styles, and everyday essentials all in one place. With reliable service, fast delivery, and great value, AIMART makes your online shopping experience simple and stress-free.
            </p>
            <p className='text-sm md:text-base lg:w-[80%]'>
              Designed for modern shoppers — combining style, convenience, and affordability in every purchase.
            </p>
            <p className='font-semibold text-base md:text-lg'>Our Mission</p>
            <p className='text-sm md:text-base lg:w-[80%]'>
              Our mission is to redefine online shopping by delivering quality, affordability, and convenience at your fingertips — every day, everywhere.
            </p>
          </div>

        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='w-full max-w-7xl flex flex-col items-center justify-center gap-10'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
        
        <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-8 px-4'>
          
          {/* Card 1 */}
          <div className='lg:w-1/3 w-full border border-gray-100 p-6 text-white backdrop-blur-[2px] bg-[#ffffff0b] rounded-md'>
            <b className='text-xl font-semibold text-[#bff1f9]'>Quality Assurance</b>
            <p className='mt-2 text-sm md:text-base'>
              We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction—always.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className='lg:w-1/3 w-full border border-gray-100 p-6 text-white backdrop-blur-[2px] bg-[#ffffff0b] rounded-md'>
            <b className='text-xl font-semibold text-[#bff1f9]'>Convenience</b>
            <p className='mt-2 text-sm md:text-base'>
              Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.
            </p>
          </div>

          {/* Card 3 */}
          <div className='lg:w-1/3 w-full border border-gray-100 p-6 text-white backdrop-blur-[2px] bg-[#ffffff0b] rounded-md'>
            <b className='text-xl font-semibold text-[#bff1f9]'>Exceptional Customer Service</b>
            <p className='mt-2 text-sm md:text-base'>
              Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.
            </p>
          </div>

        </div>
      </div>
     <NewLetterBox/>
    </div>
  );
};

export default About;
