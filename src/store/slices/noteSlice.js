import { createSlice } from "@reduxjs/toolkit";
import { resetSearch } from "../actions";
import { fetchNotes } from "../thunks/fetchNotes";
import { createNote } from "../thunks/createNote";
import { logOutUser } from "../thunks/logoutUser";
import { deleteNoteDb } from "../thunks/deleteNoteDb";
import { deleteAccount } from "../thunks/deleteAccount";
import { updateNote } from "../thunks/updateNote";


const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    searchTerm: '', 
    savingNote: false,
    errorUserNotLogged: ''
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
    builder.addCase(createNote.pending, (state, action) => {
      state.savingNote = true
    })
    builder.addCase(createNote.fulfilled, (state, action) => {
      console.log(action.payload)
      state.notes.unshift(action.payload)
      state.savingNote = false
      state.errorUserNotLogged = ''
    })
    builder.addCase(createNote.rejected, (state, action) => {
      console.log(action.error.message)
      state.errorUserNotLogged = action.error.message
      state.savingNote = false
    })
    builder.addCase(deleteNoteDb.pending, (state, action) => {
      state.errorUserNotLogged = ''
    })
    builder.addCase(deleteNoteDb.rejected, (state, action) => {
      state.errorUserNotLogged = action.error.message
    })
    builder.addCase(updateNote.pending, (state, action) => {
      state.errorUserNotLogged = ''
    })
    builder.addCase(updateNote.rejected, (state, action) => {
      console.log(action.error.message)
      state.errorUserNotLogged = action.error.message
    })

    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.notes = []
      state.errorUserNotLogged = ''
    })
    builder.addCase(deleteAccount.pending, (state, action) => {
      state.errorUserNotLogged = ''
    })
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.notes = []
    })
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.errorUserNotLogged = action.error.message
    })
  }
})



export const { deleteNote, editNote, setSearchTerm} = noteSlice.actions
export const noteReducer = noteSlice.reducer



