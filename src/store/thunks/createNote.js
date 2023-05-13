import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const createNote = createAsyncThunk('notes/create', async (data) => {
  console.log(data)
  try {
    const res = await axios.post('/api/v1/notes', {
      title: data.title,
      text: data.text
    })
  
    const {title, text, createdAt, id} = res.data.data.data
    return {title, text, createdAt, id}
  } catch(err) {
      throw err.response.data.message
  }
})


export { createNote }