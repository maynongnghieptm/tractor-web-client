import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from '../../_config/AxiosConfig';
import BasePageContainer from '../../_common/BasePageContainer';
import BasePageToolbar from '../../_common/BasePageToolbar';
import {
    Input,
    Select,
    MenuItem,
    Paper,
    Button,
    FormControl,
    InputLabel,
    makeStyles,
    Grid,
  } from '@material-ui/core';
  import { Save as SaveIcon } from '@material-ui/icons';
const TractorEditor = ()=>{
    const { tractorId } = useParams(); // Access the tractorId from the route parameter
  const [tractorData, setTractorData] = useState({});
  const [editedTractorData, setEditedTractorData] = useState({});

  useEffect(() => {
    // Fetch tractor data based on the tractorId
    axios.get(`/tractors/${tractorId}`)
      .then(response => {
        const fetchedTractorData = response.data.data; // Assuming the API response contains the tractor details
        setTractorData(fetchedTractorData);
        setEditedTractorData({ ...fetchedTractorData });
      })
      .catch(error => {
        console.error(`Error fetching tractor details for editing: ${error}`);
      });
  }, [tractorId]);
     console.log(editedTractorData)
 const handlerSubmit=()=>{
    if(editedTractorData){
      const tractorDataToSend = {
        tractorId: editedTractorData.tractorId
      };
      axios.put(`/tractors/${tractorId}`, tractorDataToSend)
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
   
    return( 
        <div>
      <BasePageContainer>
        <BasePageToolbar title={'Edit Tractor'} />
          <Grid container xs={12} component={Paper}>
            <form>
              <FormControl>
                <InputLabel>Tractor Id</InputLabel>
                <Input   value={editedTractorData.tractorId}
  onChange={(e) => {
    setEditedTractorData({
      ...editedTractorData,
      tractorId: e.target.value,
    });
  }}/>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                type="button"
               
                startIcon={<SaveIcon />}
                onClick={handlerSubmit}
              >
                Save Tractor
              </Button>
            </form>
          </Grid>
    
      </BasePageContainer>
    </div>
  );
    
}
export default TractorEditor