# YouTube Clone (MERN Stack)

## Overview
This is a **YouTube Clone** built using the **MERN (MongoDB, Express, React, Node.js) stack**. It allows users to register, log in, create channels, and interact with content through likes and dislikes.


## Features
User Authentication (JWT-based)  
Video Playback  
Channel Creation and Management  
Like & Dislike Functionality  
Responsive UI  
Protected Routes (Authenticated Users Only)  


## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Storage:** Multer (for handling file uploads)


## API Endpoints

### **Authentication**
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login and get a JWT token

### **Channels**
- `POST /api/channel/create-channel` → Create a new channel (Authenticated)
- `GET /api/channel/user-channel/:userId` → Get user’s channel details

### **Likes & Dislikes**
- `POST /api/video/like/:videoId` → Like a video
- `POST /api/video/dislike/:videoId` → Dislike a video
  

## Usage

### Home Page
- Displays video thumbnails and basic details.
- Users can click on a video to watch it.

### User Authentication
- Users can register and log in.
- Authentication is required for some features like creating channels and uploading videos.

### Channel Management
- Logged-in users can create a channel.
- Users with a channel can upload videos with a title, description, and thumbnail.

### Video Playback
- Clicking on a video redirects to the video player page.
- Users can like/dislike videos.
  
### Like & Dislike System
- Users can like or dislike a video (only one action at a time).

### Responsive UI
- The website is designed to work across different screen sizes.

