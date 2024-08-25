import { db } from "@/dbconfig/firebase";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { collection, query, where, getDocs } from "firebase/firestore";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your environment variables

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // Query Firestore for the user with the provided email
    const userQuery = query(
      collection(db, "Users"),
      where("email", "==", email)
    );
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      // Return a generic error message to avoid revealing whether the email exists
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Assuming email is unique, get the first matching document
    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return success response with the token
    return NextResponse.json({
      message: "Login successful",
      token,
    }, { status: 200 });

  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
