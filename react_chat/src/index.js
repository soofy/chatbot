import React from "react";
import   ReactDOM   from "react-dom";
import App from './App'
import Context from "./context/Context";
import {Provider} from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

//use Reducer Hook
let root = document.getElementById("root");
 
ReactDOM.render(

    <React.StrictMode>
        <Provider store={store}>
                <App/>
        </Provider>
    </React.StrictMode>

    // <React.StrictMode>
    // <Provider store={store}>
    //      <PersistGate loading={null} persistor={persistor}>
    //          <App/>
    //      </PersistGate>
    // </Provider>
    // </React.StrictMode>
, root);
 
 
    
 