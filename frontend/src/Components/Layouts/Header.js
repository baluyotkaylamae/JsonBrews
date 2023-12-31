import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { getUser, logout } from '../../utils/helpers';
import './FH.css';
import CoffeeIcon from '@mui/icons-material/Coffee';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
//import { Form, FormControl } from 'react-bootstrap';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: '0 auto', 
  width: '50%', 
  marginRight: '40px', 
  [theme.breakpoints.up('sm')]: {
    width: 'auto', 
  },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const pages = ['Home', 'Products', 'About'];
const settings = ['Profile', 'Orders'];

const Header = ({ cartItems }) => {
  const [cartCount, setCartCount] = useState(cartItems.length);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(getUser()); 
  const userAuthenticated = !!user; 
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser());
    setCartCount(cartItems.length);
  }, [cartItems, userAuthenticated]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Call the logout function to clear user data
    logout();
    setUser(null);
  
    window.location.href = '/';
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#A97155', display: 'flex', justifyContent: 'space-between' }}>
      <Container maxWidth="xl" className='JsonHeader'>
        <Toolbar disableGutters>
          <CoffeeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JSONBREWS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>


          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOOOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
            </Link>
            <Link to="/ProductsPage" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>Products</Button>
            </Link>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              Cart {userAuthenticated && `(${cartItems.length})`}
              </Button>
        </Link>
      </Box>

      {/* <Form className="d-flex me-3">
            <FormControl type="text" placeholder="Search" className="mr-2 custom-font" />
            <Button className="custom-font" variant="outline-dark">Search</Button>
          </Form> */}


      {/* <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        /> */}
      {/* <Search /> */}


      <Box sx={{ flexGrow: 0 }}>
        {userAuthenticated ? (
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user.avatar ? (
                <Avatar
                  src={user.avatar.url}
                  alt={user.name}
                  sx={{ borderRadius: '50%' }} // Apply circular border-radius
                />
              ) : null}
            </IconButton>
          </Tooltip>
        ) : (
          <Link to="/login" className="btn ml-4 Json-BTN" id="login_btn">
            <Button className='Json-BTN'>Login</Button>
          </Link>
        )}
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >

          {settings.map((setting, index) => (
            <MenuItem key={index} onClick={handleCloseUserMenu}>
              {index === 0 ? (
                <Link to="/me" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign="center">{setting}</Typography>
                </Link>
              ) : (
                <Link to="/orders/me" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign="center">{setting}</Typography>
                </Link>
              )}
            </MenuItem>
          ))}

          {user && user.role === 'admin' && (
                <Link to="/dashboard" style={{ textDecoration: 'none' , color: 'inherit' }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </Link>
                )}

          <MenuItem key={4} onClick={handleLogout}>
            <Typography textAlign="center" color="red">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>

    </Toolbar>
      </Container >
    </AppBar >
  );
};

export default Header;