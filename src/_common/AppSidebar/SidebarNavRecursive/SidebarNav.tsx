import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import IconProfile from '@material-ui/icons/AccountBox'
import IconAdmin from '@material-ui/icons/VpnKey'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import IconQuestionAnswer from '@material-ui/icons/QuestionAnswer'
// import IconNewReleases from '@material-ui/icons/NewReleases'
import IconSettings from '@material-ui/icons/Settings'
import IconGroup from '@material-ui/icons/Group'
import IconPreson from '@material-ui/icons/Person' //

import NavList from './NavList'

export interface ISidebarNavItem {
  name: string
  link?: string
  Icon?: any
  IconClassName?: string
  items?: ISidebarNavItem[]
}

export interface ISidebarNavProps {
  isCollapsed?: boolean
}

const SidebarNav: React.FC<ISidebarNavProps> = (props) => {
  const { isCollapsed } = props
  const classes = useStyles()

  const itemsCore = [
    {
      name: 'Dashboard',
      link: '/administration/dashboard',
      Icon: IconDashboard,
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
        }
      ],
    },
   
  ]

  const itemsTheme = [
    // {
    //   name: 'Why Modular?',
    //   link: '/demo/features',
    //   Icon: IconNewReleases,
    //   IconClassName: classes.iconFeatures,
    // },
    {
      name: 'Docs',
      link: 'https://github.com/modularcode/modular-admin-react/blob/master/README.md',
      Icon: IconLibraryBooks,
      IconClassName: classes.iconDocs,
    },
    {
      name: 'Discuss',
      link: 'https://github.com/modularcode/modular-admin-react/discussions',
      Icon: IconQuestionAnswer,
      IconClassName: classes.iconDiscuss,
    },
  ]

  return (
    <div>
      <List className={classes.navList} disablePadding>
        <ListSubheader disableSticky={true} className={classes.navListHeader}>
         Logo
        </ListSubheader>
        <NavList isCollapsed={isCollapsed} items={itemsCore} />
      </List>
    </div>
  )
}

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
    iconFeatures: {
      color: '#95de3c',
    },
    iconDocs: {
      color: '#f8cda9',
    },
    iconSupporters: {
      color: '#e3b546',
    },
    iconDiscuss: {
      color: '#ccc',
    },
  }),
)

export default SidebarNav
