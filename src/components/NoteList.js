import { useState, useRef, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from "react-redux";
import { deleteNote } from "../store";
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
  const {notes} = useSelector((state) => {
    return state.notes
  })

  
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


  // The event listener was added only to the list container 
  // and then using event propagation we do Dom Traversing to determine the element that was clicked on
  // and dispatch the necessary action.
  const handleClick = (e) => {
    const ele = e.target
    if(ele.closest('.delete')) {
      const id = ele.closest('.delete').dataset.id
      dispatch(deleteNote(id))
      navigate('/')
      setNoteSelect('')
      setAddBtn(true)
      setBackBtn(false)
    }
    if(ele.closest('.item')) {
      const title = ele.closest('.item').dataset.title
      navigate(`/note/${(title).split(' ').join('_')}`)
      setNoteSelect(title)
      setBackBtn(true)
      setAddBtn(true)
      
    }
  }

  const showArrowBtn = () => {
    setBackBtn(!backBtn)
    setAddBtn(true)
  }

  const showAddBtn = () => {
    setAddBtn(!addBtn)
    setBackBtn(true)
  }


  const renderNotes = pagination(notes).map(note => {
    return (
      <ThemeProvider theme={theme} key={note.id}>
        <ListItemButton className={`${noteSelect === note.title ? 'select' : ''}`}>
          <ListItem className="item" data-title={`${note.title}`} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <ListItemText primary={note.title.length < 22 ? note.title : `${note.title.slice(0, 20)}...`}/>
            <Typography variant="textSm" component="p">
              {moment(new Date(note.id - 1000 * 60 * 60)).format("MMM Do YY, hh:mm:ss a")}
            </Typography>
          </ListItem>
          <IconButton aria-label="delete" className="delete" data-id={`${note.id}`}>
            <DeleteIcon/>
          </IconButton>
        </ListItemButton>
      </ThemeProvider>      
    )
  }) 
  

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
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
        <Link to='/' className="add_btn">
          {backBtn ? <Fab color="primary" aria-label="add" onClick={showArrowBtn}>
            <ArrowBackIcon />
          </Fab> : ' '}
        </Link>
        <Link to='/form' className="add_btn">
          {addBtn ? <Fab color="primary" aria-label="add" onClick={showAddBtn}>
            <AddIcon />
          </Fab> : ' '}
        </Link> 
      </Box>
    </Box>
  )
}

export default NoteList

