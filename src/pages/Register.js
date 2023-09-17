import React from 'react'
import '../style.scss'
import logo from '../image/gallery-logo.jpeg'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage,db } from '../Firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link,useNavigate } from 'react-router-dom';


const Register = () => {

  const navigate=useNavigate()
  const handleSubmit= async (e)=>{
    e.preventDefault()
    const displayName=e.target[0].value
    const email=e.target[1].value
    const password=e.target[2].value
    const file=e.target[3].files[0]
    // console.log(file)
    try{
      const resp=await createUserWithEmailAndPassword(auth, email, password)
      console.log(resp.user)
      

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // const downLoadurl="";
      uploadTask.on('state_changed', 
  (snapshot) => {
    console.log("i am caled")
    }
  , 
  (error) => {
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateProfile(resp.user,{
        displayName,
        photoURL:downloadURL
      })

      await setDoc(doc(db,"users",resp.user.uid),{
        uid:resp.user.uid,
        displayName,
        email,
        photoURL:downloadURL
      })

      await setDoc(doc(db,"userChats",resp.user.uid),{})

      navigate("/")

    });
  }
);

    }
    catch(err){
      console.log(err)
    }
  }


  return (
    <div className='formContainer'>
    <div className="formWrapper">
    <h1 className='logo'>Chat</h1>
    <h1 className='title'>Register</h1>
    <form onSubmit={(e)=>handleSubmit(e)}>
    
    <input type="text" placeholder='Username'/>
    <input type="email" placeholder='email'/>
    <input type="password" placeholder='password'/>
    
    <input  style={{display:"none"}} type="file" id='file'/>
    
    <label htmlFor="file"><img src={logo} alt="" /> Add profile</label>
    <input type='submit' className='Register-submit-btn'/>Sign Up
    </form>
    <p>Already Have an Account ? <Link to='/login'>Login</Link> </p>
    </div>
    
  </div>
  )
}

export default Register
