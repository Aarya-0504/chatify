import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../Context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase'
import {v4 as uuid} from 'uuid'
const Messages = () => {

const {data}=useContext(ChatContext)
// console.log(data)

const [messages,setMessages]=useState([]);

useEffect(()=>{
  if(data.chatId){
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data())
  });
  
  return ()=>{
    unsub()
  }
  
  }
  
},[data.chatId])

// console.log((messages))

  return (
    <div className='messages'>

    {
      messages.messages && messages.messages.map((m)=>{
       return <Message message={m} key={uuid()}/>
      })
    }
    
    
    </div>
  )
}

export default Messages
