import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Grid,
  Link,
  TextField,
  Button,
  IconButton, InputAdornment,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import axios from '../../_config/AxiosConfig';
import AuthContent from '../_common/AuthContent';
import AuthHeader from '../_common/AuthHeader';

const Change_pass = () => {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [showpw, setShowpw] = useState(true)
  const [showcf, setShowcf] = useState(true)
  const url = window.location.hash;
  const codeIndex = url.indexOf('code=');

  useEffect(() => {
    if (codeIndex !== -1) {
      const code = url.substring(codeIndex + 5);
      setCode(code);

      const usernameIndex = url.indexOf('/auth/changepassword/');

      if (usernameIndex !== -1) {
        const username = url.substring(usernameIndex + 21, codeIndex - 1);
        setUsername(username);
      }
    }
  }, [url, codeIndex]);

  const handleSubmit = async () => {
    if (password !== confirm) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('code', code);
    formData.append('password', password);

    const formDataJSON: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataJSON[key] = value;
    });
    try {
      const response = await axios.put(`/auth/changepassword/${username}`, formDataJSON, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        alert("Cập nhật mật khẩu thành công!")
      }
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400: {
            alert('Đường dẫn không tồn tại')
            break
          };
          case 401: {
            alert('Đường dẫn đã được sử dụng')
            break
          };
          case 402: {
            alert('Đường dẫn đã hết hạn')
            break
          }
        }
      }
    }
  };
  return (
    <AuthContent>
      <AuthHeader title={'Recover Password'} />
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type={showpw ? "password" : "text"}
          id="New Password"
          label="New Password "
          name="newpassword"
          autoComplete="newpassword"
          autoFocus
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowpw(!showpw)}
                  edge="end"
                >
                  {showpw ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="confirm"
          type={showcf ? "password" : "text"}
          label="Confirm New Password"
          name="confirm"
          autoComplete="confirm"
          autoFocus
          onChange={(e) => {
            setConfirm(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowcf(!showcf)}

                  edge="end"
                >
                  {showcf ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Change Password
        </Button>
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
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default Change_pass;
