import React, { useContext } from 'react'
import avatar from '../image/sidebar-avatar.jpg'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Firebase'
import { AuthContext } from '../Context/AuthContext'
const Navbar = () => {
  const navigate=useNavigate();
  const {user}=useContext(AuthContext)

  // console.log(user.photoURL)
  return (
    <div className='navbar'>
     <span className="logo">chat box</span>
     <div className="user">
     <img src={user.photoURL} alt="" />
     <span>{user.displayName}</span>
     <button onClick={()=>{
      signOut(auth)
      navigate("/login") 
    }}>log out</button>
     </div>
    </div>
  )
}

export default Navbar
