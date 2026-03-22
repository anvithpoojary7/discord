import React, { useState } from "react";

function CreateServerModal({ closeModal }) {

  const [step, setStep] = useState("options");

  return (

    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">

      <div className="bg-gray-900 text-white w-96 rounded-xl p-6">

        {/* CLOSE BUTTON */}
        <div className="flex justify-end">
          <button onClick={closeModal}>✕</button>
        </div>

        {/* OPTIONS */}
        {step === "options" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">
              Create Your Server
            </h2>

            <p className="text-sm text-gray-400 text-center mb-6">
              Your server is where you and your friends hang out.
            </p>

            <div
              onClick={() => setStep("create")}
              className="bg-gray-800 p-3 rounded cursor-pointer hover:bg-gray-700 mb-3"
            >
              Create My Own
            </div>

            <div className="bg-gray-800 p-3 rounded mb-3">Gaming</div>
            <div className="bg-gray-800 p-3 rounded mb-3">Friends</div>
            <div className="bg-gray-800 p-3 rounded mb-3">Study Group</div>

            <div className="text-center">Have an invite already?</div>

            <div
              onClick={() => setStep("join")}
              className="bg-gray-800 p-3 rounded cursor-pointer hover:bg-gray-700 text-center border border-indigo-500"
            >
              Join Server
            </div>
          </>
        )}

        {/* CREATE */}
        {step === "create" && (
          <CreateServerForm
            goBack={() => setStep("options")}
            closeModal={closeModal}
          />
        )}

        {/* JOIN */}
        {step === "join" && (
          <JoinServerForm
            goBack={() => setStep("options")}
            closeModal={closeModal}
          />
        )}

      </div>
    </div>
  );
}

export default CreateServerModal;



// ================= CREATE SERVER =================

function CreateServerForm({ goBack, closeModal }) {

  const [serverName, setServerName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [inviteCode, setInviteCode] = useState(""); // ✅ important

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const createServer = async () => {
    try {
      setStatus("loading");
      setMessage("Creating server...");

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", serverName);
      if (image) formData.append("image", image);

      const res = await fetch("http://localhost:3000/api/servers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });

      const data = await res.json();
     console.log(data);
     
      if (res.ok) {
        setStatus("success");
        setInviteCode(data.inviteCode); // ✅ store code
        setMessage("Server created 🎉 Copy the code below");

      } else {
        setStatus("error");
        setMessage(data.message || "Server creation failed");
      }

    } catch {
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="text-white">

      <h2 className="text-2xl font-bold text-center mb-2">
        Customize Your Server
      </h2>

      {/* IMAGE */}
      <div className="flex justify-center mb-6">
        <label className="cursor-pointer">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center overflow-hidden">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400">📷</div>
            )}
          </div>
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {/* NAME */}
      <input
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
        placeholder="Server name"
        className="w-full p-3 mb-4 bg-gray-800 rounded"
      />

      {/* MESSAGE */}
      {message && (
        <div className="text-center mb-3 text-green-400">
          {message}
        </div>
      )}

      {/* 🔥 INVITE CODE DISPLAY */}
      {inviteCode && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-400">Invite Code:</p>

          <div className="bg-gray-800 p-2 rounded font-mono">
            {inviteCode}
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(inviteCode);
              alert("Copied!");
            }}
            className="mt-2 bg-indigo-600 px-3 py-1 rounded"
          >
            Copy Code
          </button>
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex justify-between">
        <button onClick={goBack}>Back</button>

        <button onClick={createServer}>
          Create
        </button>
      </div>

    </div>
  );
}


// ================= JOIN SERVER =================

function JoinServerForm({ goBack, closeModal }) {

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/servers/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ inviteCode: code.trim() }), // ✅ trim fix
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Joined server successfully 🎉");

        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 1000);

      } else {
        setStatus("error");
        setMessage(data.message || "Invalid code");
      }

    } catch {
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="text-white">

      <h2 className="text-xl font-bold text-center mb-4">
        Join a Server
      </h2>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter invite code"
        className="w-full p-3 rounded-md bg-gray-800 mb-4"
      />

      {message && (
        <div className="text-center mb-4 text-green-400">
          {message}
        </div>
      )}

      <div className="flex justify-between">

        <button onClick={goBack}>Back</button>

        <button onClick={handleJoin}>
          Join
        </button>

      </div>

    </div>
  );
}