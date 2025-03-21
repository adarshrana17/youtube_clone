import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import videos from "../utlis/mockdata";
import VideoItem from "./videoItem";
import { useParams } from "react-router";

function Profile({ channelDetails }) {
  const { coverImage, channelLogo, channelName, subscribers, email } = channelDetails;
  const [sidebar, setSidebar] = useState(false);
  const { id } = useParams();

  const selectedVideo = videos.find((video) => video.id === Number(id));

  if (!selectedVideo) {
    return <h2 className="text-center text-red-500 mt-5">Video not found!</h2>;
  }

  const channelId = selectedVideo.channelId;
  const filteredVideos = videos.filter((video) => video.channelId === channelId);

  return (
    <>
      <Header setSidebar={setSidebar} sidebar={sidebar} showSignin={false} custom_css="py-1 pt-2.5"/>
      {sidebar && <Sidebar showSigninbtn={false} />}
      
      <div className="main px-5 mt-20">
        <div className="flex flex-col gap-5">
          {/* Cover Image */}
          <div className="coverimage">
            <img src={coverImage} alt="" className="h-40 sm:h-52 md:h-60 w-full rounded-3xl object-cover" />
          </div>

          {/* Channel Details */}
          <div className="channeldetails flex flex-wrap gap-5 items-center">
            <div className="channellogo">
              <img src={channelLogo} alt="" className="h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36 rounded-4xl" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-2xl sm:text-3xl font-bold">{channelName}</p>
              <p>
                <span className="font-semibold">{email}</span> •{" "}
                <span className="text-gray-600">{subscribers}</span>
              </p>
              <p>
                <span className="text-gray-600">More About This Channel</span>{" "}
                <span className="font-semibold">...more</span>
              </p>

              {/* Buttons */}
              <div className="buttons flex flex-wrap gap-3 sm:gap-5">
                <button className="rounded-4xl p-2 px-3 bg-black text-white">Subscribe</button>
                <button className="rounded-4xl py-2 px-4 bg-gray-300">Join</button>
              </div>
            </div>
          </div>
        </div>

        <hr className="text-gray-500 mt-5" />

        {/* Videos Section */}
        <div className="videos">
          <p className="text-center font-semibold text-xl my-2.5">All Videos</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => <VideoItem key={video.id} videoDetails={video} />)
            ) : (
              <p className="text-center text-gray-500">No videos found for this channel.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
