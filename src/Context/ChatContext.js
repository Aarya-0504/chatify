import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import React, { createContext, useContext, useReducer,} from 'react'
import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

export const ChatContextProvider=({children})=>{

    const {user}=useContext(AuthContext);

    const INITIAL_STATE={
        chatId:null,
        user:""
    }

    const chatReducer=(state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user:action.payload,
                    chatId:user.uid>action.payload.uid?user.uid+action.payload.uid :action.payload.uid+ user.uid
                }

            default:
                return state
        }
    }

    const [state,Dispatch]=useReducer(chatReducer,INITIAL_STATE)

return  (
    
    <ChatContext.Provider value={{data:state,Dispatch}}>
        {children}
    </ChatContext.Provider>)

}

export const CurrentUser=()=>{
    return useContext(ChatContext)
}