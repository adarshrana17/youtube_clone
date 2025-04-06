import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import VideoItem from "./videoItem";
import Sidebar from "./Sidebar";
import videos from "../utlis/mockdata";

function Login({ sidebar, setSidebar }) {
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const categories = [
    "All",
    "Music",
    "Game",
    "Cricket",
    "Movies",
    "Gaming",
    "Television Comedy",
    "News",
    "Cartoon",
    "Entertainment",
    "Sports",
    "Dubbing",
    "Coding",
    "Podcast",
    "Live",
    "Football",
    "React",
  ];

  // Fetch user details to check authentication
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token"); // Fetch the token

        const response = await fetch(
          "https://youtube-clone-y1gb.onrender.com/loggedin-user",
          {
            method: "GET",
            credentials: "include", // Ensures cookies are sent (if using cookies for auth)
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`, // Include token
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error("Error fetching user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, [navigate]);

  // Filter videos based on category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(
        (video) =>
          video.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          video.description
            .toLowerCase()
            .includes(selectedCategory.toLowerCase()) ||
          (video.category &&
            video.category
              .toLowerCase()
              .includes(selectedCategory.toLowerCase()))
      );
      setFilteredVideos(filtered);
    }
  }, [selectedCategory]);

  return (
    <>
      <Header
        setSidebar={setSidebar}
        sidebar={sidebar}
        setFilteredVideos={setFilteredVideos}
        showModal={true}
        custom_css="py-2.5"
      />
      {sidebar && <Sidebar />}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebar ? "md:w-[calc(100%-230px)] ml-auto -z-50" : "w-full"
        }`}
      >
        {/* Category Filters */}
        <div className="fixed top-[65px] bg-white overflow-x-auto scrollbar-hide p-2 w-full sm:mt-2 lg:mt-3">
          <div className="flex space-x-2 w-max min-w-full whitespace-nowrap px-2 mt-1">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 
                  ${
                    selectedCategory === category
                      ? "bg-gray-300 font-bold"
                      : "bg-gray-100"
                  }`}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* Display Filtered Videos */}
        <div
          className={`grid gap-4 p-4 mt-[115px] w-full 
            ${
              sidebar
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
        >
          {filteredVideos.length > 0 ? (
            filteredVideos.map((data) => (
              <VideoItem key={data.id} videoDetails={data} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No videos found
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
