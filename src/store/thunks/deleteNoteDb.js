import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteNoteDb = createAsyncThunk('delete/note', async (id) => {
  console.log(id)
  try {
    await axios.delete(`/api/v1/notes/${id}`)
    return true
  } catch (err) {
    console.log(err.response.data.message)
    throw err.response.data.message
  }
})

export { deleteNoteDb }