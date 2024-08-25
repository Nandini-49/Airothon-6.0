import React from "react"
 
import Link from "next/link"



export default function Showcase() {
  return (
    <section className="w-10/12 mx-auto pb-20 bg-gray-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Comprehensive Flight Planning Solutions
              </h2>
              <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our flight planning solutions provide real-time analysis for safe routing, live weather updates for
                better preparedness, and air traffic data for informed decision-making.
              </p>
            </div>
            <ul className="grid gap-4 py-4">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-[#00ff7f]" />
                <span>Real-time analysis for safe routing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-[#00ff7f]" />
                <span>Live weather updates for better preparedness</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-[#00ff7f]" />
                <span>Air traffic data for informed decision-making</span>
              </li>
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#00ff7f] px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-[#00ff7f]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff7f] disabled:pointer-events-none disabled:opacity-50"
                href="#"
              >
                Learn More
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-[#00ff7f] bg-transparent px-8 text-sm font-medium text-[#00ff7f] shadow-sm transition-colors hover:bg-[#00ff7f]/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff7f] disabled:pointer-events-none disabled:opacity-50"
                href="#"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="https://cdn.pixabay.com/photo/2014/11/02/10/41/plane-513641_1280.jpg"
              width="550"
            />
            <div className="absolute top-0 left-0 h-full w-full rounded-xl bg-gradient-to-r from-gray-900 to-transparent opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              {/* <PlaneIcon className="h-16 w-16 animate-pulse text-[#00ff7f]" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
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
  )
}