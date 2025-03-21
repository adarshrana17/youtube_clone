import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Preview Image
      setImage(file); // Store Actual File
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelName || !description) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("channelName", channelName);
    formData.append("description", description);
    formData.append("channelImage", image);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setMessage("User not authenticated!");
        return;
      }

      const response = await fetch("http://localhost:5100/create-channel", {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Channel Created Successfully");
        navigate("/login");
      } else {
        setMessage(result.message || "Failed to create channel");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
      setMessage("Error creating channel!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-lg md:w-[50%] h-auto bg-white shadow-lg rounded-lg flex-col items-center p-5">
        <p className="flex items-center justify-center w-full bg-red-600 text-white text-lg md:text-2xl font-semibold rounded-t-lg h-14 md:h-16 mb-5 text-center">
          Create your own YouTube Channel
        </p>

        {/* Image Preview Box */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-4 overflow-hidden bg-gray-200">
          {preview ? (
            <img src={preview} alt="Channel Logo" className="w-full h-full object-cover" />
          ) : (
            <i className="fa-solid fa-circle-user text-6xl md:text-9xl text-blue-400"></i>
          )}
        </div>

        {/* Upload Button */}
        <label htmlFor="channelLogo" className="cursor-pointer text-blue-600 text-lg md:text-xl font-semibold px-4 rounded mb-3 hover:text-blue-700">
          Select Picture
        </label>
        <input type="file" id="channelLogo" className="hidden" accept="image/*" onChange={handleFileChange} />

        {/* Channel Name Input */}
        <input
          className="border p-2 w-[90%] sm:w-[80%] rounded mb-3 text-sm md:text-base"
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
        />

        {/* Description Input */}
        <textarea
          className="border p-2 w-[90%] sm:w-[80%] rounded mb-3 text-sm md:text-base"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {/* Submit Button */}
        <div className="flex flex-wrap w-full justify-center md:justify-end gap-3 px-5 md:px-16">
          <Link to="/login">
            <button className="bg-red-600 text-white py-2 px-5 md:px-6 rounded text-sm md:text-base hover:bg-red-700">
              Cancel
            </button>
          </Link>
          <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 px-5 md:px-6 rounded text-sm md:text-base hover:bg-blue-900">
            Create Channel
          </button>
        </div>

        {/* Success Message */}
        {message && <p className="mt-3 text-green-500 text-sm md:text-base">{message}</p>}
      </div>
    </div>
  );
}

export default CreateChannel;
