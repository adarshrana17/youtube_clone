import { useState } from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router";


function App() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <Header setSidebar={setSidebar} sidebar={sidebar} />
      <div className="flex">
        {sidebar && <Sidebar />}
        <Home sidebar={sidebar} />
        <Outlet />
      </div>
    </>
  );
}

export default App;






// import { useState } from "react";
// import Header from "./Components/Header";
// import Sidebar from "./Components/Sidebar";
// import { Outlet } from "react-router";

// function App() {
//   const [sidebar, setSidebar] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage auth state

//   return (
//     <>
//       <Header setSidebar={setSidebar} sidebar={sidebar} />
//       <div className="flex">
//         {sidebar && <Sidebar isAuthenticated={isAuthenticated} />}
//         <div className={`${sidebar ? "w-[calc(100%-230px)] ml-auto" : "w-screen"}`}>
//           <Outlet context={{ isAuthenticated, setIsAuthenticated }} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
