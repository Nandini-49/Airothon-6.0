import React from 'react'
import App from '@/app/dashboard/weathereport/page'

export default function Services() {
    return (
      <section className="w-full py-12 md:py-24 flex flex-col justify-center items-center lg:py-32">
         <h2 className="text-3xl font-bold text-center mb-7  tracking-wider sm:text-4xl md:text-5xl">
                Services
                </h2>
        <div className="container grid gap-8 px-4 justify-center items-center mx-auto  md:px-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:scale-105">
            <img
              alt="Service 1"
              className="h-48 w-full object-cover object-center transition-all group-hover:scale-105"
              height={400}
              src="https://www.flightradar24.com/static/images/adsb.jpg"
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-white">
              <h3 className="text-lg font-semibold">Real-time Analysis</h3>
              <p className="text-sm">Harness instant data for strategic planning</p>
            </div>
          </div>
         <App/>
          <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:scale-105">
            <img
              alt="Service 3"
              className="h-48 w-full object-cover object-center transition-all group-hover:scale-105"
              height={400}
              src="https://media.istockphoto.com/id/486801410/photo/silhouette-commercial-airplane-take-off-over-airport-control-tow.jpg?s=612x612&w=0&k=20&c=5KnCQSIG6fHjUaa0-pqE0hWTunPxmIH5ZPr_5B7chZ4="
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-white">
              <h3 className="text-lg font-semibold">Air Traffic Data</h3>
              <p className="text-sm"> Empower efficient route planning with real-time tracking.</p>
            </div>
          </div>
          {/* <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:scale-105">
            <img
              alt="Service 4"
              className="h-48 w-full object-cover object-center transition-all group-hover:scale-105"
              height={400}
              src="/placeholder.svg"
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-white">
              <h3 className="text-lg font-semibold">Service 4</h3>
              <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div> */}
        </div>
      </section>
    )
  }