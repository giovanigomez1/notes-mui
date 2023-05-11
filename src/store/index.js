import { configureStore } from "@reduxjs/toolkit";
import { noteReducer, deleteNote, editNote, setSearchTerm } from "./slices/noteSlice";
import { userReducer } from "./slices/userSlice";

import { resetSearch, resetLoginFailMsj } from "./actions";


export const store = configureStore({
  reducer: {
    notes: noteReducer,
    user: userReducer
  }
})



export { deleteNote, editNote, setSearchTerm, resetSearch, resetLoginFailMsj }
export * from './thunks/fetchNotes'
export * from './thunks/createNote'
export * from './thunks/updateNote'
export * from './thunks/deleteNoteDb'
export * from './thunks/loginUser'
export * from './thunks/signUpUser'
export * from './thunks/logoutUser'
export * from './thunks/checkUserLogged'







