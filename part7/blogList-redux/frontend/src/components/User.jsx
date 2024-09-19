import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, TableCell, TableRow } from '@mui/material';

function User({ user }) {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
           variant="body1" align='center'
           sx={{
            fontWeight: 'bold',
            '&:hover': {
              color: 'lightgray',
              textDecoration: 'underline'
            }
          }}

          >
            {user.username}
            </Typography>
        </Link>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body1" align='center'>{user.blogs ? user.blogs.length : 0}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default User;
