import axios from 'axios';
import { NextResponse } from 'next/server';

// Config with placeholder (replace with your actual AviationStack API key)
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const YOUR_ACCESS_KEY = 'd3c6844bff7a2935a9ab5b3cde1e097c'; // Replace with your key

// http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid={API key}

export async function POST(req) {
  try {
    const { lat, lon } = await req.json();
    const response = await axios.get(API_URL, {
      params: {
        appid: YOUR_ACCESS_KEY,
         lat: lat,
         lon: lon,
      },
    });

    const data = response;
console.log(data.data)
    // const departueiata=data.map((e)=>{
    //   return e.departure.iata
    
    // })

    // const arrivaliata=data.map((e)=>{
    //   return e.arrival.iata
    
    // })

    // const flightData = data.map(flight => ({
    //   from: flight.departure.iata,
    //   to: flight.arrival.iata
    // }));
    
    // console.log(flightData);
    
    // console.log(arrivaliata);
    // console.log(data);

    // Filter the flights based on departure IATA code being "JFK" or "LAX"
    // const filteredData = data.filter(flight => {
    //   return flight.departure.iata === 'SFO' ;
    // });

    // console.log(filteredData);

    return NextResponse.json({ data: response.data, status: 200 });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ message: 'Error fetching Weather data', status: 500 });
  }
}
