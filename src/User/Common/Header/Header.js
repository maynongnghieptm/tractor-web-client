import React, { memo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import IconMenu from '@material-ui/icons/Menu';
import AppHeaderProfile from './Header_noti';

export const AppHeaderProps = {
  onToggleClick: () => {},
};

const AppHeader = ({ onToggleClick }) => {
  console.log('AppHeader rendered');

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Toggle sidebar"
          onClick={onToggleClick}
          className={clsx(classes.menuButton)}
        >
          <IconMenu />
        </IconButton>
       
        <div className={classes.actions}>
          <AppHeaderProfile />
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    background: '#fff',
    color: '#7b7b7b',
    boxShadow: 'none',
  },
  toolbar: {},
  menuButton: {},
  actions: {
    marginLeft: 'auto',
    alignItems: 'center',
    display: 'flex',
  },
  notificationsButton: {
    marginRight: 23,
  },
  title: {
    flexGrow: 1,
  },
}));

export default memo(AppHeader);