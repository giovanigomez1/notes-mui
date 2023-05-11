import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const logOutUser = createAsyncThunk('logout/user', async() => {
  
  const res = await axios.get('/api/v1/users/logout')

  console.log(res)
})


export {logOutUser}