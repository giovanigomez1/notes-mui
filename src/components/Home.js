import Typography from '@mui/material/Typography';
import idea from '../img/idea.gif'
import { Box } from '@mui/material';



function Home() {
  return (
    <Box sx={{marginTop: 4}}>
      <Typography variant='h5' component="h3" sx={{textAlign: 'center'}}>
        What do you think today...
      </Typography>
      <img src={idea} alt="I have an idea" className='idea'/>
    </Box>
  )
}


export default Home