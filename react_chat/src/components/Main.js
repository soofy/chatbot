import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitMembers } from '../redux/membersSlice';
//import {addToMembers} from '../redux/membersSlice';
import ChatContainer from './ChatContainer';
import { clearDBMessages } from '../redux/notificationSlice';

 
export const Main = ({events, isConnected}) => {
  
  const dispatch = useDispatch();
  const [member, setMember] = useState({});

  const stateMessage = useSelector((state)=>state.notificationState.message)
 
useEffect(() => {
    dispatch(fetchInitMembers());
    
},[dispatch])

const handelJoin = (member)=>{
 // dispatch(addToMembers(member));
  setMember(member);
}
 
const cleanDBMessages = ()=>{
  debugger;
    dispatch(clearDBMessages  ());
    setMember('');

  }

   return (
    <div className='container'>
     <div>
      {isConnected?
     <div>
       use this to Clear the DB<br/> 
       <button onClick={cleanDBMessages} >Clear DB Data</button>
      <div>{stateMessage}</div>
       
     </div> :''}
     </div>

    <div>
        {isConnected?
        <ChatContainer onJoin={handelJoin} user={member} events={events}></ChatContainer>
        :<span>Connecting...</span>}
    </div>
    <div> {member.name?<span> Welcome :{member.name} you are now logged in</span>:''}</div>
  </div>
 
   
  )
}

export default Main;
