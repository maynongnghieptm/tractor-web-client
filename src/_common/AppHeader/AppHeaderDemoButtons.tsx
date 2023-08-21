import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import IconCode from '@material-ui/icons/Code'
import IconStar from '@material-ui/icons/Star'
import IconDownload from '@material-ui/icons/GetApp'

export interface IAppHeaderDemoButtonsProps {}

const AppHeaderDemoButtons: React.FC<IAppHeaderDemoButtonsProps> = (props) => {
  const classes = useStyles(props)

  return (
    <div className={classes.demo}>

    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  demo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoIcon: {},
  demoName: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      margin: 3,
    },
  },
}))

export default AppHeaderDemoButtons
