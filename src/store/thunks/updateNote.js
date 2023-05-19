import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateNote = createAsyncThunk('notes/update', async (data) => {
  try {
    await axios.patch(`https://notesapi-mui.vercel.app/api/v1/notes/${data.id}`, {
      title: data.title,
      text: data.text,
      createdAt: data.createdAt
    }, {
      SameSite: 'None',
      credentials: 'include',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json'} 
    })
  } catch (err) {
    throw err.response.data.message
  }
})


export { updateNote }