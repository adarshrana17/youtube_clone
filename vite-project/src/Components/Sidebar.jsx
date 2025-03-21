import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Sidebar({ showSigninbtn = true }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="fixed top-[70px] left-0 bg-white h-[calc(100vh-66px)] w-[230px] overflow-y-auto px-2 pt-3">
      {/* ✅ Dynamic Home Link */}
      <Link to={user ? "/login" : "/"}>
        <p className="sidebar-btn">
          <i className="fa-solid fa-house"></i> Home
        </p>
      </Link>

      <p className="sidebar-btn">
        <i className="fa-solid fa-video"></i> Shorts
      </p>
      <p className="sidebar-btn">
        <i className="fa-solid fa-folder"></i> Subscriptions
      </p>
      <hr className="text-gray-300" />
      {user && (
        <div>
          <Link to={`/user-channel/${user._id}`}>
      <p className="sidebar-btn">
        <i className="fa-regular fa-circle-user"></i> You
      </p>
      </Link>
      <p className="sidebar-btn">
        <i className="fa-solid fa-clock-rotate-left"></i> History
      </p>
      <hr className="text-gray-300" />
      </div>
    )}
      {/* ✅ Show Sign-in Button Only if User is Not Logged In */}
      {showSigninbtn && !user && (
        <div>
          <p>Sign in to watch videos, like videos, comment, and subscribe.</p>
          <Link to="/signin">
            <button className="signintext-xl border-1 px-2 rounded-4xl hover:bg-blue-100 my-2 w-full text-lg">
              <p className="text-blue-400">
                <i className="fa-regular fa-circle-user"></i> Sign In
              </p>
            </button>
          </Link>
        </div>
      )}

      <hr className="text-gray-300" />
      <p className="text-lg font-bold">Explore</p>
      <p className="sidebar-btn">
        <i className="fa-solid fa-fire"></i> Trending
      </p>
      <p className="sidebar-btn">
        <i className="fa-solid fa-music"></i> Music
      </p>
      <p className="sidebar-btn">
        <i className="fa-solid fa-film"></i> Movies
      </p>
      <p className="sidebar-btn">
        <i className="fa-solid fa-wifi"></i> Live
      </p>
      <p className="sidebar-btn">
        <i className="fa-solid fa-gamepad"></i> Games
      </p>
      <p className="sidebar-btn">
        <i className="fa-solid fa-newspaper"></i> News
      </p>
      <p className="sidebar-btn">
        <i className="fa-solid fa-trophy"></i> Sports
      </p>
      <hr className="text-gray-300" />
      <p className="text-lg font-bold">More from YouTube</p>
      <p className="sidebar-btn">
        <i className="fa-brands fa-youtube text-red-600"></i> YouTube Premium
      </p>
      <p className="sidebar-btn">
        <i className="fa-solid fa-music text-red-600"></i> YouTube Music
      </p>
      <hr className="text-gray-300" />
      <p className="sidebar-btn">
        <i className="fa-solid fa-gear"></i> Setting
      </p>
      <p className="sidebar-btn">
        <i className="fa-regular fa-flag"></i> Report History
      </p>
      <p className="sidebar-btn">
        <i className="fa-regular fa-circle-question"></i> Help
      </p>
      <p className="sidebar-btn">
        <i className="fa-regular fa-message"></i> Send Feedback
      </p>
    </div>
  );
}

export default Sidebar;
