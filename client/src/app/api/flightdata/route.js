import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = "http://api.aviationstack.com/v1/flights";
const YOUR_ACCESS_KEY = process.env.AVIATION_KEY

export async function POST(req) {
  try {
    const { dep_icao, arr_icao, flight_status } = await req.json();

    if (!dep_icao || !arr_icao || !flight_status) {
      return NextResponse.json({ message: "Invalid input", status: 400 });
    }

    const response = await axios.get(API_URL, {
      params: {
        access_key: YOUR_ACCESS_KEY,
        flight_status: flight_status,
        dep_icao: dep_icao,
        arr_icao: arr_icao,
      },
    });

    console.log("response "+ response.data);

    const data = await response.data.data;
    console.log(data)

    if (data) {
      // Post the data to the datatoserver API
   const response=   await axios.post('http://localhost:3000/api/datatoserver', {
        data: data,
      });

      console.log("data after coming to root " + response)

      return NextResponse.json({ message: "Flight Found", status: 200, data: response.data.data });
    }
    
    return NextResponse.json({ message: "Flight not found", status: 404 });

  } catch (error) {
    console.log("Error getting the system detail of flight: " + error);
    return NextResponse.json({ message: "Error getting the system detail of flight", status: 500 });
  }
}
