import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import VideoItem from './videoItem';
import videos from '../utlis/mockdata';
import { useEffect } from 'react';

function VideoPlayback({ videoDetail }) {
  const [user, setUser] = useState(null);
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
    
        if (parsedUser._id) {
          fetchUserChannel(parsedUser._id);
        } else {
          console.log("User ID not found in localStorage");
        }
      }
    }, []);


    
  const fetchUserChannel = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }
  
      const response = await fetch(`http://localhost:5100/user-channel/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `JWT ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return;
      }
  
    } catch (error) {
      console.error("Error fetching user channel:", error);
    }
  };

  const { id } = useParams();
  if (!videoDetail) {
    return <h2 className="text-center text-red-500">Error: Video details not found</h2>;
  }

  const { title, description, channelLogo, channelName, likes, subscribers, videoUrl, commentsCount } = videoDetail;

  const [isLiked, setIsLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  function handleLike() {
    if (!isLiked) {
      setIsLiked(true);
      setDisliked(false); 
    } else {
      setIsLiked(false); 
    }
  }
  
  function handleDislike() {
    if (!disliked) {
      setDisliked(true);
      setIsLiked(false); 
    } else {
      setDisliked(false); 
    }
  }

  const [sidebar, setSidebar] = useState(false);

  function extractYouTubeID(url) {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    return match ? match[1] : "";
  }

  return (
    <>
      <Header setSidebar={setSidebar} sidebar={sidebar} showSignin={false} custom_css="p-2.5" />
      {sidebar && <Sidebar showSigninbtn={false} />}

      <div className="main flex flex-col md:flex-row gap-6 p-4 md:p-10 px-4 md:px-20 mt-12">
        {/* Left Section (Video Player + Details) */}
        <div className="left w-full md:w-[70%]">
          <div className="videodetail">
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeID(videoUrl)}`}
              title={title}
              className="rounded-3xl w-full h-auto aspect-video"
              allowFullScreen
            ></iframe>

            <p className="font-bold text-lg md:text-2xl mt-3">{title}</p>

            {/* Video Actions */}
            <div className="flex flex-row flex-wrap md:flex-row items-start sm:items-center justify-between mt-5 gap-3">

              {/* Channel Info */}
              <div className="flex gap-3 items-center">
                <Link to={`/channel/${id}`} className="flex gap-2.5 items-center">
                  <img src={channelLogo} alt="" className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm md:text-base">{channelName}</p>
                    <p className="text-gray-600 text-xs md:text-sm">{subscribers}</p>
                  </div>
                </Link>
              </div>

              {/* Subscribe & Join Buttons */}
              <div className="flex gap-3">
                <button className="rounded-3xl py-1.5 px-3 bg-gray-200 text-xs md:text-sm">Join</button>
                <button className="rounded-3xl py-1.5 px-3 bg-black text-white text-xs md:text-sm">Subscribe</button>
              </div>

              {/* Like & Dislike Buttons */}
              <div className="likebtns flex gap-5 bg-gray-200 p-1.5 px-3 rounded-3xl">
                <button onClick={handleLike} className="flex items-center gap-1">
                  {isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} <span className="text-sm">{likes}</span>
                </button>
                <div className="w-0 h-7 border text-gray-400"></div>
                <button onClick={handleDislike}>
                  {disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltOutlinedIcon />}
                </button>
              </div>

              {/* Share Button */}
              <button className="rounded-3xl py-1.5 px-3 bg-gray-200 text-xs md:text-sm">
                <ReplyOutlinedIcon /> Share
              </button>
            </div>

            {/* Description */}
            <p className="bg-gray-100 rounded-2xl mt-3 p-2.5 text-sm md:text-base">{description}</p>
          </div>

          {/* Comments Section */}
          <div className="comments mt-6">
            <p className="text-lg md:text-2xl font-semibold">{commentsCount} Comments</p>
            <div className="addcomment mt-3">
              <div className="flex gap-3 items-center">
              {user && user.profileImage ? (
  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl">
    <img 
      src={`http://localhost:5100/uploads/${user.profileImage}`} 
      alt="Profile" 
      className="w-full h-full rounded-full object-cover"
    />
  </div>
) : (
  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl">
    {user?.fullName?.charAt(0).toUpperCase()}
  </div>
)}

                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full focus:outline-none text-sm md:text-base"
                />
              </div>
              <hr className="text-gray-400 mt-2" />
              <div className="comment-btns flex justify-between mt-2">
                <span>
                  <SentimentSatisfiedAltOutlinedIcon />
                </span>
                <span className="flex gap-3">
                  <button className="px-3 py-1 bg-gray-300 rounded-3xl text-xs md:text-sm">Cancel</button>
                  <button className="px-3 py-1 bg-gray-300 rounded-3xl text-xs md:text-sm">Comment</button>
                </span>
              </div>
            </div>
            <div className='text-center mt-10'>Comments are turned off. <span className='text-blue-500'>Learn More</span></div>
          </div>
        </div>

        {/* Right Section (Recommended Videos) */}
        <div className="right w-full md:w-[30%] h-auto md:h-screen overflow-y-auto scrollbar-hide">
          {videos.map((data) => (
            <VideoItem key={data.id} videoDetails={data} />
          ))}
        </div>
      </div>
    </>
  );
}

export default VideoPlayback;

