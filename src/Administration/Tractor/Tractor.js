import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableContainer, TableRow, TableCell, TableBody, IconButton, Checkbox, Button, TextField } from '@material-ui/core';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import axios from '../../_config/AxiosConfig';
import './tractor.css'
import { useHistory } from 'react-router-dom';
;
const Tractor = () => {
  const [newTractorname, setNewTractorname] = useState('')
  const [tractors, setTractors] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTractors, setSelectedTractors] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [command, setNewCommand] = useState('')
  const history = useHistory();
  useEffect(() => {
    axios.get('/tractors')
      .then(response => {
        setTractors(response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file !== selectedFile) {
      const initialSelectedTractors = tractors.reduce((acc, tractor) => {
        acc[tractor._id] = selectedTractors[tractor._id] || false;
        return acc;
      }, {});
      setSelectedTractors(initialSelectedTractors);
    }
  };
  const handleTractorSelection = (tractorId) => {
    setSelectedTractors(prevSelectedTractors => ({
      ...prevSelectedTractors,
      [tractorId]: !prevSelectedTractors[tractorId],
    }))
  };
  
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const response = await axios.post(`file-config/upload`, formData);
      const imageUrl = response.data.data;
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  const handleCreateTractor = () => {
    const newTractorData = {
      tractorId: newTractorname,
    };
    axios.post('/tractors', newTractorData, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      setNewTractorname = ''
      alert('Create Complete')
    })
      .catch(error => {
        console.error('Error creating tractor:', error);
        alert('Error')
      });
  };
  const handleEdit = (tractorId) => {
    history.push(`/administration/tractoredit/${tractorId}`);
  };
  const handleDelete = (tractorId) => {
    axios.delete(`/tractors/${tractorId}`)
      .then(response => {
        setTractors(prevTractors => prevTractors.filter(tractor => tractor._id !== tractorId));
        alert('Delete Complete')
      })
      .catch(error => {
        console.error(`Error deleting tractor with ID ${tractorId}`, error);
        alert('Error')
      });
  };
  const handleSelectAll = () => {
    const allTractorIds = tractors.map(tractor => tractor._id);
    const newSelectedTractors = {};
    allTractorIds.forEach(id => {
      newSelectedTractors[id] = !selectAll;
    });
    setSelectedTractors(newSelectedTractors);
    setSelectAll(!selectAll);
  };
  const handleCommandTractor = () => {
    const selectedTractorIds = Object.keys(selectedTractors).filter(id => selectedTractors[id]);
    if (selectedTractorIds.length > 0) {
      const datacommand = {
        command: {
          tractorId: selectedTractorIds,
          command: command
        }
      }
      axios.post('/commands', datacommand)
        .then(response => {
          alert('Send command complete')
        })
        .catch(error => {
          console.error('Error creating tractor:', error);
          alert('Error')
        });
    }
  }
  return (
    <div style={{ overflowX: 'auto' }} >
      <div className="tractors-list-container">
        <div className="create-tractor-button">
          <div className="create-tractor-input">
            <TextField
              label="New Tractor Id"
              value={newTractorname}
              onChange={(e) => setNewTractorname(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleCreateTractor} size='30'>
              Create Tractor
            </Button>
          </div>
          <div className="create-tractor-input">
            <TextField
              label="Command to tractor"
              onChange={(e) => setNewCommand(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleCommandTractor}>
              Send Command
            </Button>
          </div>
        </div>

        <div className="tractors-table-container" >
          <TableContainer >
            <Table className="tractors-table"  >
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Tractor Id</TableCell>
                  <TableCell>Created at</TableCell>
                  <TableCell>Updated at</TableCell>
                  <TableCell>
                    <Checkbox color='primary'
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />Select All
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tractors.map(tractor => (
                  <TableRow key={tractor._id}>
                    <TableCell>{tractor._id}</TableCell>
                    <TableCell>{tractor.tractorId}</TableCell>
                    <TableCell>{tractor.createdAt}</TableCell>
                    <TableCell>{tractor.updatedAt}</TableCell>
                    <TableCell>
                      <Checkbox
                        color='primary'
                        checked={selectedTractors[tractor._id] || false}
                        onChange={() => handleTractorSelection(tractor._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(tractor._id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(tractor._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="addfile">
          <label htmlFor="file-input">
            <IconButton color="primary" component="span" className="add-icon">
              <AddIcon />
            </IconButton>
          </label>
          <input
            type="file"
            id="file-input"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        <div className="upload-button">
          <IconButton color="primary" onClick={uploadImage} className="upload-icon">
            Upload
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Tractor
