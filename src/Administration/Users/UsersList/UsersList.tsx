import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
} from '@material-ui/core';
import { Edit as EditIcon, Add as AddIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon, Visibility as VisibilityIcon } from '@material-ui/icons';
import axios from '../../../_config/AxiosConfig';
import { User } from '_api/_types/User';
import './UserListPage.css';
import { useHistory } from 'react-router-dom';

const UserListPage: React.FC = () => {
  const history = useHistory();

  const [users, setUsers] = useState<User[]>([]);
  const [activeStatus, setActiveStatus] = useState<{ [key: string]: boolean }>({});
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [filterOption, setFilterOption] = useState('all'); // Default value for filtering
  const [showAddUserTooltip, setShowAddUserTooltip] = useState(false); // State to control tooltip visibility
  const [userTooltips, setUserTooltips] = useState<{ [key: string]: boolean }>({});

  const [tractorData, setTractorData] = useState<{ id: string; tractorid: string }[]>([]);
  const [selectedTractors, setSelectedTractors] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  useEffect(() => {
    // Fetch the tractor data here and update the state
    axios.get('/tractors')
      .then((response) => {
        const tractorList = response.data.data.map((item: any) => ({
          id: item._id,
          tractorid: item.tractorId,
        }));
        setTractorData(tractorList);
      })
      .catch((error) => {
        console.error('Error fetching tractor data:', error);
      });
  }, []);
  useEffect(() => {
    fetchUsers(filterOption); // Fetch users based on the selected filter
  }, [filterOption]);

  const fetchUsers = (filter: string) => {
    const url = filter === 'all' ? '/users' : `/users/${filter}`;

    axios.get(url, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const userList: User[] = response.data.data.map((item: any) => ({
          id: item._id,
          fullname: item.fullname,
          username: item.username,
          email: item.email,
          address: item.address,
          active: item.isConfirmed
        }));
        setUsers(userList);
        const initialActiveStatus: { [key: string]: boolean } = {};
        userList.forEach(user => {
          initialActiveStatus[user.id] = user.active;
        });
        setActiveStatus(initialActiveStatus);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const toggleAddUserForm = () => {
    setShowAddUserTooltip(!showAddUserTooltip); // Hide the tooltip when the form is shown
    // ... Rest of your code
  };

  const handleDeleteUser = (userId: string) => {
    axios.delete(`/users/${userId}`)
      .then(response => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };
  console.log(selectedTractors)
  const handleToggleActive = (userId: string) => {
    const updatedActiveStatus = { ...activeStatus };
    updatedActiveStatus[userId] = !updatedActiveStatus[userId];
    setActiveStatus(updatedActiveStatus);

    const newStatus = updatedActiveStatus[userId] ? 'confirm' : 'unconfirm';
    axios.patch(`/users/${newStatus}/${userId}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error updating active status:', error);
        setActiveStatus({ ...activeStatus });
      });
  };

  const handleEditUser = (userId: string) => {
    history.push(`/administration/useredit/${userId}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(event.target.value);
  };
  const handleCheckboxChange = (tractorid: string) => {
    setSelectedTractors((prevSelectedTractors) => {
      if (prevSelectedTractors.includes(tractorid)) {
        // If the tractor ID is already in the list, remove it
        return prevSelectedTractors.filter((id) => id !== tractorid);
      } else {
        // If the tractor ID is not in the list, add it
        return [...prevSelectedTractors, tractorid];
      }
    });
  };

  const handleSubmitAssign = (userid: string) => {
    if (selectedTractors) {
      const userDataToSend = {
        userId: userid,
        tractorList: selectedTractors

      };

      axios.patch('/users/assign-tractors-to-user', userDataToSend)
        .then(response => {
          console.log('User data saved successfully:', response.data);
          // Do something after successful save
        })
        .catch(error => {
          console.error('Error saving user data:', error);
          // Handle error
        });
    }
  }
  return (
    <div className="user-list-container" style={{ overflowX: 'auto' }} >
      <div className="filter-dropdown">
        <select value={filterOption} onChange={handleFilterChange}>
          <option value="all">Tất cả</option>
          <option value="active">Đã active</option>
          <option value="inactive">Chưa active</option>
        </select>
        <IconButton onClick={() => { history.push(`/administration/create`) }} >
          <AddIcon />
        </IconButton>
      </div>


      {/* Conditional rendering of the "Add User" form */}


      <div className="user-table-container">
        <Table className="user-table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              (filterOption === 'active' && !user.active) || (filterOption === 'inactive' && user.active) ? null : (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>
                    {activeStatus[user.id] ? (
                      <IconButton onClick={() => handleToggleActive(user.id)}>
                        <CheckCircleIcon style={{ color: '#8cd136' }} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleToggleActive(user.id)}>
                        <CancelIcon style={{ color: 'red' }} />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip disableTouchListener={false}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the click from propagating to the IconButton
                      }}
                      arrow
                      style={{ backgroundColor: 'white' }}
                      title={
                        <div className='tittle'>
                          <div>
                            <table>
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Tractor ID</th>
                                  <th>Select</th>
                                </tr>
                              </thead>
                              <tbody>
                                {tractorData.map((tractor) => (
                                  <tr key={tractor.id}>
                                    <td>{tractor.id}</td>
                                    <td>{tractor.tractorid}</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={selectedTractors.includes(tractor.id)}
                                        onChange={() => handleCheckboxChange(tractor.id)}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className='btn-asign'>
                            <button  onClick={() => handleSubmitAssign(user.id)}>Assign</button>
                          </div>
                        </div>}
                      open={userTooltips[user.id] || false}

                      classes={{
                        tooltip: 'custom-tooltip', // Add this class to the tooltip content
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          setUserTooltips((prevState) => ({
                            ...prevState,
                            [user.id]: !prevState[user.id], // Toggle the tooltip visibility for this user
                          }))
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                    <IconButton onClick={() => handleEditUser(user.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>
                </TableRow>
              )
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  );
};

export default UserListPage;
