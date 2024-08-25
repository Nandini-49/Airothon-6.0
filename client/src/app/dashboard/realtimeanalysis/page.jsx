'use client'
import React,{useState} from 'react'

import axios from 'axios';
import Link from 'next/link';

export default function Realtimeanalysis() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [depIcao, setDepIcao] = useState("");
  const [arrIcao, setArrIcao] = useState("");

  const postdata = async () => {
    try {
      if (!status || !depIcao || !arrIcao) {
        console.log("Invalid input");
        setLoading(false);
        return;
      }

      setLoading(true);

      const response = await axios.post('/api/flightdata', {
        flight_status: status,
        dep_icao: depIcao,
        arr_icao: arrIcao,
      });

      if (response.status === 200) {
        console.log("Route: ", response.data.data);
        setData(response.data.data);
      } else {
        console.log("Failed to fetch route");
      }
    } catch (error) {
      console.log("Error while posting data to server: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 w-full min-h-screen bg-gray-800 text-white">
    <h2 className="text-3xl font-bold text-center mb-7 tracking-wider sm:text-4xl md:text-5xl">
      Route Planning
    </h2>
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Our advanced route planning algorithm takes the hassle out of booking your next trip. Simply enter
              your departure and destination, and we'll provide the optimal flight plan.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <PlaneIcon className="h-6 w-6 text-#00df9a" />
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium" htmlFor="departure">
                  Departure
                </label>
                <input
                  className="pl-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] bg-gray-700 h-12 text-white rounded-lg"
                  id="departure"
                  placeholder="Enter departure ICAO"
                  value={depIcao}
                  onChange={(e) => setDepIcao(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <PlaneIcon className="h-6 w-6 text-#00df9a" />
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium" htmlFor="destination">
                  Destination
                </label>
                <input
                  className="pl-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] bg-gray-700 h-12 text-white rounded-lg"
                  id="destination"
                  placeholder="Enter destination ICAO"
                  value={arrIcao}
                  onChange={(e) => setArrIcao(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="w-full bg-gray-700 h-12 text-white rounded-lg"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <button
              className="w-full bg-[#00df9a] font-bold text-medium p-3 rounded-md tracking-wide uppercase"
              onClick={postdata}
            >
              {loading ? <span>Loading...</span> : <span>Find Flights</span>}
            </button>
            {data?.length > 0 &&
              data.map((e, index) => (
                <div
                  key={index}
                  className="group bg-gray-900 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Link className="block h-full" href="#">
                    <div className="p-4 md:p-6 space-y-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        {index + 1}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{e.lat}, {e.lon}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <CloudIcon className="w-4 h-4" />
                        <span>Partly Cloudy, 72°F</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          {/* Additional content can go here */}
        </div>
      </div>
    </div>
  </section>
  )
}

function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function CloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
