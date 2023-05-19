import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const logOutUser = createAsyncThunk('logout/user', async() => {
  try {
    await axios.get('https://notesapi-mui.vercel.app/api/v1/users/logout',
    {
      SameSite: 'None',
      credentials: 'include',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json'} 
    }
    )
  } catch(err) {
    throw err.response.data.message
  }
})


export {logOutUser}