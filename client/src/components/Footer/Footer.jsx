import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col  md:flex-row justify-between items-center mb-4 
    py-6 bg-gray-900 text-neon-green text-sm md:text-base lg:text-lg">
      
      <div className="flex flex-col w-full items-center mb-4 md:mb-0">
        <p className="font-semibold text-[#00df9a] text-lg">AIRBUS</p>
        <p className="text-center">Enhance your flight navigation experience</p>
      </div>
      <div className="mb-4 md:mb-0 gap-2 w-full flex items-center justify-center flex-col">
      <img src='https://images.unsplash.com/flagged/photo-1555685460-1d9cf532761b?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Company Logo" className="w-24 h-24 rounded-full" />
      {/* <div className="flex w-full max-w-sm items-center space-x-2">
      <input className="flex-1" placeholder="Enter your email" type="email" />
      <button type="submit">Subscribe</button>
    </div> */}
        <p className="text-center">@ 2024</p>
        <p>All Right Resereved</p>
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="font-semibold text-lg text-[#00df9a] mb-2">Support</div>
        <ul className="list-disc pl-6 space-y-1 text-left">
          <li>Help Center</li>
          <li>Customer Support</li>
          <li>User Manual</li>
          <li>Contact Support</li>
        </ul>
      </div>
    </div>
  );
}
