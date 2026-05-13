"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { supabase } from "../lib/supabase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase.from("user").insert([
      {
        name,
        email,
        password,
      },
    ]);

    if (error) {
      alert("Signup Failed");
      console.log(error.message);
    } else {
      alert("Signup Successful");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
        >
          Sign Up
        </button>

        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              alert("Google Signup Successful");
            }}
            onError={() => {
              alert("Google Signup Failed");
            }}
          />
        </div>

      </div>
    </div>
  );
}