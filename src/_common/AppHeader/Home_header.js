import React, { useState, useRef, useEffect } from 'react';

import { AppBar, Toolbar, Typography, IconButton, MenuItem, Popover, Hidden, List, ListItem, ListItemText, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {  Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useHistory, useLocation  } from 'react-router-dom'
import "./Home_header.css"
function Header() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const timerRef = useRef(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [ismousedown, setIsmousedown] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState('')
  const location = useLocation()
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',

  };
  const menuItemStyle = {
    position: 'sticky',

    top: '20px',
    zIndex: '2000',
    width: '80%',
    margin: '30px auto 0',
    borderRadius: '10px',
    background: 'white',
    color: 'black',
    transform: isHeaderHidden ? 'translateY(-200%)' : 'translateY(0)',
    transition: 'transform 0.5s ease', 
  };
  if (window.innerWidth < 900) {
    menuItemStyle.transform = isHeaderHidden ? 'translateY(0)' : 'translateY(0)';
 
  }
  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        //console.log(event.deltaY )
        setIsmousedown(true)

      } else if (event.deltaY < 0) {
        //console.log(event.deltaY )
        setIsmousedown(false)

      }
    };
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
  useEffect(() => {
    if (ismousedown) {
      setIsHeaderHidden(true)
      
    } else {
      setIsHeaderHidden(false)
    }
  }, [ismousedown]);
//console.log(isHeaderHidden)
  

  const handleMouseEnter = (event) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setAnchorEl(event.currentTarget)
   
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {

    }, 100); 
  };
  const handleSignin = () => {
    history.push('/auth/login')


  }
  const handleSignup = () => {
    history.push('/auth/signup')
  }
  const handleChangePage = (pagename) => {
    history.push(`/${pagename}`)
  }
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    // Update the activePage state based on the current location
    const currentPath = location.pathname.substring(1); // Remove the leading '/'
    setPath(currentPath)
    //console.log(currentPath)

   // setActivePage(currentPath);
  }, [location]);
  return (
      <AppBar position="static" style={menuItemStyle} className='header'>
        <Toolbar style={headerStyle}>
          <Typography variant="h6" className='app-bar-item'>
            Logo
          </Typography>
          <Hidden mdUp>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden mdDown>
            <Typography variant="subtitle1" className={`app-bar-item homepage ${path === '' ? 'active' : ''}`} onClick={()=>handleChangePage('')}>
              TRANG CHỦ
            </Typography>
            <Typography variant="subtitle1" className={`app-bar-item about-us ${path === 'about_us' ? 'active' : ''}`} onClick={()=>handleChangePage('about_us')}>
              VỀ CHÚNG TÔI
            </Typography>
            <Typography variant="subtitle1" className='app-bar-item product'>
              SẢN PHẨM
            </Typography>
            <Typography variant="subtitle1" className='app-bar-item contact'>
              LIÊN HỆ
            </Typography>
            <Typography variant="subtitle1" className='app-bar-item appbar-customer'>
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                DÀNH CHO THÀNH VIÊN
                {anchorEl && (
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    style={{zIndex:'2001'}}
                  >
                    <MenuItem onClick={handleSignin}>Đăng nhập</MenuItem>
                    <MenuItem onClick={handleSignup}>Đăng ký</MenuItem>
                  </Popover>
                )}
              </div>
            </Typography>
          </Hidden>

        </Toolbar>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer} style={{ width: '80%', zIndex: 2100 }} disableScrollLock={ true }>
        <Toolbar style={{ background: 'darkgray' }}>
          <Typography variant="h6" >
            Logo
          </Typography>
        </Toolbar>
        <List>
          <ListItem button>
            <ListItemText primary="Trang chủ" />
          </ListItem>
          <ListItem button onClick={()=>handleChangePage('about_us')}>
            <ListItemText primary="Về chúng tôi" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Sản phẩm" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Liên hệ" />
          </ListItem>
          <ListItem button onClick={handleClick}>
        <ListItemText primary="Dành cho thành viên" />
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={handleSignin}>
            <LockOpenIcon />
            <ListItemText primary="Đăng nhập" />
          </ListItem>
          <ListItem button onClick={handleSignup}>
            <HowToRegIcon />
            <ListItemText primary="Đăng ký" />
          </ListItem>
        </List>
      </Collapse>
        </List>
      </Drawer>
      </AppBar>
    
  );
}

export default Header;