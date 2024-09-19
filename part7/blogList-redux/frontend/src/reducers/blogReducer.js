import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs'

const initialState = {
 blogs : []
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
   setBlogs: (state, action) => {
    state.blogs = action.payload.sort((a,b) => b.likes - a.likes)
   },
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
      state.blogs.sort((a,b) => b.likes - a.likes);
    },
    likeBlog: (state, action) => {
      const blogToLike = state.blogs.find(blog => blog.id === action.payload.id);
      if (blogToLike) {
        blogToLike.likes += 1;
        state.blogs.sort((a, b) => b.likes - a.likes);
      }
    },
    deleteBlog: (state, action) => {
     state.blogs = state.blogs.filter( blog => blog.id !== action.payload)
    }
  },
});

export const { setBlogs, addBlog, likeBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs =  await blogService.getAll()
  dispatch(setBlogs(blogs));
}

export const createBlog = (blogObject) => async (dispatch) => {
  const newBlog = await blogService.create(blogObject);
  dispatch(addBlog(newBlog));
}

export const updateBlog = (id) => async (dispatch, getState) => {
  const blogs = getState().blogs.blogs
  const blogToUpdate = blogs.find((blog) => blog.id === id)
  if (!blogToUpdate) {
    return
  }
  const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
  const returnedBlog = await blogService.update(id, updatedBlog);
  dispatch(likeBlog(returnedBlog));
};

export const removeBlog = (id) => async (dispatch) => {
  await blogService.deleteBlog(id);
  dispatch(deleteBlog(id));
};

export default blogSlice.reducer;
