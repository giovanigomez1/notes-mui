import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const deleteAccount = createAsyncThunk('deleteAccount/user', async (id) => {
  try {
    await axios.delete(`/api/v1/notes?user=${id}`)
    await axios.delete(`/api/v1/users/${id}`)
    console.log(id)
    return true
  } catch(err) {
    console.log(err.response.data.message)
    throw err.response.data.message
  }
})


export { deleteAccount }