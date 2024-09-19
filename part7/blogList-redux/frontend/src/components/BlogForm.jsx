import { useState } from "react";
import { Button, TextField, Box, Typography } from '@mui/material';

const BlogForm = ({ addBlog, toggleBlogForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const blogObject = { title, author, url };
    addBlog(blogObject);
    setTitle("");
    setAuthor("");
    setUrl("");
    toggleBlogForm()
    };

  return (
    <Box>
        <div>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, p: 2, border: '1px solid lightgray', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            New Blog
          </Typography>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={toggleBlogForm}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>

      </div>

    </Box>
  );
};

export default BlogForm;
