import Home from "./components/Home"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Fab from '@mui/material/Fab';
import NoteList from "./components/NoteList";
import NotesForm from "./components/NotesForm";
import AddIcon from '@mui/icons-material/Add';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { useSelector } from "react-redux";
import Note from "./components/Note";
import NavBar from "./components/NavBar";


function App() {

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  
  let totalPages = 0
  const {notes} = useSelector((state) => {
    return state.notes
  })




  // console.log(notes)
  console.log(totalPages)

  
  const pagination = (notes) => {
    const resultsPerPage = 5
    const start = (page - 1) * resultsPerPage
    const end = page * resultsPerPage
    totalPages = Math.ceil((notes.length) / resultsPerPage)  
    return notes.length <= resultsPerPage ? notes : notes.slice(start, end)
  }
  

  return (
    <div>
      <NavBar />
      <Container sx={{marginY: 5}}>
        <BrowserRouter>
          <Box marginBottom={4}>
            <Typography variant='h4' component="h1" sx={{textAlign: 'center'}}>
              Welcome Gio
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4} sx={{textAlign: 'center'}}>
              <NoteList results={pagination(notes)}/>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                
                {/* If there is only 1 page does not show pagination buttons */}
                <Stack spacing={2}>
                  <Pagination count={totalPages === 1 ? 0 : totalPages} hidePrevButton hideNextButton page={page} onChange={handleChange} />
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={8} sx={{textAlign: 'center'}}>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/form" element={<NotesForm /> }/>
                <Route path="/note/:title" element={<Note />}/>
              </Routes>
            </Grid>
          </Grid>


          <Link to={'/form'}>
            <Fab color="primary" aria-label="add" sx={{textAlign: 'left', marginTop: 4}}>
              <AddIcon />
            </Fab>
          </Link>
        </BrowserRouter>
      </Container>

    </div>
  )
}


export default App