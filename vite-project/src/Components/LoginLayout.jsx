import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import Login from "./Login";

function LoginLayout() {
  const [sidebar, setSidebar] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState(null);

  return (
    <>
      <Header setSidebar={setSidebar} sidebar={sidebar} setFilteredVideos={setFilteredVideos} filteredVideos={filteredVideos} showModal={true} />
      <div className="flex">
        {sidebar && <Sidebar showSigninbtn={false} />}
        <Login sidebar={sidebar} setSidebar={setSidebar} filteredVideos={filteredVideos} setFilteredVideos={setFilteredVideos} />
        <Outlet />
      </div>
    </>
  );
}

export default LoginLayout;






