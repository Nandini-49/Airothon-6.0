import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/dbconfig/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";

// console.log(process.env.JWT_SECRET);

const JWT_SECRET = process.env.JWT_SECRET; // Use environment variable for secret

// Function to authenticate token
async function authenticateToken(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return { error: "No token provided", status: 401 };
  // console.log(authHeader)
  const token = authHeader.split(" ")[1];

  // console.log("token hai " + token)
  if (!token) return { error: "Token missing", status: 401 };

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { user: decoded };
  } catch (err) {
    return { error: "Token is not valid", status: 403 };
  }
}

// GET handler for fetching user data
export async function GET(req) {
  // console.log(req);
  const { user, error, status } = await authenticateToken(req);

  if (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status });
  }

  try {
    const userQuery = query(
      collection(db, "Users"),
      where("id", "==", user.userId)
    );
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    // console.log(userData)

    return NextResponse.json(
      { message: "User data found", profileData: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.toString() },
      { status: 500 }
    );
  }
}
