import underConstruction from '../img/UnderConstruction.jpeg'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link as RouterLink } from 'react-router-dom';


function ForgotPassword() {

  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, flexDirection: 'column'}} >
      <img src={underConstruction} alt="comming_soon" className='comming_soon'/>
      <Box sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: onlySmallScreen ? 'column' : onlyMediumScreen ? 'row' : onlyLargeScreen ? 'row' : 'row',
        gap: onlySmallScreen ? 1 : onlyMediumScreen ? 2 : onlyLargeScreen ? 3 : 4,      
      }}>
        <Typography variant='paragraph' component='p' sx={{textAlign: 'center', fontSize: '1.5rem'}}>
          Sorry!
        </Typography>
        <Link to={'/signup'} variant="body2" component={RouterLink}>
          {"Don't have an account? Sign Up"}
        </Link>
        <Link to={'/'} variant="body2" component={RouterLink}>
          {"Already have an account? Sign in"}
        </Link>
      </Box>


    </Box>
  )
}


export default ForgotPassword