import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password,setPassword]=useState('');

  const navigate = useNavigate();

const handleLogin = async () => {

  const res = await fetch("http://localhost:3000/api/auth/login", {

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

    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user.id);       
localStorage.setItem("username", data.user.username)
    navigate("/chat");

  } else {

    if(data.message === "User not found"){
      navigate("/signup");
    } else {
      alert(data.message);
    }

  }

};
  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Discord Clone</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 focus:outline-none text-white"
        />
         <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-white font-semibold"
        >
          Enter Chat
        </button>
         <p className="text-sm text-center mt-4 text-gray-400">

          Don't have an account?{" "}

          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>

        </p>
      </div>
    </div>
  );
}

export default LoginPage;