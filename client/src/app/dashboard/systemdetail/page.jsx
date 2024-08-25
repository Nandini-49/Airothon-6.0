'use client'
import React, { useState } from "react";
import axios from "axios";

export default function Component() {

  const [flightdata, setflightdata] = useState(null);
  const [input, setinput] = useState('');

  // Fetching data from /api/flightdetail
  const fetchflightdata = async () => {
    try {
      await axios.post('/api/flightdetail', { registration_number: input })
        .then((response) => {
          setflightdata(response.data.data);
          // console.log(response.data.data);
          setinput(''); // Clear the input field after fetching the data
        })
        .catch((error) => {
          console.log("Error while fetching data: " + error);
        });
    } catch (error) {
      console.log("Facing error while fetching system detail: " + error);
    }
  }

  const handlesubmit = () => {
    fetchflightdata();
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-900 text-white">
      <header className="flex items-center h-16 px-4 border-b border-gray-700 md:px-6">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-6 w-4 text-neon-green" />
          <input
            className="pl-8 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] bg-gray-800 h-12 text-white rounded-lg"
            placeholder="Search flight Detail By Registration Number e.g (YR-BAG) ..."
            type="search"
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <button
            className="ml-4 bg-[#00df9a] font-bold text-medium p-3 rounded-md tracking-wide uppercase"
            onClick={handlesubmit}
          >
            Search
          </button>
        </div>
      </header>
      <main className="flex-1 grid gap-6 p-4 md:p-6 lg:p-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flightdata && (
            <>
              <Card title="Plane Age" icon={<CalendarIcon />} value={flightdata.plane_age} description="Age of the plane" />
              <Card title="Owner Name" icon={<UserIcon />} value={flightdata.plane_owner} description="Registered owner" />
              <Card title="Model Name" icon={<PlaneIcon />} value={flightdata.model_name} description="Model name" />
              <Card title="Engine Count" icon={<FuelIcon />} value={flightdata.engines_count} description="Number of engines" />
              <Card title="Engine Type" icon={<FuelIcon />} value={flightdata.engines_type} description="Type of engines" />
              <Card title="Plane Status" icon={<PlaneIcon />} value={flightdata.plane_status} description="Current status" />
              <Card title="First Flight" icon={<CalendarIcon />} value={new Date(flightdata.first_flight_date).toLocaleDateString()} description="Date of first flight" />
              <Card title="Registration Number" icon={<PlaneIcon />} value={flightdata.registration_number} description="Registration number" />
              <Card title="Model Code" icon={<PlaneIcon />} value={flightdata.model_code} description="Model code" />
            </>
          )}
        </div>
      </main>
    </div>
  )
}

function Card({ title, icon, value, description }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex flex-row items-center justify-between pb-2">
        <div className="text-sm font-medium">{title}</div>
        {React.cloneElement(icon, { className: "w-4 h-4 text-neon-green" })}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  )
}

function CalendarIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function UserIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function PlaneIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}

function FuelIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" x2="15" y1="22" y2="22" />
      <line x1="4" x2="14" y1="9" y2="9" />
      <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
      <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
