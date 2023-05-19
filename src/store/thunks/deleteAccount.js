import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const deleteAccount = createAsyncThunk('deleteAccount/user', async (id) => {
  try {
    await axios.delete(`https://notesapi-mui.vercel.app/api/v1/notes?user=${id}`, {
      SameSite: 'None',
      credentials: 'include',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json'} 
    })
    await axios.delete(`https://notesapi-mui.vercel.app/api/v1/users/${id}`, {
      SameSite: 'None',
      credentials: 'include',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json'} 
    })
    return true
  } catch(err) {
    throw err.response.data.message
  }
})


export { deleteAccount }