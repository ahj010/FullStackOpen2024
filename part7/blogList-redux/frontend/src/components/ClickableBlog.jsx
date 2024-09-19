import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Link } from '@mui/material';
import CommentDisplay from './CommentDisplay';

const ClickableBlog = ({ addLikes, deleteBlog, user }) => {
  const blogs = useSelector(state => state.blogs.blogs);
  const id = useParams().id;
  const blog = blogs.find(n => n.id === String(id));

  if (!blog) {
    return null;
  }

  return (
    <Box sx={{ p: 3, border: '1px solid lightgray', borderRadius: 1, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        {blog.title}
      </Typography>
      <Link href={blog.url} target="_blank" variant="body1" sx={{ display: 'block', mb: 2 }}>
        {blog.url}
      </Link>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Likes: {blog.likes}
        <Button variant="contained" color="primary" size="small" onClick={() => addLikes(blog.id)} sx={{ ml: 2 }}>
          Like
        </Button>
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Added by {blog.user.username}
      </Typography>

      {blog.user.username === user.username && (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => deleteBlog(blog.id)}
        >
          Remove
        </Button>
      )}

      <CommentDisplay id={id} />
    </Box>
  );
};

export default ClickableBlog;
