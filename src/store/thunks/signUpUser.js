import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const signUpUser = createAsyncThunk('signup/users', async(user) => {
  const newUser = await axios.post('/api/v1/users/signup', {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    passwordConfirm: user.passwordConfirm
  }, {
    SameSite: 'None',
    credentials: 'include',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json'}
  })
  console.log(newUser)
  return newUser.data.data.user
})


export { signUpUser }