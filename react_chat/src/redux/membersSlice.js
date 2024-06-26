import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 

export const fetchInitMembers = createAsyncThunk('postSlice/fetchPosts',  ()=> {
 
   return axios.get('http://localhost:3200/api/employees')
   .then((response)=>  response.data)
   });


const  initialState = {

  loading :false,
  members: [],
  error : ''
};
const slice = createSlice({
    name: 'membersSlice',
    initialState,
    reducers: {
        addToMembers: (state, action) => {
         
        state.members.push(action.payload) ;
      } 
    },
    extraReducers:(builder) => {
      builder.addCase(fetchInitMembers.pending, (state)=>{

        state.loading = true;
      })
      builder.addCase(fetchInitMembers.fulfilled, (state ,action) => {
        
        state.loading = false;
        state.members = action.payload;
      })

      builder.addCase(fetchInitMembers.rejected, (state ,action)=>{

        state.loading = false;
        state.members = [];
        state.message  = action.error.message;
      })
    }
  });


  

export const { addToMembers  } = slice.actions
export default slice.reducer