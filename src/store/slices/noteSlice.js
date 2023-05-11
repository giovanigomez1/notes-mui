import { createSlice } from "@reduxjs/toolkit";
import { resetSearch } from "../actions";
import { fetchNotes } from "../thunks/fetchNotes";
import { createNote } from "../thunks/createNote";
import { logOutUser } from "../thunks/logoutUser";
import { deleteAccount } from "../thunks/deleteAccount";


const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    searchTerm: ''
  },
  reducers: {
    deleteNote(state, action) {
      console.log(action.payload)
      const updated = state.notes.filter(note => note.id !== action.payload)
      state.notes = updated
    },
    editNote(state, action) {
      console.log(action.payload)
      const updated = state.notes.filter(note => note.id !== action.payload.id)
      updated.unshift(action.payload)
      state.notes = updated
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(resetSearch, (state, action) => {
      state.searchTerm = ''
    })
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload
    })
    builder.addCase(createNote.fulfilled, (state, action) => {
      console.log(action.payload)
      state.notes.unshift(action.payload)
    })
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.notes = []
    })
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.notes = []
    })
  }
})



export const { deleteNote, editNote, setSearchTerm} = noteSlice.actions
export const noteReducer = noteSlice.reducer



