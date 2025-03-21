import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import videos from "../utlis/mockdata";
import youtubelogo from "../assets/youtube_logo.png";

function Header({ setSidebar, sidebar, custom_css, setFilteredVideos }) {
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(null);
  const [userChannel, setUserChannel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

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
  
      const data = await response.json(); // Parse response as JSON
  
      if (!response.ok) {
        return;
      }
  
      if (data.channelName) {
        setUserChannel({ name: data.channelName, _id: data._id }); // Store as object
      } else {
        setUserChannel(null);
      }
  
    } catch (error) {
      console.error("Error fetching user channel:", error);
    }
  };
  

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:5100/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      setUser(null);
      setShowModal(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  function handleSearch() {
    if (searchText.trim() === "") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className={`flex justify-between px-2.5 p-2 items-center fixed top-0 left-0 w-full z-50 bg-white ${custom_css}`}>
      <div className="logo flex items-center">
        <button onClick={() => setSidebar(!sidebar)}>
          <i className="fa-solid fa-bars text-2xl p-2 hover:bg-gray-200"></i>
        </button>
        <img src={youtubelogo} alt="YouTube Logo" className="w-30 hidden sm:block" />
      </div>
      <div className="flex gap-3 items-center">
        <div className="search border w-full md:sm lg:w-xl h-9 flex items-center justify-between rounded-2xl px-3">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            className="w-[100%] border-none outline-none"
          />
          <button className="bg-gray-100 w-[10%] -mr-3 rounded-r-2xl h-[100%] md:w-[40px] w-[30px]" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <button className="px-3 py-1.5 rounded-[100%] bg-gray-100">
          <i className="fa-solid fa-microphone"></i>
        </button>
      </div>
      {user ? (
        <>
          {/* Toggle modal on click */}
          <button onClick={() => setShowModal(!showModal)}>
            {user.profileImage ? (
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl">
          <img 
  src={`http://localhost:5100/uploads/${user.profileImage}`} 
  alt="Profile" 
  className="w-full h-full rounded-full object-cover"
/>
</div>
):(
  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl">
                    {user.fullName?.charAt(0).toUpperCase()}
                  </div>
                  
)}

          </button>
          {showModal && (
            <div className="fixed inset-0 flex justify-end top-5">
              <div ref={modalRef} className="bg-white shadow-md w-80 p-4 rounded-lg mt-14 mr-4">
                <div className="flex items-center gap-3 p-3 border-b ">

                  {user.profileImage ? (
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl">
                            <img 
                    src={`http://localhost:5100/uploads/${user.profileImage}`} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                  </div>
                  ):(
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl">
                                      {user.fullName?.charAt(0).toUpperCase()}
                                    </div>
                                    
                  )}

                  <div>
                    <p className="font-semibold text-lg">{user.fullName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <ul className="px-4 py-2 flex flex-col gap-2.5">
                {userChannel ? (
                  <li onClick={() => navigate(`/user-channel/${userChannel._id}`)}>View your channel</li>
                ) : (
                  <li onClick={() => navigate("/create-channel")}>Create Channel</li>
                )}
                
                  <li className="hover:bg-gray-100 cursor-pointer">Switch account</li>
                  <li className="hover:bg-gray-100 cursor-pointer text-red-500" onClick={handleLogout}>
                    Sign out
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link to="/signin">
          <button className="text-lg w-[80px] border rounded-4xl hover:bg-blue-100">
            <p className="text-blue-400">
              <i className="fa-regular fa-circle-user"></i>SignIn
            </p>
          </button>
        </Link>
      )}
    </div>
  );
}

export default Header;



