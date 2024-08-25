import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { data } = await req.json(); // Correctly parse the JSON body
    console.log("Data received at server");
    console.log(data);

    if (data) {
      const response = await axios.post("http://localhost:8000/api/v1/getroute", {
        data: data,
      });
    //   console.log("reponse from server "+response.data)
    //   console.log(response.data);
    console.log("response on data on server "+ response)
      console.log(response.data.route);
    //   console.log("respone hai")
      return NextResponse.json({
        data: response.data.route,
        message: "Data received successfully",
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "No data received",
        status: 400,
      });
    }
  } catch (error) {
    console.log("Error receiving data at server: " + error);
    return NextResponse.json({
      message: "Error receiving data at server",
      status: 500,
    });
  }
}
