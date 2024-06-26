import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux'
 import notificationReducer  from './notificationSlice';

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
   notificationState : notificationReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore ({
  reducer ,
  devTools: process.env.NODE_ENV !== 'production',
  middleware:[thunk]

})

export default  store;
//persistent
//export const persistor =  persistStore(store);