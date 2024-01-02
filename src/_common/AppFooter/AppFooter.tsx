import React, { memo } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

type AppFooterProps = {}

const AppFooter: React.FC<AppFooterProps> = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="left">
        {`Tractor checking`}{' '}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="right">
        {'Built by SMS Team'}
      </Typography>
    </footer>
  )
}
const useStyles = makeStyles((theme) => ({
  footer: {
    width:'100%',
    display: 'flex',
    background: '#fff',
    padding: '0.5rem 1rem',
    justifyContent: 'space-between',
  },
}))

export default memo(AppFooter)
