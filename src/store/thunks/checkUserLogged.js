import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const checkUserLogged = createAsyncThunk('check/user', async () => {
  try {
    const res = await axios.get('/api/v1/users/isLogged', {
    SameSite: 'None',
    credentials: 'include',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json'}
    })
    if(res.data.status !== 'No user logged') {
      return res.data.data.currentUser
    } else {
      return null
    }
  } catch(err) {
    throw err.response.data
  }
})


export {checkUserLogged}