import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteNoteDb = createAsyncThunk('delete/note', async (id) => {
  await axios.delete(`/api/v1/notes/${id}`)
})

export { deleteNoteDb }