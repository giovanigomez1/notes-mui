import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const fetchNotes = createAsyncThunk('notes/fetch', async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/v1/notes')
    console.log(res.data.data.data)
    return res.data.data.data
  } catch(err) {
    console.log(err.message)
  }
})



export { fetchNotes }






/*
The shinning is an horror movie made on 1978, the story happens on a hotel that is on the hill and during 
winter it is closed because the rates to keep the roads open and heat the complete venue are very hight,
that is why the owners of the hotel hires a single man with his family to take care of the hotel in 
complete isolation during the complete winter season, but something very strange happens in the hotel,
and the family will found that it is not a simple job and a quiet place, the will need to face dangerous 
situations that will test the union of the family. 
*/

