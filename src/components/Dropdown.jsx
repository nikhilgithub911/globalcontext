import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { faker } from '@faker-js/faker';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UserSelect() {
  const [selectedUser, setSelectedUser] = React.useState('');
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const randomUsers = [];
    try {
      for (let i = 0; i < 30; i++) {
        const id = i + 1;
        const username = faker.internet.userName();
        const profilePhoto = faker.image.avatar();

        randomUsers.push({ id, username, profilePhoto });
      }
      setUsers(randomUsers);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id="demo-user-select-label">Host</InputLabel>
        <Select
          labelId="demo-user-select-label"
          id="demo-user-select"
          value={selectedUser}
          label="Select a User"
          onChange={handleChange}
          MenuProps={MenuProps}


        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.username}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={user.profilePhoto}
                  alt="Avatar"
                  style={{
                    marginRight: '10px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                  }}
                />
                {user.username}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
