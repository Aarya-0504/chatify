import React from 'react'
import '../style.scss'
import { Link } from 'react-router-dom'
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate=useNavigate()
  const handleSubmit= async (e)=>{
    e.preventDefault()

    console.log(e)
    const email=e.target[0].value
    const password=e.target[1].value
 
    try{

      await signInWithEmailAndPassword(auth, email, password)
      // .then((userCredential) => {
      //   const user = userCredential.user;
      //   console.log(user)
        navigate("/")
      // })
      // .catch((error) => {
      //   // const errorCode = error.code;
      //   const errorMessage = error.message;
      //   console.log(errorMessage)
      // });

    }
    catch(error){
      console.log(error)
    }
    
  }

  return (
    <div className='formContainer'>
    <div className="formWrapper">
    <h1 className='logo'>Chat</h1>
    <h1 className='title'>Sign In</h1>
    <form onSubmit={(e)=>handleSubmit(e)}>
    <input type="email" placeholder='email'/>
    <input type="password" placeholder='password'/>
    <button>Sign In</button>
    </form>
    <p>Don't Have an Account ? <Link to='/register' className='login-link'>Register</Link> </p>
    </div>
    
  </div>
  )
}

export default Login
