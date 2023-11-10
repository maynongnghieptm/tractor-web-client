// EditProfileModal.js
import React, { useState, useEffect, useRef } from 'react';
import axios from '../../_config/AxiosConfig';
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
 
} from '@material-ui/core'
import BorderColorIcon from '@mui/icons-material/BorderColor';
// Create a separate CSS file for modal styles

const EditProfileModal = ({ onClose }) => {
  const [changeEmail, setChangeEmail] = useState(true)
  const [data, setData] = useState({

    fullname: '',
    email: '',
    address: '',

  })
  const initialData = useRef(null);
  const modalContentRef = useRef(null);
  useEffect(() => {
    axios
      .get(`/users/${localStorage.getItem('userId')}`)
      .then((response) => {
        initialData.current = {
          fullname: response.data.data.fullname,
          email: response.data.data.email,
          address: response.data.data.address,
        };
        setData(initialData.current);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  const handleConfirmEdit = () => {
    // Compare the current data with the initial data
    if (
      data.fullname !== initialData.current.fullname ||
      data.email !== initialData.current.email ||
      data.address !== initialData.current.address
    ) {
      const userDataToSend = {
        fullname: data.fullname,
        email: data.email,
        address: data.address,
      };

      axios
        .put(`/users/${localStorage.getItem('userId')}`, userDataToSend)
        .then((response) => {
          window.location.reload()
        })
        .catch((error) => {
          console.error('Error saving user data:', error);
          // Handle error
        });
    }

    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose(); // Close the modal when clicking outside
      }
    };
    const child = document.getElementById('profile')
    const parentElement = child.parentNode;
    parentElement.addEventListener('mousedown', handleClickOutside);

    return () => {
      parentElement.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  
  return (
    <div className='edit-profile-modal' >
      <div className='edit-profile-content' ref={modalContentRef}>
        <div className='edit-profile-fullname'>
          <span>Name</span>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullname"
            value={data.fullname}
            name="fullname"
            autoComplete="fullname"
            autoFocus
            onChange={(e) => { setData({ ...data, fullname: e.target.value }) }}
          />

        </div>
        <div className='edit-profile-address'>
          <span>Addres</span>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            value={data.address}
            name="address"
            autoComplete="address"
           
            onChange={(e) => { setData({ ...data, address: e.target.value }) }}
          />
        </div>
        <div className='edit-profile-email'>
          <span>Email</span>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            value={data.email}
            name="email"
            autoComplete="email"
           
            onChange={(e) => { setData({ ...data, email: e.target.value }) }}
            disabled = {changeEmail}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e)=>{
                      setChangeEmail(!changeEmail)
                    }}
  
                    edge="end"
                  >
                   <BorderColorIcon /> 
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleConfirmEdit}
        >
          Confirm change
        </Button>
      </div>
    </div>
  );
};

export default EditProfileModal;
