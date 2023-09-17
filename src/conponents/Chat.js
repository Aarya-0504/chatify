import React from "react";
import Avatar from "../image/sidebar-avatar.jpg";
import camera from "../image/camera.png";
import video from "../image/video-camera.png";
import Messages from "./Messages";
import Input from './Input'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { useContext,useNavigate } from 'react';

const Chat = () => {

  const {user}=useContext(AuthContext)
  const {data}=useContext(ChatContext)
  
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="contact-icons">
          <img src={data.user.photoURL} alt="" style={{ "borderRadius": " 50%" }} />
          <img src={camera} alt="" />
          <img src={video} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    
    </div>
  );
};

export default Chat;
