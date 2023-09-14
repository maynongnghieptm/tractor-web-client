import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import IconProfile from '@material-ui/icons/AccountBox';
import IconAdmin from '@material-ui/icons/VpnKey';
import IconDashboard from '@material-ui/icons/Dashboard';
import IconSettings from '@material-ui/icons/Settings';
import IconGroup from '@material-ui/icons/Group';
import IconPerson from '@material-ui/icons/Person';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const itemsCore = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    Icon: IconDashboard,
  },
  {
    name: 'Auth',
    Icon: IconPerson,
    items: [
      {
        name: 'Login',
        link: '/auth/login',
      },
      {
        name: 'Signup',
        link: '/auth/signup',
      },
      {
        name: 'Recover',
        link: '/auth/recover',
      },
      {
        name: 'Reset',
        link: '/auth/reset',
      },
    ],
  },
  {
    name: 'Account',
    Icon: IconProfile,
    items: [
      {
        name: 'Profile',
        link: '/account/profile',
      },
      {
        name: 'Live Data',
        link: '/account/Livedata',
      },
    ],
  },
  {
    name: 'Administration',
    Icon: IconAdmin,
    items: [
      {
        name: 'Users',
        link: '/administration/users',
        Icon: IconGroup,
      },
      {
        name: 'Tractors',
        link: '/administration/tractors',
        Icon: IconGroup,
      },
    ],
  },
  {
    name: 'Settings',
    link: '/settings',
    Icon: IconSettings,
  },
];

const SidebarNav = () => {
  const classes = useStyles();
  const [isAccountExpanded, setIsAccountExpanded] = useState(false);
  const [isAuthExpanded, setIsAuthExpanded] = useState(false);
  const history = useHistory();

  const handleAccountExpandClick = () => {
    setIsAccountExpanded(!isAccountExpanded);
  };

  const handleAuthExpandClick = () => {
    setIsAuthExpanded(!isAuthExpanded);
  };


  const handleDashboardClick = (destination) => {
    history.push(destination);
  };

  return (
    <div>
    <List className={classes.navList} disablePadding>
      <ListSubheader disableSticky={true} className={classes.navListHeader}>
        Logo
      </ListSubheader>

      <ListItem className={classes.listItem} onClick={handleAccountExpandClick}>
        <IconPerson />
        <ListItemText primary="Account" />
        {isAccountExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={isAccountExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested} onClick={() => handleDashboardClick('/account/profile')}>
            <ListItemText primary="User Information" />
          </ListItem>
          <ListItem className={classes.nested} onClick={() => handleDashboardClick('/account/Livedata')}>
            <ListItemText primary="Real-time Data" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem className={classes.listItem} onClick={handleAuthExpandClick}>
        <IconAdmin />
        <ListItemText primary="Auth" />
        {isAuthExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={isAuthExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested} onClick={() => handleDashboardClick('/auth/recover')}>
            <ListItemText primary="Recover" />
          </ListItem>
          <ListItem className={classes.nested} onClick={() => handleDashboardClick('/auth/reset')}>
            <ListItemText primary="Reset" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem className={classes.listItem}>
        <IconSettings />
        <ListItemText primary="Setting" />
      </ListItem>
    </List>
  </div>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    navList: {
      width: theme.sidebar.width,
      fontSize: '1em',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    navListHeader: {
      textAlign: 'center',
      color: 'rgba(255,255,255,0.5)',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);

export default SidebarNav;
