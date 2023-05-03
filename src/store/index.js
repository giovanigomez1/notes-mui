import { configureStore } from "@reduxjs/toolkit";
import { noteReducer, createNote, deleteNote, editNote, setSearchTerm } from "./slices/noteSlice";
import { resetSearch } from "./actions";


export const store = configureStore({
  reducer: {
    notes: noteReducer,
  }
})


export { createNote, deleteNote, editNote, setSearchTerm, resetSearch }
