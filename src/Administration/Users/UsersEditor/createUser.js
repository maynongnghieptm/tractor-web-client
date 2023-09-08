import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import axios from '_config/AxiosConfig';
import { User } from '_api/_types/User';
import BasePageContainer from '_common/BasePageContainer';
import BasePageToolbar from '_common/BasePageToolbar';
  
const CreateUser = ()=>{
    const [user, setUser] = useState();
    const handleCreate = () => {
        if (user) {
          const userDataToSend = {
           
            username: user.username,
            password: user.password,
            email: user.email,
            fullname: user.fullname,
            address: user.address,
          };
    
          axios.post(`/users`, userDataToSend)
            .then(response => {
              console.log('User data saved successfully:', response.data);
              // Do something after successful save
            })
            .catch(error => {
              console.error('Error saving user data:', error);
              // Handle error
            });
        }
      };
        return (
            <div>
              <BasePageContainer>
                <BasePageToolbar title={'Edit user'} />
               
                  <Grid container xs={12} component={Paper}>
                    <form>
                      <FormControl>
                        <InputLabel>User name</InputLabel>
                        <Input onChange={(e) => setUser({ ...user, username: e.target.value })} />
                      </FormControl>
                      <FormControl>
                        <InputLabel>Password</InputLabel>
                        <Input onChange={(e) => setUser({ ...user, password: e.target.value })} />
                      </FormControl>
                      <FormControl>
                        <InputLabel>Email</InputLabel>
                        <Input onChange={(e) => setUser({ ...user, email: e.target.value })} />
                      </FormControl>
                      <FormControl>
                        <InputLabel>Full name</InputLabel>
                        <Input  onChange={(e) => setUser({ ...user, fullname: e.target.value })}/>
                      </FormControl>
                      <FormControl>
                        <InputLabel>Address</InputLabel> 
                        <Input onChange={(e) => setUser({ ...user, address: e.target.value })} />
                      </FormControl>
                      
                      
                     
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={handleCreate}
                        startIcon={<SaveIcon />}
                      >
                        Save User
                      </Button>
                    </form>
                  </Grid>
              
              </BasePageContainer>
            </div>
    )
}
export default CreateUser