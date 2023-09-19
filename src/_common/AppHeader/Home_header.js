import React, { useState, useRef, useEffect } from 'react';

import { AppBar, Toolbar, Typography, IconButton, MenuItem, Popover, Hidden, List, ListItem, ListItemText, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {  Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useHistory } from 'react-router-dom'
import "./Home_header.css"
function Header() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const timerRef = useRef(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [ismousedown, setIsmousedown] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Các mục header sẽ được căn đều
    alignItems: 'center', // Căn giữa dọc cho các mục header

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
    transform: isHeaderHidden ? 'translateY(-120%)' : 'translateY(0)', // Ẩn hoặc hiển thị AppBar
    transition: 'transform 0.5s ease', // Thêm hiệu ứng mượt mà
    // Đổi con trỏ chuột thành bàn tay khi di chuột qua
  };
  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        // Cuộn chuột xuống
        console.log(event.deltaY )
        setIsmousedown(true)

      } else if (event.deltaY < 0) {
        // Cuộn chuột lên
        //setIsHeaderHidden(false)
        console.log(event.deltaY )
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
  const handleMemberClick = (event) => {
    setAnchorEl(event.currentTarget);
    //setPopoverOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopoverOpen(false);
  };

  const handleMouseEnter = (event) => {
    // Xóa bất kỳ setTimeout hiện tại nếu có
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setAnchorEl(event.currentTarget)
    setPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    // Tạo một setTimeout để kiểm tra xem chuột có rời khỏi mục không
    timerRef.current = setTimeout(() => {
      setPopoverOpen(false);
    }, 100); // Sau 100ms, đóng Popover nếu chuột đã rời khỏi mục
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
  return (

      
      <AppBar position="static" style={menuItemStyle}>
        <Toolbar style={headerStyle}>
          <Typography variant="h6" className='app-bar-item'>
            Logo
          </Typography>
          <Hidden mdUp>
            {/* Hiển thị trên điện thoại (kích thước màn hình nhỏ hơn hoặc bằng "md") */}
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>

          </Hidden>
          <Hidden mdDown>
            {/* Hiển thị trên desktop (kích thước màn hình lớn hơn "sm") */}
            <Typography variant="subtitle1" className='app-bar-item homepage'>
              TRANG CHỦ
            </Typography>
            <Typography variant="subtitle1" className='app-bar-item about-us'>
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
                  >
                    <MenuItem onClick={handleSignin}>Đăng nhập</MenuItem>
                    <MenuItem onClick={handleSignup}>Đăng ký</MenuItem>
                  </Popover>
                )}
              </div>
            </Typography>
          </Hidden>

        </Toolbar>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer} style={{ width: '80%', zIndex: 1100 }} disableScrollLock={ true }>
        <Toolbar style={{ background: 'darkgray' }}>
          <Typography variant="h6" >
            Logo
          </Typography>
        </Toolbar>
        <List>
          <ListItem button>
            <ListItemText primary="Trang chủ" />
          </ListItem>
          <ListItem button>
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
            <LockOpenIcon /> {/* Đăng nhập */}
            <ListItemText primary="Đăng nhập" />
          </ListItem>
          <ListItem button onClick={handleSignup}>
            <HowToRegIcon /> {/* Đăng ký */}
            <ListItemText primary="Đăng ký" />
          </ListItem>
        </List>
      </Collapse>
          {/* Thêm các lựa chọn khác tại đây */}
        </List>
      </Drawer>
      </AppBar>
    
  );
}

export default Header;