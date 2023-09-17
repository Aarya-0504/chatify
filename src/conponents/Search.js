import React, { useContext, useState } from "react";
import { collection, query, where, getDocs, getDoc,doc,setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";
import {AuthContext} from '../Context/AuthContext'

const Search = () => {
  const [userName, setUserName] = useState("");
  const [searchuser, setSearchUser] = useState(null);
  // const [error, setError] = useState(false);

  const {user}=useContext(AuthContext);
 

  const handleSearch = async () => {
    const ref = collection(db, "users");
    const q = query(ref, where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchUser(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSearch();
  };


  const handleSelect=async ()=>{

    //if user doesnt exist in chats collections
    const combinedUid=user.uid>searchuser.uid?user.uid+searchuser.uid :searchuser.uid+ user.uid;

    const docRef = doc(db, "chats",combinedUid);

    try{
      const resp = await getDoc(docRef);
      if(!resp.exists()){
        await setDoc(docRef,{
          messages:[]
        })
      }

      //update the userchats
      //     userchats{
      //    loginUserId:{
      //   combinedUid:{
      // userInfo:{
      //    dn,img,url
      //    },
      // lastmessage:
      // Date:
      // }
      //    }
      //    }

      //update the user details
      await updateDoc(doc(db,"userChats",user.uid),{
        [combinedUid+".userInfo"]:{
          uid:searchuser.uid,
          displayName:searchuser.displayName,
          photoURL:searchuser.photoURL
        },
        [combinedUid+".Date"]:serverTimestamp()
      })

      //update the detaails for that selected user
      await updateDoc(doc(db,"userChats",searchuser.uid),{
        [combinedUid+".userInfo"]:{
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL
        },
        [combinedUid+".Date"]:serverTimestamp()
      })



    }


    catch(error){
      console.log(error)
    }
    
    setSearchUser(null)
    setUserName("")
  }




  return (
    <div className="search">
      <div className="searchform">
        <input
          type="text"
          placeholder="Find a user"
          value={userName}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      {
        searchuser && <div className="userchat"  onClick={()=>handleSelect()}>
          <img src={searchuser.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{searchuser.displayName}</span>
          </div>
        </div>

      }
    </div>
  );
};

export default Search;
