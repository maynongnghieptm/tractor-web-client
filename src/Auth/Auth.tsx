import React from 'react'
import { Route, match as Match } from 'react-router-dom' //
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Box } from '@material-ui/core/'
import Login from './Login'
import Signup from './Signup'
import Recover from './Recover'
import Change_pass from './Recover/Change_password'
const AuthFooter = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
    </Typography>
  )
}

export type AuthProps = {
  match: Match
}

const Auth: React.FC<AuthProps> = ({ match }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={12} md={4} className={classes.formSection}>
        <Box p={2}>
          <Route path={`${match.path}/login`} component={Login} />
          <Route path={`${match.path}/signup`} component={Signup} />
          <Route path={`${match.path}/recover`} component={Recover} />
          <Route path={`${match.path}/changepassword`} component={Change_pass} />
          <Box mt={8}>
            <AuthFooter />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={8} className={classes.introSection}></Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
  },
  formSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/smartfarming.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

export default Auth;
