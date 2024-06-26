import React from 'react'
import { FaRobot } from "react-icons/fa";


export const Notification = ({user ,message, onReply}) => {

  const OnReplyHandle = ()=>{
    onReply(message);
  }
  return (
    <div className='notification'>
     {message.user.name === '' ?
      <div className='username bot'> {message.user?message.user.name:''} { message.user.name === ''?<FaRobot></FaRobot>:''}  <span className='time'>{message.time}</span> </div> 
     :
     <div className='username'> {message.user?message.user.name:''}    <span className='time'>{message.time}</span> </div> 
      }
        {message.reference?<div className='answerPreview'><div className='username'>{message.reference.user.name}</div> {message.reference.message}</div> : '' } 
       <div> {message.message} {message.user.name!=='' && message.user.name !== user.name ? <span className='reply' onClick={OnReplyHandle}> reply</span> : ''}</div>
    </div>
  )
}
