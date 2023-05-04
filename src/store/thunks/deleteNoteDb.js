import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteNoteDb = createAsyncThunk('delete/note', async (id) => {
  await axios.delete(`http://127.0.0.1:8000/api/v1/notes/${id}`)
})

export { deleteNoteDb }