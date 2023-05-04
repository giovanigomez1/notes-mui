import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import { createTheme, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { createNote } from '../store';
import { useDispatch } from 'react-redux';



const theme = createTheme({
  components: {
    MuiFab: {
      variants:[
        {
          props: {
            variant: 'align-left'
          },
          style: {
            position: 'absolute',
            right: '5%'
          }
        }
      ]
    }
  }
})



function NotesForm() {

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [message, setShowMessage] = useState(false)

  const timer = () => setTimeout(() => {
    setShowMessage(false)
  }, 3000);


  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleText = (e) => {
    setText(e.target.value)
  }


  const saveNote = () => {
    if(title === '' || text === '') {
      setShowMessage(true)
      timer()
    } else {
      setShowMessage(false)
      dispatch(createNote({title, text}))
      setTitle('')
      setText('')
    }
  }


  return <Box sx={{padding: 1}}>
    <ThemeProvider theme={theme}>
      {message ? <Alert severity="warning">Uh oh, plese complete the fields before saving the note!</Alert> : ''}
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 5}}>
        <TextField variant='standard'  label='Title' sx={{width: '100%'}} onChange={handleTitle} value={title} required/>
        <TextField variant='standard' multiline rows={4} label='Type here what you think' sx={{width: '100%'}} onChange={handleText} value={text} required/>
      </Box>
      <Fab color="primary" aria-label="add" variant='align-left' sx={{marginTop: 5, alignSelf: 'flex-end', backgroundColor: 'red', '&:hover': {backgroundColor: 'orangered'}}} onClick={saveNote}>
        <SaveIcon />
      </Fab>
    </ThemeProvider>
  </Box>
}


export default NotesForm