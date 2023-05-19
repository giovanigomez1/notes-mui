import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginUser = createAsyncThunk('login/users', async (user) => {
  try {
    const res = await axios.post('https://notesapi-mui.vercel.app/api/v1/users/login', {
      email: user.email,
      password: user.password
    }, {
      SameSite: 'None',
      credentials: 'include',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json'}
    })
    return res.data.data.user
  } catch(err) {
    throw err.response.data.message
  }
})


export {loginUser}





