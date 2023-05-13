import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateNote = createAsyncThunk('notes/update', async (data) => {
  try {
    await axios.patch(`/api/v1/notes/${data.id}`, {
      title: data.title,
      text: data.text,
      createdAt: data.createdAt
    })
  } catch (err) {
    throw err.response.data.message
  }
})


export { updateNote }