import axios from 'axios';

const client = axios.create({
    baseURL: 'http://tractorserver.myddns.me:3001/api/v1',
    headers: {
        
        'x-user-id': localStorage.getItem('userId'), // Gửi thông tin người dùng
      },
}   
);
client.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
  }

  // Lấy giá trị từ localStorage và gán cho x-user-id
  const userId = localStorage.getItem('userId');
  if (userId) {
      config.headers['x-user-id'] = userId;
  }

  return config;
});
export default client;

