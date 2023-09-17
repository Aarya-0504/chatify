import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthContextProvider=({children})=>{

    const [user,setUser]=useState({});
useEffect(()=>{
    const unsub=onAuthStateChanged(auth,(user)=>{
        setUser(user)
    })

    return ()=>{
        unsub()
    }
},[])

return  (
    
    <AuthContext.Provider value={{user}}>
        {children}
    </AuthContext.Provider>)

}

export const CurrentUser=()=>{
    return useContext(AuthContext)
}