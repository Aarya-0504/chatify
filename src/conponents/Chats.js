import React, { useContext, useEffect, useState } from "react";
import avatar from "../image/sidebar-avatar.jpg";
import { AuthContext } from "../Context/AuthContext";
import {ChatContext} from "../Context/ChatContext"
import { onSnapshot,doc } from "firebase/firestore";
import { db } from "../Firebase";

const Chats = () => {
  
  const {user}=useContext(AuthContext)
  const {Dispatch}=useContext(ChatContext)

  const [chatList,setchatList]=useState([]);


  useEffect(()=>{
    const getChats=()=>{
      const unsub = onSnapshot(doc(db, "userChats",user.uid), (doc) => {
        setchatList(doc.data())
      });
      return ()=>{
        unsub();
      }
    }

    user.uid && getChats()
    
  },[user.uid])

  const handleSelect=(chat)=>{

    Dispatch({
      type:"CHANGE_USER",
      payload:chat
    })
  }

  // console.log(Object.entries(chatList))
  return ( <div className="chats">
    {
      Object.entries(chatList).sort((a,b)=>a.Date-b.Date).map((chat)=>(
        <div className="userchat" key={chat[0]} onClick={e=>handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage}</p>
        </div>
      </div>
      ))
    }
    </div>
  );
};

export default Chats;
