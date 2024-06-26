import 'bulma/css/bulma.css';
import React, { useEffect, useState } from 'react';
import Main from './components/Main';
import { socket } from './socket';
import {addToNotifications} from './redux/notificationSlice';
import { useDispatch,  } from 'react-redux';
import './App.css';
 
 
function App() {
 
  const [isConnected, setIsConnected] = useState(socket.connected);
 
  const dispatch = useDispatch();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onNotifyEvent(value) {
   
     // setonNotifyEvent(previous => [...previous, value]);
      dispatch(addToNotifications(value))
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('notification', onNotifyEvent);
    

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('notification', onNotifyEvent);
    };
  }, [dispatch]);

    return (<div>
             <div className='app'>
              {isConnected}
               <Main isConnected={isConnected}/>
             </div>
            </div>);
}

export default App;