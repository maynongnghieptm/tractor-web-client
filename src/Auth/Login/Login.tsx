import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  makeStyles,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

import AuthHeader from '../_common/AuthHeader'
import AuthContent from '../_common/AuthContent'
import authService from '_services/authService'

const Login: React.FC = () => {
  const classes = useStyles()
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLoginSubmit = (e: any) => {
    try{
      e.preventDefault();
      setIsLoggedIn(true)
      authService.logIn({ username, password, role: 'ADMIN'})
        .then(result => {
          console.log(result)
          if(result.data.code === 200){history.push('/')
          setIsLoggedIn(true)
          localStorage.setItem('accessToken', result.data.data.accessToken)
          localStorage.setItem('userId', result.data.data._id )
        }else if(result.data.code === 500){
          alert('Sai thong tin')
        }else{
          alert('Co loi xay ra')
        }
          
        })
        .catch(err => {
          console.log(err);
        })
      }catch{
        
      }finally{
        setIsLoggedIn(false)
      }
    
  }

  return (
    <AuthContent>
      <AuthHeader title={'Sign In'} />
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLoginSubmit}
        
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/auth/recover" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/auth/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthContent>
  )
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default Login
