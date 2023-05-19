import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteNoteDb = createAsyncThunk('delete/note', async (id) => {
  console.log(id)
  try {
    await axios.delete(`https://notesapi-mui.vercel.app/api/v1/notes/${id}`, {
      SameSite: 'None',
      credentials: 'include',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json'} 
    })
    return true
  } catch (err) {
    console.log(err.response.data.message)
    throw err.response.data.message
  }
})

export { deleteNoteDb }