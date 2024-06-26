import React, {   useState } from 'react'
import ChatNotifications from './ChatNotifications';
import { PostNotification } from './PostNotification';
 
export const ChatContainer = ({ user , onJoin}) => {
      
    const [selectedItem, setSelectedItem] = useState();

    const handleQuestionReply = (msg)=>{
        if(user.name)
            setSelectedItem(msg);
    }

  return (
    <div className='chat'>
        <ChatNotifications  onReply={handleQuestionReply} user={user}></ChatNotifications>
        <PostNotification onJoin={onJoin}  OnSelectedItem={setSelectedItem} user={user} selectedItem={selectedItem}></PostNotification>
    </div>
  )
}

export default ChatContainer;
