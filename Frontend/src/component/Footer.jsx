import React from 'react';
import logo from '../assets/vcart logo.png';

const Footer = () => {
  return (
    <div className='w-full bg-[#dbfcfcec] px-5 md:px-16 py-10'>
      {/* Main Footer Content */}
      <div className='flex flex-col md:flex-row justify-between gap-10 mb-6'>

        {/* Brand Info */}
        <div className='flex-1 flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <img src={logo} alt="AIMART Logo" className='w-10 h-10 md:w-12 md:h-12' />
            <p className='text-lg md:text-xl font-semibold text-black'>AIMART</p>
          </div>
          <p className='text-sm text-[#1e2223] leading-relaxed'>
            AIMART is your all-in-one online shopping destination offering top-quality products and fast delivery — all backed by trusted service designed to make your life easier every day.
          </p>
          <p className='text-sm text-[#1e2223]'>Fast. Easy. Reliable. AIMART shopping.</p>
        </div>

        {/* Company Links */}
        <div className='flex-1 md:flex-[0.6] flex flex-col items-start md:items-center'>
          <h3 className='text-lg font-semibold text-[#1e2223] mb-3'>COMPANY</h3>
          <ul className='space-y-2 text-sm text-[#1e2223]'>
            <li className='cursor-pointer hover:text-black transition'>Home</li>
            <li className='cursor-pointer hover:text-black transition'>About Us</li>
            <li className='cursor-pointer hover:text-black transition'>Delivery</li>
            <li className='cursor-pointer hover:text-black transition'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='flex-1 md:flex-[0.8] flex flex-col items-start md:items-center'>
          <h3 className='text-lg font-semibold text-[#1e2223] mb-3'>GET IN TOUCH</h3>
          <ul className='space-y-2 text-sm text-[#1e2223]'>
            <li className='cursor-pointer hover:text-black transition'>+91-8840641186</li>
            <li className='cursor-pointer hover:text-black transition'>ht8840641186@gmail.com</li>
            <li className='cursor-pointer hover:text-black transition'>+1-123-456-7890</li>
            <li className='cursor-pointer hover:text-black transition'>admin@AIMART.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className='w-full h-[1px] bg-slate-400'></div>

      
      <div className='w-full text-center py-4 text-sm text-[#1e2223]'>
        © 2025 AIMART. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
