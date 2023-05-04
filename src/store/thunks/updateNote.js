import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateNote = createAsyncThunk('notes/update', async (data) => {
  await axios.patch(`http://127.0.0.1:8000/api/v1/notes/${data.id}`, {
    title: data.title,
    text: data.text,
    createdAt: data.createdAt
  })
})


export { updateNote }