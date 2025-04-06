import { useState, useEffect } from "react";
import videos from "../utlis/mockdata";
import VideoItem from "./videoItem";

function Home({ sidebar }) {
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const options = [
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
    "Dubbing",
    "Coding",
    "Podcast",
    "Live",
    "Football",
    "React",
    "Old Hindi Songs",
    "Data Science",
  ];

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
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebar ? "md:w-[calc(100%-230px)] ml-auto -z-50" : "w-full"
        }`}
      >
        {/* Category Filters */}
        <div className="fixed top-[65px] bg-white overflow-x-auto scrollbar-hide p-2 w-full sm:mt-2 lg:mt-3">
          <div className="flex space-x-2 w-max min-w-full whitespace-nowrap px-2 mt-1">
            {options.map((category, index) => (
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

export default Home;
