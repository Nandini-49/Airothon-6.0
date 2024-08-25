import { db } from "@/dbconfig/firebase";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { addDoc, collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { username, email, password, fullname, location, dateofbirth } = await req.json();

    // Validate input fields
    if (!username || !email || !password || !fullname || !location || !dateofbirth) {
      return NextResponse.json({ message: "Invalid input", status: 400 });
    }

    // Validate email format (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format", status: 400 });
    }

    // Validate password length (minimum 6 characters for example)
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long", status: 400 });
    }

    // Validate date of birth (basic validation to check if it's a valid date)
    if (isNaN(Date.parse(dateofbirth))) {
      return NextResponse.json({ message: "Invalid date of birth", status: 400 });
    }

    // Check if email already exists
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json({ message: "Email already in use. Try a different email.", status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique user ID
    const newUserRef = doc(usersRef);
    const id = newUserRef.id;

    // Add the new user to Firestore
    await setDoc(newUserRef, {
      id,
      username,
      email,
      password: hashedPassword,
      fullname,
      location,
      dateofbirth
    });

    return NextResponse.json({ message: "Registration successful", userId, status: 200 });

  } catch (error) {
    console.error("Error registering new user:", error);
    return NextResponse.json({ message: "Registration failed", status: 500 });
  }
}
