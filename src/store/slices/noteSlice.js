import { createSlice } from "@reduxjs/toolkit";
import { resetSearch } from "../actions";

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    searchTerm: ''
  },
  reducers: {
    createNote(state, action) {
      state.notes.unshift(action.payload)
    },
    deleteNote(state, action) {
      console.log(action.payload)
      const updated = state.notes.filter(note => note.id !== +action.payload)
      state.notes = updated
    },
    editNote(state, action) {
      console.log(action.payload)
      state.notes = state.notes.map(note => {
        if(note.id === action.payload.id) {
          return {...note, ...action.payload}
        }
        return note
      })
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(resetSearch, (state, action) => {
      console.log('here ')
      state.searchTerm = ''
    })
  }
})



export const { createNote, deleteNote, editNote, setSearchTerm} = noteSlice.actions
export const noteReducer = noteSlice.reducer



