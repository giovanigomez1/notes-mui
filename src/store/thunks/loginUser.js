import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginUser = createAsyncThunk('login/users', async (user) => {
  console.log(user)
  const res = await axios.post('/api/v1/users/login', {
    email: user.email,
    password: user.password
  }, {
    SameSite: 'None',
    credentials: 'include',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json'}
  })
  console.log(res)
  return res.data.data.user
})


export {loginUser}





