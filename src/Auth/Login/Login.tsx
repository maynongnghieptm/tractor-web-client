import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  makeStyles,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import axios from '../../_config/AxiosConfig'
import AuthHeader from '../_common/AuthHeader'
import AuthContent from '../_common/AuthContent'
import authService from '_services/authService'
import { useDispatch } from 'react-redux';
import { setIsAdmin, setIsLoggedIn } from '../../store/actions/authActions'

const Login: React.FC = () => {
  const classes = useStyles()
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  
  const handleLoginSubmit = (e: any) => {
    try{
      
      e.preventDefault();
      //setIsLoggedIn(true)
      authService.logIn({ username, password})
        .then(result => {
         // console.log(result)
          if(result.data.code === 200){
            localStorage.setItem('accessToken', result.data.data.accessToken)
            localStorage.setItem('userId', result.data.data._id )
              axios.get(`/users/${result.data.data._id}`)
                .then(response => {
                 // console.log(response.data.data.role)
                  if(response.data.data.role=='USER'){
                    //dispatch(setIsLoggedIn(true));
                    dispatch({ type: 'SET_ADMIN', isAdmin: false });

// Thay đổi giá trị của isLoggedIn
dispatch({ type: 'SET_LOGGED_IN', isLoggedIn: true })
                  //  dispatch(setIsLoggedIn(true))
                   history.push('/user/dashboard')
                  } else if(response.data.data.role=='ADMIN')
                  {
                    dispatch({ type: 'SET_ADMIN', isAdmin: true });

                    // Thay đổi giá trị của isLoggedIn
                    dispatch({ type: 'SET_LOGGED_IN', isLoggedIn: true })
                    history.push('/administration')
                  }
                  else{
                    console.log('Co loi xay ra')
                  }
                  
                })
                .catch(error => {
                  console.error('Error fetching user data:', error);
                });

            //history.push('/dashboard')
          setIsLoggedIn(true)
        
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
          label="Tài khoản"
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
          label="Mật khẩu"
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
          ĐĂNG NHẬP
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/auth/recover" variant="body2">
              Quên mật khẩu?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/auth/signup" variant="body2">
              Chưa có tài khoản? Đăng kí
            </Link>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center">
      <Link  component={RouterLink} to="/" variant="body2">
        Quay lại trang chủ
      </Link>
    </Typography>

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
