import React from 'react'
import Chat from '../conponents/Chat'
import Sidebar from '../conponents/Sidebar'
function Home() {
  return (
    <div className='home'>
    <div className="container">
    <Sidebar />
    <Chat />
    </div>
     
    </div>
  )
}

export default Home
