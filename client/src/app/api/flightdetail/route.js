import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = "http://api.aviationstack.com/v1/airplanes";
const YOUR_ACCESS_KEY = process.env.NEXT_AVIATION_KEY;

export async function POST(req) {
  try {
    const { registration_number } = await req.json(); // Use correct variable name
    console.log(registration_number);

    if (!registration_number) {
      return NextResponse.json({ message: "Invalid input", status: 400 });
    }

    const response = await axios.get(API_URL, {
      params: {
        access_key:"8cac252b7fd597006759bd3579378f56",
      },
    });

    // return NextResponse.json({data:response.data})

    const data = response.data.data; 
    // console.log(data)
    // Access the correct data field
    const result = data.filter((item) => item.registration_number === registration_number); // Use correct attribute

    if (result.length > 0) {
      return NextResponse.json({ message: "Flight Found", status: 200, data: result[0] });
    }
    return NextResponse.json({ message: "Flight not found", status: 404 });

  } catch (error) {
    console.log("Error getting the system detail of flight: " + error);
    return NextResponse.json({ message: "Error getting the system detail of flight", status: 500 });
  }
}
