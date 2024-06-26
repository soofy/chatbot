import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 
export const fetchNotification = createAsyncThunk('notificationSlice/fetchNotification',  (empId)=> {
   return axios.get( `http://localhost:3200/api/messages`)
    .then((response)=>  response.data)
   });

   
   export const clearDBMessages = createAsyncThunk('notificationSlice/clearDBMessages',  (empId)=> {
 
    return axios.delete( `http://localhost:3200/api/messages`)
     .then((response)=>  response.data)
    });
 
   
const  initialState = {

  loading :false,
  notifications: [],
  error : ''
};


const slice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {
      addToNotifications: (state, action) => {
          state.notifications.push(action.payload) ;
      } 
    },
    extraReducers:(builder) => {
      builder.addCase(fetchNotification.pending, (state)=>{

        state.loading = true;
        state.notifications = [];
      })
      builder.addCase(fetchNotification.fulfilled, (state ,action) => {
 
        state.loading = false;
        state.notifications = action.payload;
      })

      builder.addCase(fetchNotification.rejected, (state ,action)=>{

        state.loading = false;
        state.notifications = [];
        state.message  = action.error.message;
      })

      builder.addCase(clearDBMessages.pending, (state)=>{

        state.loading = true;
        state.message  = 'clearing db data  '
      })
      builder.addCase(clearDBMessages.fulfilled, (state ,action) => {
 
        state.loading = false;
        state.message  = 'db cleared please refresh the page'
      })

      builder.addCase(clearDBMessages.rejected, (state ,action)=>{

        state.message  = action.error.message;
      })

    },
     
  });


export const { addToNotifications } = slice.actions
export default slice.reducer