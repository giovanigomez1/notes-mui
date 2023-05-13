import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SaveIcon from '@mui/icons-material/Save';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { editNote, updateNote } from "../store";
import Alert from '@mui/material/Alert';
import { logOutUser } from '../store';



function Note() {


  const {title} = useParams()

  const notes = useSelector((state) => {
    return state.notes.notes
  })

  
  const timerLogout = () => setTimeout(() => {
    dispatch(logOutUser())
  }, 3000);


  const [showEdit, setShowEdit] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editText, setEditText] = useState('')
  const [enableSaveBtn, setEnableSaveBtn] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const handleShowEdit = () => {
    setShowEdit(true)
    setEditTitle(note.title)
    setEditText(note.text)
  }
  
  const handleHideEdit = () => {
    setShowEdit(false)
    setEnableSaveBtn(true)
  }

  const handleChangeTitle = (event) => {
    setEnableSaveBtn(false)
    setEditTitle(event.target.value)
  }

  const handleChangeText = (event) => {
    setEditText(event.target.value)
    setEnableSaveBtn(false)
  }
  

  const handleUpdateNote = () => {
    setShowEdit(false)
    const updatedNote = {
      id: note.id, 
      title: editTitle, 
      text: editText, 
      createdAt: Date.now()
    }
    dispatch(editNote(updatedNote))
    dispatch(updateNote(updatedNote))
    navigate(`../note/${(editTitle).toLowerCase().split(' ').join('-')}`)  
    setEnableSaveBtn(true)
  }

  
  
  const note = notes.find(el => (el.title).toLowerCase() === (title).split('-').join(' '))
  

  return <Box sx={{padding: 2}}>
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, marginTop: 3}}>
      {showEdit ? 
      <>
      <TextField
      label="Title"
      id="outlined-start-adornment"
      sx={{ m: 1, maxWidth: '40ch' }}
      InputProps={{
        startAdornment: <InputAdornment position="start">-</InputAdornment>,
      }}
      value={editTitle}
      onChange={handleChangeTitle}
      />
      <TextField
      label="Text"
      id="outlined-start-adornment"
      multiline
      sx={{ m: 1, maxWidth: '65ch' }}
      InputProps={{
        startAdornment: <InputAdornment position="start">-</InputAdornment>,
      }}
      value={editText}
      onChange={handleChangeText}
      />
    </>
      : 
      <>
        <Typography variant="h6" component="h4" sx={{width: '100%', whiteSpace: 'break-spaces'}}>
          {note?.title}
        </Typography> 
        <Typography variant="paragraph" component="p" sx={{textAlign: 'start', width: '100%'}}>
          {note?.text}
        </Typography>
      </>
      }
    </Box>
    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5}}>
      {showEdit ? 
      <Box sx={{display: 'flex', gap: 1.5}}>
        <Fab color="primary" aria-label="add" sx={{ backgroundColor: 'orangered', '&:hover': {backgroundColor: '#fc9403'}}} onClick={handleHideEdit}>
          <FirstPageIcon/>
        </Fab>
        <Fab color="primary" aria-label="add" sx={{ backgroundColor: 'green'}} onClick={handleUpdateNote} disabled={enableSaveBtn}>
          <SaveIcon />
        </Fab>
      </Box>
       : 
      <Fab color="primary" aria-label="add" sx={{ backgroundColor: 'green'}} onClick={handleShowEdit}>
        <EditIcon/>
      </Fab>
      }
    </Box>
  </Box>
}



export default Note