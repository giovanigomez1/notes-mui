import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const logOutUser = createAsyncThunk('logout/user', async() => {
  try {
    await axios.get('/api/v1/users/logout')
  } catch(err) {
    throw err.response.data.message
  }
})


export {logOutUser}