import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const ClickableUser = () => {
  const users = useSelector(state => state.users);
  const { id } = useParams();
  const user = users.find(n => n.id === String(id));

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ p: 3, mt: 2, border: '1px solid lightgray', borderRadius: 1 }}>
      <Typography variant="h3" gutterBottom>
        {user.username}
      </Typography>

      <Typography variant="h5" color='#00bcd4' gutterBottom>
        Added Blogs
      </Typography>

      {user.blogs && user.blogs.length > 0 ? (
        <List>
          {user.blogs.map(blog => (
            <ListItem key={blog.id} sx={{ pl: 0, color:'#ff9800'} }>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No blogs yet!
        </Typography>
      )}
    </Box>
  );
};

export default ClickableUser;
