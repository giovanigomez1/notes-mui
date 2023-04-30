import { configureStore } from "@reduxjs/toolkit";
import { noteReducer, createNote, deleteNote } from "./slices/noteSlice";
import { resetPagination } from "./actions";

export const store = configureStore({
  reducer: {
    notes: noteReducer
  }
})


export { createNote, deleteNote, resetPagination }