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



function NoteList({results}) {

  const dispatch = useDispatch()
  const listConte = useRef()
  const navigate = useNavigate()
  const [noteSelect, setNoteSelect] = useState('')


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


  // The event listener was added only to the list container 
  // and then using event propagation we do Dom Traversing to determine the element that was clicked on
  // and dispatch the necessary action.
  const handleClick = (e) => {
    const ele = e.target
    if(ele.closest('.delete')) {
      dispatch(deleteNote(ele.closest('.delete').dataset.id))
      navigate('/')
      setNoteSelect('')
    }
    if(ele.closest('.item')) {
      navigate(`/note/${ele.closest('.item').dataset.title}`)
      setNoteSelect(ele.closest('.item').dataset.title)
    }
  }


  const renderNotes = results.map(note => {
    return (
      <ListItemButton className={`${noteSelect === note.title ? 'select' : ''}`} key={note.id}>
        <ListItem className="item" data-title={`${note.title}`}>
          <ListItemText primary={note.title.length < 22 ? note.title : `${note.title.slice(0, 20)}...`}/>
        </ListItem>
        <IconButton aria-label="delete" className="delete" data-id={`${note.id}`}>
          <DeleteIcon/>
        </IconButton>
      </ListItemButton>
    )
  })
  

  return (
    <Box sx={{maxHeight: '55vh'}}>
      <List onClick={handleClick} ref={listConte}>
        {renderNotes}
      </List>
    </Box>
  )
}

export default NoteList

