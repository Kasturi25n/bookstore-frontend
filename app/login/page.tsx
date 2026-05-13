"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email)
      .eq("password", password);

    if (error) {
      alert("Login Failed");
      console.log(error.message);
      return;
    }

    if (data.length > 0) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login Successful");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[400px] transition-all duration-300">

        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Book Store Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email ID"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Login
        </button>

        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              localStorage.setItem("isLoggedIn", "true");
              alert("Google Login Successful");
            }}
            onError={() => {
              alert("Google Login Failed");
            }}
          />
        </div>

      </div>
    </div>
  );
}