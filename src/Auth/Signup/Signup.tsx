import React from 'react'
import authSignup from '_services/authSignup'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
  makeStyles,
  Grid,
  Checkbox,
  Link,
  FormControlLabel,
  TextField,
  Button,
  IconButton, InputAdornment,
} from '@material-ui/core'
import { Link as RouterLink,useHistory } from 'react-router-dom'
import {useState} from 'react'
import AuthContent from '../_common/AuthContent'
import AuthHeader from '../_common/AuthHeader'

const Signup: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false);
 // ..const history = useHistory()
  
 const [fullname, setFullname] = useState("");
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [address, setAddress] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword]= useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      alert('Mật khẩu vừa nhập không giống nhau')
      return;
    }
    try {
      // Gọi hàm signUp từ authService
      const response = await authSignup.signUp({ fullname,username,email,address, password})
      history.push('/auth/login')
      console.log('Signup response:', response.data);     
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
    }
  }
  return (
    <AuthContent>
      <AuthHeader title={'Sign Up'} />
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="fullName"
              variant="outlined"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              onChange={(e) => setFullname(e.target.value)}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="userName"
              label="user Name"
              name="userName"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmpassword"
              
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}

          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/auth/login" variant="body2">
              Already have an account? Sign in
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default Signup
