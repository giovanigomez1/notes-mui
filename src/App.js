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
import Note from "./components/Note";
import NavBar from "./components/NavBar";



function App() {
  return (
    <div>
      <NavBar />
      <Container sx={{marginY: 3}}>
        <BrowserRouter>
          <Box sx={{ marginBottom: 2}}>
            <Typography variant='h4' component="h1" sx={{textAlign: 'center'}}>
              Welcome Gio
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4} sx={{textAlign: 'center'}}>
              <NoteList/>
            </Grid>
            <Grid item xs={12} sm={8} md={8} sx={{textAlign: 'center'}}>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/form" element={<NotesForm /> }/>
                <Route path="/note/:title" element={<Note />}/>
              </Routes>
            </Grid>
          </Grid>
        </BrowserRouter>
      </Container>

    </div>
  )
}


export default App