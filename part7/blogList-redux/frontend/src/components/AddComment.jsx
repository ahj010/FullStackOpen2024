import { useDispatch } from 'react-redux';
import { createComment } from '../reducers/commentReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';
import { Button, TextField, Box, Typography } from '@mui/material';

const AddComment = ({ id }) => {
  const dispatch = useDispatch();

  const addComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;

    if (!comment) {
      dispatch(setNotification({ error: 'Comment cannot be empty', message: null }));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
      return;
    }

    try {
      dispatch(createComment(id, comment));
      e.target.comment.value = '';
    } catch (error) {
      dispatch(setNotification({ error: `An error occurred: ${error.message}`, message: null }));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

  return (
    <Box component="section" sx={{ mt: 3 }}>
      <Typography variant="h5">Comments:</Typography>
      <form onSubmit={addComment}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 , width: '300'}}>
          <TextField
            type="text"
            name="comment"
            data-testid="commentInput"
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Add comment
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddComment;
