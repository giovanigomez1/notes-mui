import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"


function Note() {


  const {title} = useParams()
  const {notes} = useSelector((state) => {
    return state.notes
  })


  const note = notes.find(el => el.title === (title).split('_').join(' '))


  return <div>
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
      <Typography variant="h6" component="h4">
        {note.title}
      </Typography>
      <Typography variant="paragraph" component="p" sx={{textAlign: 'start'}}>
        {note.text}
      </Typography>
      
    </Box>
  </div>
}




export default Note