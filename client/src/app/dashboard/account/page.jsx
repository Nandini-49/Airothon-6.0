'use client';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/dbconfig/firebase';

export default function Component() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className=' flex justify-center items-center h-screen'>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <rect width="9" height="9" x="1.5" y="1.5" fill="#888888" rx="1">
            <animate
              id="svgSpinnersBlocksScale0"
              attributeName="x"
              begin="0;svgSpinnersBlocksScale1.end+0.15s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="1.5;.5;1.5"
            />
            <animate
              attributeName="y"
              begin="0;svgSpinnersBlocksScale1.end+0.15s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="1.5;.5;1.5"
            />
            <animate
              attributeName="width"
              begin="0;svgSpinnersBlocksScale1.end+0.15s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="9;11;9"
            />
            <animate
              attributeName="height"
              begin="0;svgSpinnersBlocksScale1.end+0.15s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="9;11;9"
            />
          </rect>
          <rect width="9" height="9" x="13.5" y="1.5" fill="#888888" rx="1">
            <animate
              attributeName="x"
              begin="svgSpinnersBlocksScale0.begin+0.15s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="13.5;12.5;13.5"
            />
            <animate
              attributeName="y"
              begin="svgSpinnersBlocksScale0.begin+0.15s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="1.5;.5;1.5"
            />
            <animate
              attributeName="width"
              begin="svgSpinnersBlocksScale0.begin+0.15s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="9;11;9"
            />
            <animate
              attributeName="height"
              begin="svgSpinnersBlocksScale0.begin+0.15s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="9;11;9"
            />
          </rect>
          <rect width="9" height="9" x="13.5" y="13.5" fill="#888888" rx="1">
            <animate
              attributeName="x"
              begin="svgSpinnersBlocksScale0.begin+0.3s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="13.5;12.5;13.5"
            />
            <animate
              attributeName="y"
              begin="svgSpinnersBlocksScale0.begin+0.3s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="13.5;12.5;13.5"
            />
            <animate
              attributeName="width"
              begin="svgSpinnersBlocksScale0.begin+0.3s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="9;11;9"
            />
            <animate
              attributeName="height"
              begin="svgSpinnersBlocksScale0.begin+0.3s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="9;11;9"
            />
          </rect>
          <rect width="9" height="9" x="1.5" y="13.5" fill="#888888" rx="1">
            <animate
              id="svgSpinnersBlocksScale1"
              attributeName="x"
              begin="svgSpinnersBlocksScale0.begin+0.45s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="1.5;.5;1.5"
            />
            <animate
              attributeName="y"
              begin="svgSpinnersBlocksScale0.begin+0.45s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="13.5;12.5;13.5"
            />
            <animate
              attributeName="width"
              begin="svgSpinnersBlocksScale0.begin+0.45s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="9;11;9"
            />
            <animate
              attributeName="height"
              begin="svgSpinnersBlocksScale0.begin+0.45s"
              dur="0.6s"
              keyTimes="0;.2;1"
              values="9;11;9"
            />
          </rect>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:space-x-8 h-screen bg-gray-900">
      <div className="w-full md:w-1/2 bg-gray-800 p-8 rounded-lg shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-shrink-0">
              <img className="h-12 w-12 rounded-full" src="/placeholder.svg?height=100&width=100" alt="John Doe" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              {user.username}
            </h2>
          </div>
          <div className="divide-y space-y-5 divide-gray-700">
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-400">Full name</span>
              <span className="font-medium text-white">{user.fullname}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-400">Location</span>
              <span className="font-medium text-white">{user.location}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-400">Email</span>
              <span className="font-medium text-white">{user.email}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-gray-400">Date of birth</span>
              <span className="font-medium text-white">{user.dateofbirth}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-[#00df9a] text-gray-900 py-2 px-4 rounded hover:bg-[#00c17d]">Learn more</button>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-gray-800 p-8 rounded-lg shadow-md mt-6 md:mt-0 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Important</h3>
          <div className="mt-4 space-y-4">
            <p className="text-gray-400">Stay informed with real-time data and advanced algorithms for optimal flight navigation!</p>
            <p className="text-gray-400">Get weather updates to plan your flights better and ensure safety.</p>
            <p className="text-gray-400">Track your health status and get personalized recommendations for better performance.</p>
            <p className="text-gray-400">Receive timely alerts and notifications to stay updated on critical information.</p>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-[#00df9a] text-gray-900 py-2 px-4 rounded hover:bg-[#00c17d]">Learn more</button>
        </div>
      </div>
    </div>
  );
}
