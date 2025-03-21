import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Router } from 'react-router'
import { SignIn } from './Components/SignIn.jsx'
import { RouterProvider } from 'react-router-dom'
import LoginLayout from './Components/LoginLayout.jsx'
import SignUp from './Components/Signup.jsx'
import Video from './Components/Video.jsx'
import Login from './Components/Login.jsx'
// import Profile from './Components/Profile.jsx'
import ProfilePage from './Components/ProfilePage.jsx'
import CreateChannel from './Components/CreateChannel.jsx'
import MyChannel from './Components/MyChannel.jsx'

const appRouter = createBrowserRouter([
  {
   path:"/",
   element:<App />
  },

  {
    path:"/signin",
    element:<SignIn />
  },
   {
     path:"/signup",
     element:<SignUp />
   },{
    path: "/login/video/:id", 
    element: <Video />,
  },
  {
    path:"/login",
    element:<LoginLayout />
  },
  {
    path:"/sign-home",
    element:<App />
  },
  {
    path:"/login-home",
    element:<Login />
  },

  {
    path:"/channel/:id",
    element:<ProfilePage />
  },{
    path:"/create-channel",
    element:<CreateChannel />
  },
  {
    path:"/user-channel/:id",
    element: <MyChannel />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)

