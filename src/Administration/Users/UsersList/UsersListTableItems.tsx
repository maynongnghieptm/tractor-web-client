import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import axios from '../../../_config/AxiosConfig';
import { User } from '_api/_types/User'; // Điều chỉnh đường dẫn đến User type

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('/users')
      .then(response => {
        const userList: User[] = response.data.data.map((item: any) => ({
          id: item._id,
          fullName: item.fullname,
         
          username: item.username,
          email: item.email,
          
          address: item.address
        }));
        setUsers(userList);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            {/* Add more table headers for other fields */}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              
              {/* Add more table cells for other fields */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserListPage;
