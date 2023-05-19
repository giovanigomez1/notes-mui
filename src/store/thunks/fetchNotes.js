import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const fetchNotes = createAsyncThunk('notes/fetch', async (id) => {
  
  try {
    const res = await axios.get(`https://notesapi-mui.vercel.app/api/v1/notes?user=${id}`,
    {
      SameSite: 'None',
      credentials: 'include',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json'} 
    })
    return res.data.data.data
  } catch(err) {
    throw err.response.data.message
  }
})



export { fetchNotes }





