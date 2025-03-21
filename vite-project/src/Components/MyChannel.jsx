import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MyChannel = () => {
  const { userId } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
          console.error("No token or user data found.");
          return;
        }

        const user = JSON.parse(userData);
        const userId = user._id;

        if (!userId) {
          console.error("No userId found in localStorage.");
          return;
        }

        const response = await fetch(`http://localhost:5100/user-channel/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch channel details");
        }

        setChannel(data);
      } catch (error) {
        console.error("Error fetching channel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, []);

  return (
    <>
      <Header setSidebar={setSidebar} sidebar={sidebar} showSignin={false} custom_css="py-2.5" />
      {sidebar && <Sidebar showSigninbtn={false} />}
      <div className={`${sidebar ? "w-[calc(100%-230px)] ml-auto" : "w-screen"}`}>
        <div className="main flex flex-col h-screen text-xl mt-20 md:mt-40">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : channel ? (
            <div className="container w-full max-w-4xl flex flex-col gap-10 px-5">
              {/* Upper Section */}
              <div className="upper flex flex-col items-start sm:flex-row items-center sm:items-start gap-5 sm:gap-10">
                <div className="channelBanner">
                  {channel.channelImage ? (
                    <img
                      src={`http://localhost:5100${channel.channelImage}`}
                      alt="Channel Banner"
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 flex justify-center rounded-full bg-gray-400 text-6xl text-white">
                      <span className="mt-5">{channel.channelName?.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </div>

                {/* Channel Details */}
                <div className="channel-details flex flex-col gap-2.5 mt-2.5 text-center text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold">{channel.channelName}</h1>
                  <p className="text-gray-500">{channel.description || "No description available."}</p>
                  <p className="text-gray-700">
                    More about this channel... <span className="text-black">more</span>
                  </p>
                  <div className="flex flex-col md:flex-row gap-3 w-fit md:gap-5">
                    <button className="px-3 py-2 bg-gray-200 rounded-4xl md:px-3 md:py-2">Customize Channel</button>
                    <button className="px-3 py-2 bg-gray-200 rounded-4xl md:px-3 md:py-2">Manage Videos</button>
                  </div>
                </div>
              </div>

              <hr className="w-screen border-gray-300" />
              <div className="w-screen">
              <h1 className="md:text-center text-center text-lg font-semibold">All Videos</h1>
              </div>
            </div>
          ) : (
            <p className="text-red-500">Error: Channel not found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyChannel;
