import axios from 'axios';

const client = axios.create({
    baseURL: 'http://tractorserver.myddns.me:8000/api/v1',
    headers: {
        
        'x-user-id': localStorage.getItem('userId'), // Gửi thông tin người dùng
      },
}   
);
client.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  });
export default client;

