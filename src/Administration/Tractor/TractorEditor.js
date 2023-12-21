import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from '../../_config/AxiosConfig';
import BasePageContainer from '../../_common/BasePageContainer';
import BasePageToolbar from '../../_common/BasePageToolbar';
import {
  Input,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Grid,
} from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
const TractorEditor = () => {
  const { tractorId } = useParams();
  
  const [editedTractorData, setEditedTractorData] = useState({});

  useEffect(() => {
    axios.get(`/tractors/${tractorId}`)
      .then(response => {
        const fetchedTractorData = response.data.data;
        
        setEditedTractorData({ ...fetchedTractorData });
      })
      .catch(error => {
        console.error(`Error fetching tractor details for editing: ${error}`);
      });
  }, [tractorId]);
  const handlerSubmit = () => {
    if (editedTractorData) {
      const tractorDataToSend = {
        tractorId: editedTractorData.tractorId
      };
      axios.put(`/tractors/${tractorId}`, tractorDataToSend)
        .then(response => {
          alert('Update Complete')
        })
        .catch(error => {
          console.error('Error saving user data:', error);
          alert('Error')
        });
    }
  }

  return (
    <div>
      <BasePageContainer>
        <BasePageToolbar title={'Edit Tractor'} />
        <Grid container xs={12} component={Paper}>
          <form>
            <FormControl>
              <InputLabel>Tractor Id</InputLabel>
              <Input value={editedTractorData.tractorId}
                onChange={(e) => {
                  setEditedTractorData({
                    ...editedTractorData,
                    tractorId: e.target.value,
                  });
                }} />
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