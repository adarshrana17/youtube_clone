import Header from "./Header";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import googlelogo from "../assets/google_logo.png";
import Sidebar from "./Sidebar";

export function SignIn() {
  const [sidebar, setSidebar] = useState(false);
  const [email, setEmail] = useState(""); // Store email input
  const [password, setPassword] = useState(""); // Store password input
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function handleLogin() {
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json(); // Always parse JSON first

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      alert("Logged in Successfully");

      // ✅ Store user data in localStorage
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/login"); // Redirect to home
    } catch (error) {
      console.error("Login failed", error);
      alert(error.message); // Show actual error message
    }
  }

  return (
    <>
      <Header setSidebar={setSidebar} sidebar={sidebar} />
      {sidebar && <Sidebar />}

      {/* Responsive Container */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-3xl p-6 md:p-10 gap-8 md:gap-20 w-full max-w-[90%] md:max-w-[60%]">
          {/* Left Section */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <img src={googlelogo} alt="Google Logo" className="w-16 md:w-20" />
            <p className="text-2xl md:text-4xl font-semibold">Sign in</p>
            <p className="text-gray-600">to continue to YouTube</p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              id="email"
              className="border h-12 w-full p-2 rounded-lg text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              className="border h-12 w-full p-2 rounded-lg text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-6 gap-4">
              <Link to="/signup">
                <p className="text-blue-500 font-semibold hover:text-blue-700">
                  Create Account
                </p>
              </Link>
              <button
                className="text-white bg-blue-500 rounded-xl py-2 px-5 hover:bg-blue-700 hover:rounded-[100px]"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
