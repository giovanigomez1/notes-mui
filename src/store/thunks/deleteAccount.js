import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const deleteAccount = createAsyncThunk('deleteAccount/user', async (id) => {
  await axios.delete(`/api/v1/notes/${id}`)
  await axios.delete(`/api/v1/users/${id}`)
  console.log(id)
  return true
})


export { deleteAccount }