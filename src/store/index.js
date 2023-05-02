import { configureStore } from "@reduxjs/toolkit";
import { noteReducer, createNote, deleteNote } from "./slices/noteSlice";

export const store = configureStore({
  reducer: {
    notes: noteReducer
  }
})


export { createNote, deleteNote }