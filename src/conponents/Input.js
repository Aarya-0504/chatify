import React, { useContext, useState} from 'react'
import attachment from '../image/attachment.png'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
import { arrayUnion, updateDoc,doc, Timestamp, serverTimestamp } from 'firebase/firestore'
import { db } from '../Firebase'
import { storage } from '../Firebase'
import { uploadBytesResumable,ref,getDownloadURL } from 'firebase/storage'

import {v4 as uuid} from "uuid"
const Input = () => {

  const[text,setText]=useState("")
  const[img,setImg]=useState(null)


  const {user}=useContext(AuthContext)
  const {data}=useContext(ChatContext)

  //console.log(data)
  const handleSend=async ()=>{
    if(img)
    {

      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed', 
  (snapshot) => {
    //console.log("i am caled")
    }
  , 
  (error) => {
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:user.uid,
          Date:Timestamp.now(),
          img:downloadURL
        })
      })

    });
  }
);

    }
    else{

      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:user.uid,
          Date:Timestamp.now()
        })
      }) 



    }

    await updateDoc(doc(db,'userChats',user.uid),{
      [data.chatId+".lastMessage"]:text,
      [data.chatId+".Date"]:serverTimestamp()
    })

    try{
      await updateDoc(doc(db,'userChats',data.user.uid),{
        [data.chatId+".lastMessage"]:text,
        [data.chatId+".Date"]:serverTimestamp()
      })
    }
    catch(error){
      //console.log(error)
    }
    


    setText("")
    setImg(null)
  }

  return (
    <div className='input'>
    <input type="text" className='input-message' placeholder='send a message' value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.code==='Enter') handleSend()}}/>
    <div className="options">
    <input type="file" style={{display:"none"}} id='file' onChange={e=>setImg(e.target.files[0])}/>
    <label htmlFor="file">
    <img src={attachment} alt="" />
    </label>
    <button className='send-btn' onClick={e=>handleSend()} >Send</button>
    </div>

    </div>
  )
}

export default Input
