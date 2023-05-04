import { configureStore } from "@reduxjs/toolkit";
import { noteReducer, deleteNote, editNote, setSearchTerm } from "./slices/noteSlice";
import { resetSearch } from "./actions";


export const store = configureStore({
  reducer: {
    notes: noteReducer,
  }
})



export { deleteNote, editNote, setSearchTerm, resetSearch }
export * from './thunks/fetchNotes'
export * from './thunks/createNote'
export * from './thunks/updateNote'
export * from './thunks/deleteNoteDb'