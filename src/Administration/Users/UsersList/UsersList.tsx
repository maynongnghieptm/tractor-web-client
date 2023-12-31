import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
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
  const [filterOption, setFilterOption] = useState('all');
  const [userTooltips, setUserTooltips] = useState<{ [key: string]: boolean }>({});
  const [tractorData, setTractorData] = useState<{ id: string; tractorid: string }[]>([]);
  const [selectedTractors, setSelectedTractors] = useState<string[]>([]);
  useEffect(() => {
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
    fetchUsers(filterOption);
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

  const handleDeleteUser = (userId: string) => {
    axios.delete(`/users/${userId}`)
      .then(response => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
        alert('Delete complete')
      })
      .catch(error => {
        alert("Error")
        console.error('Error deleting user:', error);
      });
  };

  const handleToggleActive = (userId: string) => {
    const updatedActiveStatus = { ...activeStatus };
    updatedActiveStatus[userId] = !updatedActiveStatus[userId];
    setActiveStatus(updatedActiveStatus);

    const newStatus = updatedActiveStatus[userId] ? 'confirm' : 'unconfirm';
    axios.patch(`/users/${newStatus}/${userId}`)
      .then(response => {
        alert('Update Complete')
      })
      .catch(error => {
        alert('Error')
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
        return prevSelectedTractors.filter((id) => id !== tractorid);
      } else {
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
          alert('Assign Complete')
        })
        .catch(error => {
          console.error('Error saving user data:', error);
          alert('Error')
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
                        e.stopPropagation();
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
                            <button onClick={() => handleSubmitAssign(user.id)}>Assign</button>
                          </div>
                        </div>}
                      open={userTooltips[user.id] || false}
                      classes={{
                        tooltip: 'custom-tooltip',
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          axios.get(`/users/${user.id}`)
                            .then(response => {
                              setSelectedTractors(response.data.data.tractorList)
                            })
                            .catch(error => {
                              console.log(error)
                            })
                          setUserTooltips((prevState) => ({
                            ...prevState,
                            [user.id]: !prevState[user.id],
                          }))
                        }
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
