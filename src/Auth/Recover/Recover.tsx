import React, { useEffect, useState } from 'react'
import { makeStyles, Button, TextField, Link, Grid } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import axios from '../../_config/AxiosConfig'
import AuthContent from '../_common/AuthContent'
import AuthHeader from '../_common/AuthHeader'


const Recover: React.FC = () => {
  const classes = useStyles()
  const [user, setUser] = useState('')
  const [checkUser, setCheckUser] = useState(false)
  const [email, setEmail] = useState('')
  useEffect(() => {
    console.log(user)
  }, [user])
  const handleSentUser = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    axios.get(`/auth/findUser/${user}`)
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          setCheckUser(true)
        }

      })
      .catch((error) => {
        console.error('Error fetching tractor data:', error);
        alert("Username không tồn tại!")
      })
  }
  const handleSentEmail = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    axios.get(`/auth/findUser/${user}/${email}`,)
      .then((response) => {

        if (response.status === 200) {
     
          alert('Vui lòng kiểm tra email!')
        }

      })
      .catch((error) => {
        alert("Có lỗi xảy ra")
        console.error('Error fetching tractor data:', error);

        alert('Email không trùng khớp')

      })
  }
  return (
    <AuthContent>
      <AuthHeader title={'Recover Password'} />
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="User Name"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => {
            setUser(e.target.value)
          }}
          disabled={checkUser}
        />
        {checkUser && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        )}

        {checkUser ? (
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"

            onClick={handleSentEmail}
          >
            Request Password Reset
          </Button>
        ) : (
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"

            onClick={handleSentUser}
          >
            Enter your User name
          </Button>
        )}

        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/auth/login" variant="body2">
              Back to Login
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/auth/signup" variant="body2">
              Create a new account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthContent>
  )
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default Recover
