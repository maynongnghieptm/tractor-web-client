// Profile.js
import React, { useState, useEffect } from 'react';
import axios from '../../_config/AxiosConfig';
import './Profile.css';
import EditProfileModal from './Edit_Profile'; // Import the modal component
import {
  Button,
} from '@material-ui/core'
const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    fullname: '',
    email: '',
    address: '',
    tractorList: []
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.data.code === 200) {
          setUser({
            username: response.data.data.username,
            fullname: response.data.data.fullname,
            email: response.data.data.email,
            address: response.data.data.address,
            tractorList: response.data.data.tractorList
          });
        }
        console.log(user.tractorList)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  return (
    <div className='profile' id='profile'>
      <div className='user-profile'>
        <div className='profile-name'>
          <h1>{user.fullname}</h1>
        </div>
        <div className='profile-item'>
          <div className='profile-item-header'>User Information</div>
          <div className='profile-item-child'>
            <span className='title'>User name</span>
            <span className='value'>{user.username}</span>
          </div>
          <div className='profile-item-child'>
            <span className='title'>Address</span>
            <span className='value'>{user.address}</span>
          </div>
          <div className='profile-item-child'>
            <span className='title'>Email</span>
            <span className='value'>{user.email}</span>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleEditProfileClick}
        >
          Change Information
        </Button>
      </div>
      <div className='tractor-profile'>
        <div className='tractor-header'>
          <h1>Your Tractor</h1>
        </div>
        <div className='profile-item-child'>
          <ul style={{padding:"0"}}>
            {user.tractorList.map((item, index) => (
              <li key={index} style={{color: "black"}}>
              <span className='value'>{item}</span>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isEditProfileOpen && <EditProfileModal onClose={() => setIsEditProfileOpen(false)} />}
    </div>
  );
};

export default Profile;
