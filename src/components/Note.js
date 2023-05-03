import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SaveIcon from '@mui/icons-material/Save';
import { editNote } from "../store";



function Note() {


  const {title} = useParams()
  const {notes} = useSelector((state) => {
    return state.notes
  })

  const [showEdit, setShowEdit] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editText, setEditText] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleShowEdit = () => {
    setShowEdit(true)
    setEditTitle(note.title)
    setEditText(note.text)
  }
  
  const handleChangeTitle = (event) => {
    setEditTitle(event.target.value)
  }

  const handleChangeText = (event) => {
    setEditText(event.target.value)
  }
  

  const handleUpdateNote = () => {
    setShowEdit(false)
    dispatch(editNote({id: note.id, title: editTitle, text: editText}))
    navigate(`/note/${(editTitle).split(' ').join('_')}`)  }
  

  
  const note = notes.find(el => el.title === (title).split('_').join(' '))
  

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
        {note.title}
      </Typography> 
      <Typography variant="paragraph" component="p" sx={{textAlign: 'start', width: '100%'}}>
        {note.text}
      </Typography>
      </>
      }
    </Box>
    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5}}>
      {showEdit ? <Fab color="primary" aria-label="add" sx={{ backgroundColor: 'green'}} onClick={handleUpdateNote}>
        <SaveIcon />
      </Fab> : 
      <Fab color="primary" aria-label="add" sx={{ backgroundColor: 'green'}} onClick={handleShowEdit}>
        <EditIcon />
      </Fab>
      }
    </Box>
  </Box>
}




export default Note