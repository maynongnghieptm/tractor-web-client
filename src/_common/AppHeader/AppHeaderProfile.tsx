import React, { MouseEvent } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import IconArrowDropDown from '@material-ui/icons/ArrowDropDown'
import IconLogout from '@material-ui/icons/ExitToApp'

const AppHeaderProfile: React.FC = () => {
  const history = useHistory()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>()
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }
  function handleClose() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    history.push('/auth/login')
    window.location.reload()
  }

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
        onClose={() => { setAnchorEl(undefined) }}
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
        <MenuItem onClick={handleClose} >
          <ListItemIcon className={classes.profileMenuItemIcon} >
            <IconLogout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  )
}

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
}))

export default AppHeaderProfile
