import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const checkUserLogged = createAsyncThunk('check/user', async () => {
  try {
    const res = await axios.get('http://192.168.1.100:8000/api/v1/users/isLogged', {
    SameSite: 'None',
    credentials: 'include',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json'}
    })
    console.log(res.data)
    if(res.data.status !== 'No user logged') {
      return res.data.data.currentUser
    } else {
      return null
    }
  } catch(err) {
    throw err.response.data.message
  }
})


export {checkUserLogged}