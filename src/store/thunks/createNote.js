import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const createNote = createAsyncThunk('notes/create', async (data) => {
  console.log(data)
  try {
    const res = await axios.post('https://notesapi-mui.vercel.app/api/v1/notes', {
      title: data.title,
      text: data.text
    }, {
      SameSite: 'None',
      credentials: 'include',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json'} 
    })
  
    const {title, text, createdAt, id} = res.data.data.data
    return {title, text, createdAt, id}
  } catch(err) {
      throw err.response.data.message
  }
})


export { createNote }