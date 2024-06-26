import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchNotification  } from '../redux/notificationSlice';
import { Notification } from './Notification';

 export const ChatNotifications = ({user , onReply}) => {

const notifications = useSelector((state)=>state.notificationState.notifications)
const dispatch = useDispatch();
 
useEffect(() => {
    dispatch(fetchNotification());
    
},[dispatch])

useEffect(() => {
  scollToRef.current.scrollIntoView()
  
},[notifications])


const scollToRef = useRef();
 

  return (
    <div className='chat-room'>


     {
      notifications.map((event, index) =>
        <div>
            <Notification message={event} user={user}  onReply={onReply} key={index}></Notification>
        </div>
      )
    }
     <div ref={scollToRef}></div>
     </div>
  )
}

export default ChatNotifications;
