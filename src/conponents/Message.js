import React, { useContext } from 'react'
import avatar from '../image/sidebar-avatar.jpg'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'

const Message = ({message}) => {
// console.log
  const {user} =useContext(AuthContext)
  const {data}=useContext(ChatContext)
  return (

    <div className={user.uid==message.senderId ? 'message owner' : 'message'}>
    <div className="messageInfo">
    <img src={user.uid===message.senderId ? user.photoURL : data.user.photoURL} alt="" />
    <span>just now</span>
    </div>
    <div className="messageContent">
    <p>{message.text}</p>
    {message.img && <img src={message.img} alt="" />}
    </div>
    </div>

  )
}

export default Message
