import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateServerModal({ closeModal }) {

  const [step, setStep] = useState("options");

  return (

    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">

      <div className="bg-gray-900 text-white w-96 rounded-xl p-6">

        {/* CLOSE BUTTON */}
        <div className="flex justify-end">
          <button onClick={closeModal}>✕</button>
        </div>

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

            <div className="bg-gray-800 p-3 rounded cursor-pointer hover:bg-gray-700 text-center border border-indigo-500">
              Join Server
            </div>

          </>
        )}

       {step === "create" && (
  <CreateServerForm 
    goBack={() => setStep("options")} 
    closeModal={closeModal}
  />
)}

      </div>

    </div>
  );
}

export default CreateServerModal;



function CreateServerForm({ goBack,closeModal }) {

  const navigate = useNavigate();

  const [serverName, setServerName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");


  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };


  const createServer = async () => {

    try {

      setStatus("loading");
      setMessage("Creating server...");

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", serverName);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("http://localhost:3000/api/servers", {

        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData

      });

      const data = await res.json();

      if (res.ok) {

        setStatus("success");
setMessage("Server created successfully 🎉");

setTimeout(() => {
  closeModal();
}, 1000);
       

      } else {

        setStatus("error");
        setMessage(data.message || "Server creation failed");

      }

    } catch (error) {

      setStatus("error");
      setMessage("Something went wrong");

    }
  };


  return (

    <div className="text-white">

      <h2 className="text-2xl font-bold text-center mb-2">
        Customize Your Server
      </h2>

      <p className="text-sm text-gray-400 text-center mb-6">
        Give your new server a personality with a name and an icon.
      </p>


      {/* IMAGE UPLOAD */}
      <div className="flex justify-center mb-6">

        <label className="relative cursor-pointer">

          <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center overflow-hidden">

            {preview ? (
              <img
                src={preview}
                alt="server preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <span className="text-xl">📷</span>
                <span className="text-xs">UPLOAD</span>
              </div>
            )}

          </div>

          <div className="absolute bottom-0 right-0 bg-indigo-600 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm">
            +
          </div>

          <input
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />

        </label>

      </div>


      {/* SERVER NAME */}
      <div className="mb-4">

        <label className="text-xs text-gray-400 uppercase">
          Server Name *
        </label>

        <input
          type="text"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          className="w-full mt-2 p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-indigo-500 outline-none"
        />

      </div>


      {/* MESSAGE */}
      {message && (

        <div className={`text-sm mb-4 text-center ${
          status === "success"
            ? "text-green-400"
            : status === "error"
            ? "text-red-400"
            : "text-gray-400"
        }`}>
          {message}
        </div>

      )}


      {/* BUTTONS */}
      <div className="flex justify-between items-center">

        <button
          onClick={goBack}
          className="text-gray-400 hover:text-white"
        >
          Back
        </button>

        <button
          onClick={createServer}
          disabled={status === "loading"}
          className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-md disabled:opacity-50"
        >
          {status === "loading" ? "Creating..." : "Create"}
        </button>

      </div>

    </div>
  );
}