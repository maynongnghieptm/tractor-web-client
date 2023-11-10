import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconArrowDropDown from '@material-ui/icons/ArrowDropDown';
import IconProfile from '@material-ui/icons/AccountBox';
import IconAccount from '@material-ui/icons/AccountBalance';
import IconSettings from '@material-ui/icons/Settings';
import IconLogout from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from "react-router-dom";
const AppHeaderProfile = () => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);


  
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    setAnchorEl(null);
    history.push("/auth/login");
window.location.reload()
  }
const handleCloseAndReload = () => {
    // Đóng menu trước khi chuyển đến trang mới
    handleClose();

    // Sử dụng history để điều hướng đến trang mới và tải lại trang
    
   
  };
  return (
    <div className={clsx('headerProfile', classes.headerProfile)}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="Search"
        className={classes.profileButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
       
        <IconArrowDropDown />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        classes={{
          paper: classes.profileMenu,
        }}
      >
        
      
        <Divider />
        <MenuItem onClick={handleClose} component={Link} >
          <ListItemIcon className={classes.profileMenuItemIcon}>
            <IconLogout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  headerProfile: {
    display: 'inline-flex',
  },
  profileButton: {
    borderRadius: 30,
    fontSize: '1.2rem',
    padding: 8,
  },
  profileAvatar: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  profileName: {
    fontWeight: 500,
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  profileMenu: {
    marginLeft: '-16px',
  },
  profileMenuItemIcon: {
    color: theme.palette.primary.main,
  },
}));

export default AppHeaderProfile;
