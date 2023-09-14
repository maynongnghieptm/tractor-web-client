import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import SidebarNav from './Sidebar_nav';

export const AppSidebarProps = {
  isCollapsed: false,
};

const AppSidebar = (props) => {
  console.log('AppSidebar rendered');

  const classes = useStyles(props);

  return (
    <aside className={classes.sidebar}>
      <div className={classes.sidebarBackground} />
      <div className={classes.sidebarBody}>
        <SidebarNav />
      </div>
    </aside>
  );
};

AppSidebar.defaultProps = {
  isCollapsed: false,
};

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    color: theme.sidebar.color,
    background: theme.sidebar.background,
  },
  sidebarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 0,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
  },
  sidebarBody: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  sidebarTitleLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
  },
  logo: {
    color: theme.palette.primary.main,
    zIndex: 10,
  },
  title: (props) => ({
    position: 'relative',
    overflow: 'visible',
    marginLeft: '5px',
    display: props.isCollapsed ? 'none' : 'block',
    fontSize: '1.1rem',
    letterSpacing: '.015em',
  }),
  name: {},
  tagline: {
    fontSize: 8,
    fontWeight: 'bold',
    position: 'absolute',
    top: '100%',
    marginTop: -5,
    background: theme.palette.secondary.main,
    color: '#fff',
    borderRadius: 2,
    padding: '1px 3px',
    right: 0,
  },
}));

export default memo(AppSidebar);
