import React, { useState } from 'react'

export const JoinChat = ({onJoin}) => {

    //const members = useSelector((state)=>state.membersState.members)
    const [member, setMember] = useState('');
    
    //const dispatch = useDispatch();

    const handleClick = ()=>{
      
        onJoin({name : member});
    }

    const handleTextChange = (e)=>{
        setMember(e.target.value)
    }


  return (
    <div className='join-chat'>
        <input type="text" value={member} onChange={handleTextChange}></input>
    <button onClick={handleClick}>join Chat</button></div>
    )
}
