/**
 * For the demo purposes we'll be using this predefined JWT token as the token of the signed in user
 * https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Db8fjZU7MkBZoJDjmjuvv2EeDgG9RSaZ1xKm__qHelw
 */
import axios from '../_config/AxiosConfig';
import store from 'store'
import config from '../_config'

const sampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Db8fjZU7MkBZoJDjmjuvv2EeDgG9RSaZ1xKm__qHelw'

const authService = {
   async logIn({ username, password, role }) {
    const data = {
        username,
        password,
        role
    };
    const configs = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await axios.post('/auth/login', data, configs);
    return response;
}

}

export default authService
