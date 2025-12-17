import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideDrawer from './sideDrawer';
import { useNavigate } from 'react-router-dom';



export default function ButtonAppBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
  
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
            <SideDrawer/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MoneyOrbit
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}