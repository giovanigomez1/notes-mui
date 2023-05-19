import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/loginUser";
import { signUpUser } from "../thunks/signUpUser";
import { resetLoginFailMsj } from "../actions";
import { logOutUser } from "../thunks/logoutUser";
import { checkUserLogged } from "../thunks/checkUserLogged";
import { deleteAccount } from "../thunks/deleteAccount";


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    logingFailed: false,
    signUpUserFailed: false,
    checkingUser: false,
    loadingLogin: false,
    loadingSignup: false,
    creatingUserErrorMsj: '',
    tooManyRequests: ''
  },
  reducers: {
    userLogged(state, action) {
      state.user = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state, action) => {
      state.logingFailed = false
      state.loadingLogin = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.logingFailed = false
      state.loadingLogin = false
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.logingFailed = true
      state.loadingLogin = false
    })
    
    builder.addCase(signUpUser.pending, (state, action) => {
      state.signUpUserFailed = false
      state.loadingSignup = true
      state.creatingUserErrorMsj = ''
    })
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      // console.log(action.payload)
      state.user = action.payload
      state.signUpUserFailed = false
      state.loadingSignup = false
      state.creatingUserErrorMsj = ''
    })
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.signUpUserFailed = true
      state.loadingSignup = false
      state.creatingUserErrorMsj = action.error.message
    }) 

    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.user = null
    })

    builder.addCase(resetLoginFailMsj, (state, action) => {
      state.logingFailed = false
      state.creatingUserErrorMsj = ''
    })

    builder.addCase(checkUserLogged.pending, (state, action) => {
      state.checkingUser = true
    })
    builder.addCase(checkUserLogged.fulfilled, (state, action) => {
      // console.log(action.payload)
      if(action.payload !== null) state.user = action.payload
      state.checkingUser = false
    })
    builder.addCase(checkUserLogged.rejected, (state, action) => {
      state.checkingUser = false
      state.tooManyRequests = action.error.message
    })
    
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.user = null
    })
  }
})


export const userReducer = userSlice.reducer

