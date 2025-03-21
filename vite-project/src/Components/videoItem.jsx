import { Link } from "react-router";
function VideoItem({ videoDetails }) {
    const {id, title, thumbnail, channelName, views, uploaded } = videoDetails;
    
    return (
      <div className="flex flex-col w-full max-w-[350px] rounded-lg p-2 m-2.5 md:flex-row ">
        <Link to={`/login/video/${id}`}>
        <img src={thumbnail} alt={title} className="w-full h-[130px] object-cover rounded-lg" />
        <div className="mt-2">
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-gray-500">{channelName}</p>
          <p className="text-xs text-gray-500">{views} • {uploaded}</p>
        </div>
        </Link>
      </div>
    );
  }
  
  export default VideoItem;
  