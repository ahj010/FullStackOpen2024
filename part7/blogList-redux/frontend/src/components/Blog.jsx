import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material';

function Blog({blog}) {
  return (
    <Box
    sx={{
      p: 2,
      mb: 2,
      border: '1px solid lightgray',
      borderRadius: 1,
      '&:hover': { backgroundColor: 'lightgray' }
    }}

    >
    <div>
      <Link to={`/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div>
      <Typography variant="p">
          {blog.title}
        </Typography>
        </div>
        </Link>
    </div>
    </Box>
  )
}

export default Blog
