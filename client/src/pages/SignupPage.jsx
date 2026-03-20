import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {

    const res = await fetch("http://localhost:3000/api/auth/signup", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username,
        password
      })

    });

    const data = await res.json();

    if(res.ok){
      alert("Account created");
      navigate("/");
    } else {
      alert(data.message);
    }

  };

  return (

    <div className="bg-gray-900 flex items-center justify-center h-screen">

      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md text-white">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e=>setUsername(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-indigo-600 py-2 rounded"
        >
          Create Account
        </button>

      </div>

    </div>

  );
}

export default SignupPage;