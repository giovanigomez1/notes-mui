import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import { createTheme, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { createNote } from '../store';
import { useDispatch, useSelector } from 'react-redux';


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
  const [messageInfo, setMessageInfo] = useState('')

  const timer = () => setTimeout(() => {
    setShowMessage(false)
  }, 3000);

  
  
  const savingNote = useSelector((state) => {
    return state.notes.savingNote
  })
  
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleText = (e) => {
    setText(e.target.value)
  }
  
  
  const saveNote = () => {
    if(title === '' || text === '') {
      setShowMessage(true)
      setMessageInfo('Uh oh, plese complete the fields before saving the note!')
      timer()
    } else {
      setShowMessage(false)
      dispatch(createNote({title, text}))
      setTitle('')
      setText('')
    }
  }


  return <Box sx={{padding: 1}}>
    {message ? <Alert severity="warning">{messageInfo}</Alert> : ''}
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 5}}>
        <TextField variant='standard'  label='Title' sx={{width: '100%'}} onChange={handleTitle} value={title} required/>
        <TextField variant='standard' multiline rows={4} label='Type here what you think' sx={{width: '100%'}} onChange={handleText} value={text} required/>
      </Box>
      <Fab color="primary" aria-label="add" variant='align-left' sx={{marginTop: 5, alignSelf: 'flex-end', backgroundColor: 'orangeRed', '&:hover': {backgroundColor: 'orangered'}}} onClick={saveNote}> 
        {savingNote ? <div className='loader'></div> : <SaveIcon/>} 
      </Fab>
    </ThemeProvider>
  </Box>
}


export default NotesForm
