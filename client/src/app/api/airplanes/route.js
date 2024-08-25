import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = "http://api.aviationstack.com/v1/airplanes";
const YOUR_ACCESS_KEY = process.env.AVIATION_KEY;

export async function GET(req) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        access_key: YOUR_ACCESS_KEY,
      },
    });

    // Extract the data from the response
    const data = response.data;

    return NextResponse.json(data); // Return the data part of the response
    
  } catch (error) {
    console.log("Error getting the system detail of flight: " + error);
    return NextResponse.json({ message: "Error getting the system detail of flight", status: 500 });
  }
}
