import React from 'react'
import videos from '../utlis/mockdata';
import Profile from './Profile';
import { useParams } from 'react-router';

function ProfilePage() {
    const {id} = useParams();
    const channel = videos.filter((user) => user.id == id);    
  return (
    <div>
      {channel.map((data) => (
         <Profile key={data.id} channelDetails={data}/>
     ))}
    </div>
  )
}

export default ProfilePage;

