import { useState, useRef, useEffect, Fragment } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography"
import moment from "moment";
import { createTheme, ThemeProvider } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { resetSearch, fetchNotes, deleteNote, deleteNoteDb } from "../store";
import Alert from '@mui/material/Alert';
import { logOutUser } from '../store';


// Customize the size of Typography
const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: 'textSm'
          },
          style: {
            fontSize: 10,
            color: '#9e9e9e'
          }
        }
      ]
    }
  }
})



function NoteList() {

  const dispatch = useDispatch()
  const listConte = useRef()
  const navigate = useNavigate()
  const [noteSelect, setNoteSelect] = useState('')
  const [backBtn, setBackBtn] = useState(false)
  const [addBtn, setAddBtn] = useState(true)
  const [page, setPage] = useState(1);


  const {notes, searchTerm, user, errorUserNotLogged} = useSelector((state) => {
    return {
      notes: state.notes.notes,
      searchTerm: state.notes.searchTerm,
      user: state.user.user,
      errorUserNotLogged: state.notes.errorUserNotLogged
    }
  })

  const [message, setShowMessage] = useState(false)
  const [messageInfo, setMessageInfo] = useState('')
  
  const timerLogout = () => setTimeout(() => {
    dispatch(logOutUser())
  }, process.env.REACT_APP_TIMER);

  useEffect(() => {
    const handler = (event) => {
      if(!listConte.current) return
      if(!listConte.current.contains(event.target)) {
        setNoteSelect('')
      }
    }
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])


  useEffect(() => {
    dispatch(fetchNotes(user.id))
    // eslint-disable-next-line
  }, [])
  

  useEffect(() => {
    if(errorUserNotLogged) {
      setShowMessage(true)
      setMessageInfo(errorUserNotLogged)
      timerLogout()
    }
    // eslint-disable-next-line
  }, [errorUserNotLogged])
    
  const handleChange = (event, value) => {
    setPage(value);
  };
  let totalPages = 0
  
  const pagination = (notes) => {
    const resultsPerPage = 5
    const start = (page - 1) * resultsPerPage
    const end = page * resultsPerPage
    totalPages = Math.ceil((notes.length) / resultsPerPage)  
    return notes.length <= resultsPerPage ? notes : notes.slice(start, end)
  }

  /* The event listener was added only to the list container 
    and then using event propagation we do Dom Traversing to determine the element that was clicked on and 
    dispatch the necessary action. */
  const handleClick = (e) => {
    const ele = e.target
    if(ele.closest('.delete')) {
      const id = ele.closest('.delete').dataset.id
      dispatch(deleteNote(id)) // Delete the note on the notelist in the state.
      dispatch(deleteNoteDb(id)) // Delete the note on the database.
      navigate('/dashboard')
      setNoteSelect('')
      setAddBtn(true)
      setBackBtn(false)
    }
    if(ele.closest('.item')) {
      const title = ele.closest('.item').dataset.title
      navigate(`note/${(title).toLowerCase().split(' ').join('-')}`)
      setNoteSelect(title)
      setBackBtn(true)
      setAddBtn(true)
    }
  }

  const showArrowBtn = () => {
    setBackBtn(!backBtn)
    setAddBtn(true)
    dispatch(resetSearch())
  }

  const showAddBtn = () => {
    setAddBtn(!addBtn)
    setBackBtn(true)
  }

  const searchResults = notes.filter(elem => elem.title.toLowerCase().includes(searchTerm.toLowerCase()))
  const renderNotes = pagination(searchResults).map(note => {
    return (
      <Fragment key={note.id}>
        <ThemeProvider theme={theme}>
          <ListItemButton className={`${noteSelect === note.title ? 'select' : ''}`}>
            <ListItem className="item" data-title={`${note.title}`} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <ListItemText primary={note.title.length < 20 ? note.title : `${note.title.slice(0, 20)}...`}/>
              <Typography variant="textSm" component="p">
                {moment(new Date(note.createdAt) - 1000 * 60 * 60).format("MMM Do YY, hh:mm:ss a")}
              </Typography>
            </ListItem>
            <IconButton aria-label="delete" className="delete" data-id={`${note.id}`}>
              <DeleteIcon/>
            </IconButton>
          </ListItemButton>
        </ThemeProvider>      
      </Fragment>
    )
  })   

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
      {message ? <Alert severity="warning">{messageInfo}</Alert> : ''}
      <List onClick={handleClick} ref={listConte} sx={totalPages > 1 ? {height:'55vh'} : {height: 'auto'}}>
        {Object.entries(notes).length === 0 ? 
        <Typography variant="h5" component='p'>
          No notes yet 
        </Typography>
        : renderNotes}
      </List>
      {/* If there is only 1 page does not show pagination buttons */}
      <Stack spacing={2} sx={{alignSelf: 'center'}}>
        <Pagination count={totalPages === 1 ? 0 : totalPages} hidePrevButton hideNextButton page={page} onChange={handleChange} />
      </Stack>
      <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: 2, marginLeft: 5}}>
        <Link to='/dashboard' className="add_btn">
          {backBtn ? <Fab color="primary" aria-label="add" onClick={showArrowBtn}>
            <ArrowBackIcon />
          </Fab> : ' '}
        </Link>
        <Link to='form' className="add_btn">
          {addBtn ? <Fab color="primary" aria-label="add" onClick={showAddBtn}>
            <AddIcon />
          </Fab> : ' '}
        </Link> 
      </Box>
    </Box>
  )
}

export default NoteList

