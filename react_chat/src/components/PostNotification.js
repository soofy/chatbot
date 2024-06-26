import React, { useEffect, useState } from 'react'
import { socket } from '../socket';
import { JoinChat } from './JoinChat';

export const PostNotification = ({selectedItem ,user, OnSelectedItem , onJoin}) => {

    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(()=>{
      if(selectedItem)
        setMessage('');
    },[selectedItem])
    
    const handleTextChange = (e)=>{
        setMessage(e.target.value)
    }

    const sendMessage  = () =>{
      if(message.length < 1)
             return;
        const notification =  { 
            time:  new Date() ,
            user ,
            message ,
            reference : selectedItem?selectedItem:null
          }
 
        socket.timeout(500).emit('chat-message', 
            notification , () => {
            setIsLoading(false);
            setMessage('');
            OnSelectedItem('');
          });

    }

    const OnCloseHandle = ()=>{
        OnSelectedItem('');
        setMessage(''); 
    }

    const HandleUserJoin = (user)=>{
        onJoin(user);
    }

  return (
        <div className='new-message'>
            { user.name ? <>
            {selectedItem ? <div className='answerPreview'>{selectedItem.message  } 
            <span className='username' onClick={OnCloseHandle}> close</span></div>: ''} 
            <textarea value={ message } onChange={handleTextChange} cols='100' rows='2'></textarea>
            <button onClick={sendMessage}  disabled={ isLoading }>Send</button>
            </> : <> <span>Please Enter you name to post Questions</span> <JoinChat onJoin={HandleUserJoin} user={user}></JoinChat></>}
            </div>  )
}
