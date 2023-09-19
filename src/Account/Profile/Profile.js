import React, { useState, useEffect } from 'react';
import axios from '../../_config/AxiosConfig'
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import { Edit as EditIcon, Add as AddIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon, Visibility as VisibilityIcon } from '@material-ui/icons';
import Bar from '../LiveData/Steerbar'
const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    fullname: '',
    email: '',
    address: '',
  })
  const userId = localStorage.getItem('userId')
  const testData = [
    { bgcolor: "#6a1b9a", completed: -30 },
    { bgcolor: "#00695c", completed: 30 },
    { bgcolor: "#ef6c00", completed: 53 },
  ];
  
  useEffect(() => {
    // Đặt hàm fetchData là một hàm bất đồng bộ để gọi API
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
            address: response.data.data.address
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Gọi fetchData khi component được mount
    fetchData();
  }, [userId]);
    console.log(user)
    return (
      <div>
 <Bar /> 
    {/* <Table className="user-table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{user.fullname}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>
                <IconButton>
                  <EditIcon/>
                 
                </IconButton>

            </TableCell> 
          </TableRow>
        </TableBody>
      </Table> */}

    </div>
    );
};
 


export default Profile;
