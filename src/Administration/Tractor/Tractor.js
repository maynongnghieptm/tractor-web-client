import React, { useEffect, useState } from 'react';
import { Table, TableHead,TableContainer, TableRow, TableCell, TableBody, IconButton,Checkbox,Button, TextField } from '@material-ui/core';
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
    const [editingTractorId, setEditingTractorId] = useState(null)
    const [command, setNewCommand] = useState('')
    const history = useHistory();
    useEffect(() => {
        axios.get('/tractors')
          .then(response => {
           // console.log(response.data); 
            setTractors(response.data.data)
          })
          .catch(error => {
            console.log(error); 
          });
      }, []); 
      //console.log(tractors)
     const handleFileChange = (e) => {
  const file = e.target.files[0];
  setSelectedFile(file);
  if (file !== selectedFile) { // Kiểm tra xem tệp đã chọn có khác với tệp trước đó không
    const initialSelectedTractors = tractors.reduce((acc, tractor) => {
      acc[tractor._id] = selectedTractors[tractor._id] || false; // Giữ nguyên trạng thái đã chọn
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
       // console.log(selectedTractors);
      };
      const handleUpload = () => {
        const formData = new FormData()
        const selectedTractorIds = Object.keys(selectedTractors).filter(id => selectedTractors[id]);
        formData.append("tractorIds", JSON.stringify(selectedTractorIds));
        formData.append("fileConfig", selectedFile);
        if (selectedFile) {
          // Perform your file upload logic here using the selectedFile
          // After the upload is done, you can reset the selectedFile state
         // console.log(selectedFile)
          axios.post('/file-config',formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Thay đổi Content-Type thành multipart/form-data
              }
          })
            .then(response => {
              console.log('Form data with file submitted successfully:', response.data);
            })
            .catch(error => {
              console.error('Error submitting form data with file:', error);
            });

        }
      };
      const handleCreateTractor = () => {
        const newTractorData = {
          tractorId: newTractorname,
        };
        axios.post('/tractors', newTractorData, {
          headers: { 'Content-Type': 'application/json',
           },
          
        }).then(response => {
            console.log('Tractor created successfully:', response.data);
            setNewTractorname= ''
           
          })
          .catch(error => {
            console.error('Error creating tractor:', error);
          });
      };
      const handleEdit = (tractorId) => {
        // Set the ID of the tractor to be edited when the edit button is clicked
        history.push(`/administration/tractoredit/${tractorId}`);
        setEditingTractorId(tractorId);
      };
    
      const handleDelete = (tractorId) => {
        axios.delete(`/tractors/${tractorId}`)
      .then(response => {
        console.log(`Tractor with ID ${tractorId} deleted successfully`);
        // Remove the deleted tractor from the state
        setTractors(prevTractors => prevTractors.filter(tractor => tractor._id !== tractorId));
      })
      .catch(error => {
        console.error(`Error deleting tractor with ID ${tractorId}`, error);
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
      //console.log(selectedTractors)
     const  handleCommandTractor=()=>{
        const selectedTractorIds = Object.keys(selectedTractors).filter(id => selectedTractors[id]);

    // Check if at least one tractor is selected
    if (selectedTractorIds.length > 0) {
      const datacommand = {
        command:{
          tractorId: selectedTractorIds,
          command: command
        }
      }
      // Perform your command logic here using the selectedTractorIds
      console.log('Selected Tractor IDs:', selectedTractorIds);
      axios.post('/commands',datacommand)
      .then(response => {
        console.log('Tractor created successfully:', response.data);
        //setNewTractorname= ''
       
      })
      .catch(error => {
        console.error('Error creating tractor:', error);
      });

      // You can call an API or perform any other action with the selectedTractorIds
    } else {
      // No tractors are selected, show a message or perform any desired action
      console.log('No tractors selected.');
    }
      }
  return (
    
    <div className="tractors-list-container">
      <div className="create-tractor-button">
      <div className="create-tractor-input">
        <TextField
          label="New Tractor Id"
          value={newTractorname}
          onChange={(e)=>setNewTractorname(e.target.value)}
          
        />
        </div>
        <Button variant="contained" color="primary" onClick={handleCreateTractor}>
          Create Tractor
        </Button>
        <div className="create-tractor-input">
        <TextField
          label="Command to tractor"
          //value={newTractorname}
          onChange={(e)=>setNewCommand(e.target.value)}
          
        />
        </div>
        <Button variant="contained" color="primary" onClick={handleCommandTractor}>
          Send Command
        </Button>
        
      </div>
    
  <div className="tractors-table-container">
    
  <TableContainer>
    <Table className="tractors-table">
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
    </TableCell>{/* Thêm cột cho checkbox */}
          
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
                  <IconButton   onClick={() => handleEdit(tractor._id)}>
                    <EditIcon />
                  </IconButton>
                  
                  <IconButton  onClick={() => handleDelete(tractor._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>

  </div>

  {/* Nút thêm file */}
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

  {/* Nút tải lên */}
  <div className="upload-button">
    <IconButton color="primary" onClick={handleUpload} className="upload-icon">
      Upload
    </IconButton>
    
  </div>
  
</div>


  )
}

export default Tractor
