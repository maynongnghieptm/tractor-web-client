import axios from '../_config/AxiosConfig';

const authSignup = {
  async signUp({ fullname, username, email,password ,address }) {
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
  },
};

export default authSignup;
