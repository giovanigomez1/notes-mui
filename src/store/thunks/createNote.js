import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const createNote = createAsyncThunk('notes/create', async (data) => {
  const res = await axios.post('http://127.0.0.1:8000/api/v1/notes', {
    title: data.title,
    text: data.text
  })

  const {title, text, createdAt, id} = res.data.data.data
  return {title, text, createdAt, id}
})


export { createNote }