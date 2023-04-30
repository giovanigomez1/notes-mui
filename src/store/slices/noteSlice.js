import { createSlice } from "@reduxjs/toolkit";



const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: []
  },
  reducers: {
    createNote(state, action) {
      console.log(action.payload)
      // state.notes.push(action.payload)
      state.notes.unshift(action.payload)
    },
    deleteNote(state, action) {
      console.log(action.payload)
      const updated = state.notes.filter(note => note.id !== +action.payload)
      console.log(updated)
      state.notes = updated
    }
  }
})


export const { createNote, deleteNote} = noteSlice.actions
export const noteReducer = noteSlice.reducer



