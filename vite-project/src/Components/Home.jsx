import Sidebar from "./Sidebar";
import { Link } from "react-router";
function Home({ sidebar}) {
  const options = [
    "All", "Music", "Game", "Cricket", "Movies", "Gaming", "Television Comedy",
    "News", "Cartoon", "Entertainment", "Dubbing", "Coding", "Podcast",
    "Live", "Football", "React", "Old Hindi Songs", "Data Science"
  ];

  return (
    <>
<div className={`${sidebar ? "w-[calc(100%-230px)] ml-auto" : "w-screen"}`}>
    <div className="flex justify-center">
      <div className="flex flex-col shadow-2xl rounded-xl mt-20 gap-3 p-5">
        <p className="text-center text-2xl font-bold">Sign In to watch videos</p>
        <p className="text-gray-500">Sign in to watch videos, like videos, comment, and subscribe.</p>
        <Link to="/signin" className="flex justify-center">
        <button className="signintext-xl border-1 px-2 rounded-4xl hover:bg-blue-100 my-2 w-fit text-lg">
          <p className=" text-blue-400 "><i className="fa-regular fa-circle-user"></i> Sign In</p>
          </button>
          </Link>
      </div>
    </div>
</div>

   </>
  );
}

export default Home;


