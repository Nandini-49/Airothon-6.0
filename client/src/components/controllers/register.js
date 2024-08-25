'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [location, setLocation] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !fullname.trim() || !location.trim() || !dateofbirth.trim()) {

      toast.warn('All fiels are required');
      // setError("All fields are required.");
      return;
    }

    // Email validation using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {

      toast.warn("Invalid email format")

      // setError("Invalid email format.");
      return;
    }

    // Password validation using regex
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      // toast.error("")



      setError("Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.");
      return;
    }

    // Confirm password match validation
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match.")

      // setError("Passwords do not match.");
      return;
    }

    // Date of birth validation
    if (isNaN(Date.parse(dateofbirth))) {
      toast.warn("Invalid date of birth")
      // setError("Invalid date of birth.");
      return;
    }

    // Create data object for POST request
    const data = { username, email, password, fullname, location, dateofbirth };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {

        toast.success('Registration Successful')

        // Register successful
        // console.log("User registered successfully");
        // Redirect to login page
        router.push("/login", { replace: true });
      } else {
        // Register failed
        // console.error("Register failed");
        const responseData = await response.json(); // Parse error response if available
        if (responseData && responseData.message) {
          toast.warn(responseData.message)
          // setError(responseData.message); // Set error message from server validation
        } else {
          toast.error("Register failed. Please try again later.")
          // setError("Register failed. Please try again later."); // Default error message
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Register failed . Please try again later")
      // setError("Register failed. Please try again later.");
    }
  };

  return (
    <div className="text-white bg-gray-900 register w-full mx-auto p-8 rounded shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-[#00df9a]">Register</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="username" className="block text-[#00df9a]">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[#00df9a]">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>
          <div>
            <label htmlFor="fullname" className="block text-[#00df9a]">Full Name:</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-[#00df9a]">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>
          <div>
            <label htmlFor="dateofbirth" className="block text-[#00df9a]">Date of Birth:</label>
            <input
              type="date"
              id="dateofbirth"
              value={dateofbirth}
              onChange={(e) => setDateofbirth(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#00df9a]">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-[#00df9a]">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#00df9a] text-gray-900 py-2 rounded font-bold text-2xl tracking-widest hover:bg-[#00c17d]">Register</button>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default Register;
