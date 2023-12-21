/**
 * For the demo purposes we'll be using this predefined JWT token as the token of the signed in user
 * https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Db8fjZU7MkBZoJDjmjuvv2EeDgG9RSaZ1xKm__qHelw
 */
import axios from '../_config/AxiosConfig';



const authService = {
   async logIn({ username, password }) {
    const data = {
        username,
        password,
        
    };
    const configs = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await axios.post('/auth/login', data, configs);
    return response;
},

async signUp({ fullname, username, email, password, address }) {
    const data = {
      fullname,
      username,
      email,
      password,
      address
    };
    const configs = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post('/users', data, configs);
    return response;
  }

}


export default authService
