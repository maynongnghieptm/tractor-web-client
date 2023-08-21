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

interface UserEditorPageParams {
  userId: string;
}

const UserEditor: React.FC = () => {
  const { userId } = useParams<UserEditorPageParams>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get(`/users/${userId}`)
      .then(response => {
       
        const userData: User = response.data.data;
        setUser(userData);
        console.log(userData.fullname)
        //console.log(user.fullName)
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleSaveUser = () => {
    if (user) {
      const userDataToSend = {
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        address: user.address,
      };

      axios.put(`/users/${userId}`, userDataToSend)
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
        {user && (
          <Grid container xs={12} component={Paper}>
            <form>
              <FormControl>
                <InputLabel>First Name</InputLabel>
                <Input value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })}/>
              </FormControl>
              <FormControl>
                <InputLabel>User Name</InputLabel>
                <Input value={user.username}   onChange={(e) => setUser({ ...user, username: e.target.value })}/>
              </FormControl>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              </FormControl>
              <FormControl>
                <InputLabel>Address</InputLabel>
                <Input value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
              </FormControl>
              
              
             
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={handleSaveUser}
                startIcon={<SaveIcon />}
              >
                Save User
              </Button>
            </form>
          </Grid>
        )}
      </BasePageContainer>
    </div>
  );
};

export default UserEditor;
