import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import ClickableUser from "./components/clickableUser";
import ClickableBlog from "./components/ClickableBlog";
import MainLayout from "./layouts/MainLayout";
import UserDetailLayout from "./layouts/UserDetailLayout";
import BlogDetailLayout from "./layouts/BlogDetailLayout";
import LoginLayout from './layouts/LoginLayout'
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from './services/users'
import { setNotification, clearNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, updateBlog, removeBlog } from './reducers/blogReducer';
import { initializeAllUsers } from "./reducers/userReducer";
import {Routes, Route, Link, useNavigate, Navigate} from 'react-router-dom'
import {
  createTheme, ThemeProvider, CssBaseline, Table, Typography, TableHead,
  TableBody, TableRow, TableCell,
  AppBar, Toolbar, Button, Box
 } from '@mui/material';



const App = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([])
  const [showBlogForm, setShowBlogForm] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector((state) => state.blogs.blogs)

  useEffect(() => {
   dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    } else if (!user) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getUsers();
      setAllUsers(response);
    };
    fetchUsers();
  }, [blogs]);


  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      navigate('/')
      dispatch(setNotification({ message: `Hello ${user.name}, Welcome back to your blogs!`, error: null }));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }

      catch (exception) {
      if (exception.response && exception.response.status === 401) {
       await dispatch(setNotification({ error: 'Token expired. You are requested to login again.', message: null }));
        setUser(null);
        navigate('/login')
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }

     await dispatch(setNotification({error: 'Invalid username or password', message: null}));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

  const addBlog = async (blogObject) => {

    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      dispatch(setNotification({ error: 'Creation failed! Please provide complete information', message: null}));
       setTimeout(() => {
          dispatch(clearNotification())
        }, 5000);
        return
    }

    try {
      await dispatch(createBlog(blogObject))
      dispatch(setNotification(
       { message: `A new blog "${blogObject.title}" by ${blogObject.author} added`, error: null },
      ));
      navigate('/blogs')
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } catch (error) {
      dispatch(setNotification({ error: `An error occurred: ${error.message}`, message: null}));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
    navigate('/login')
  };

  const updateBlogLikes = async (id) => {
      const blogToUpdate = blogs.find(blog => blog.id === id)
        try {
       await   dispatch(updateBlog(blogToUpdate.id))
      dispatch(setNotification(
        {message: `You liked the blog '${blogToUpdate.title}' by ${blogToUpdate.author}`, error: null},
      ));
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)

    } catch (error) {
     await  dispatch(setNotification({error: `${error}`, message: null}));
       setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
  };

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    const confirmDeletion = window.confirm(
      `Deleting the blog ${blogToDelete.title} by ${blogToDelete.author}`,
    );
    try {
      if (confirmDeletion) {
       await dispatch(removeBlog(blogToDelete.id))
       navigate('/blogs')
        dispatch(setNotification({message: `Successfully deleteded "${blogToDelete.title}" by ${blogToDelete.author} `, error: null}))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
    } catch (error) {
      await dispatch(setNotification({error: ` An error occurred: ${error.message}`, message: null}));
      navigate('/login')
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)}
  };

  const toggleBlogForm = () => {
    setShowBlogForm(!showBlogForm);
  }


  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: '#f5f5f5',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
  <CssBaseline />
  <div>
    <div>
  <div>
    {!user ? (
      <>
      <Notification/>
      <LoginForm handleLogin={handleLogin}/>
      </>
    ) :
    <div>
          <Box>
         <AppBar position="static">
           <Toolbar>
             <Typography variant="h6" sx={{ flexGrow: 1 }}>
               <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Blog App
               </Link>
              </Typography>
              <Typography variant="h6" align="right" sx= {{flexGrow: 1}}>
                <Button color="inherit" onClick={toggleBlogForm}>
                  New Blog
                </Button>
             </Typography>
             <Button color="inherit" component={Link} to="/blogs">
               Blogs
             </Button>
             <Button color="inherit" component={Link} to="/users">
               Users
             </Button>
             <Button color="inherit" component={Link} to="/login" onClick={handleLogout}>
             Logout
             </Button>
             </Toolbar>
             </AppBar>
</Box>
        <Notification />
    {showBlogForm && <BlogForm addBlog={addBlog} toggleBlogForm={toggleBlogForm}/>}
<Routes>
<Route path="/users" element={
  user ? (
    <MainLayout>
      <Typography variant="h4" gutterBottom p={'20px'}>Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Blogs Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </MainLayout>
  ) : (
    <Navigate replace to='/login' />
  )
} />
      <Route path="/users/:id" element={
        <UserDetailLayout>
          <ClickableUser/>
        </UserDetailLayout>
        }/>

      <Route path="/blogs" element={
        <MainLayout>
    {blogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
    />
  ))}
        </MainLayout>
        }/>

      <Route path="/:id" element={
        <BlogDetailLayout>
          <ClickableBlog user={user} addLikes={updateBlogLikes} deleteBlog={deleteBlog} />
        </BlogDetailLayout>
      }/>

      <Route path="/login" element={
        <LoginLayout>
          <LoginForm handleLogin={handleLogin}/>
        </LoginLayout>
        }/>
    </Routes>
</div>
}
  </div>
  </div>
</div>
</ThemeProvider>

);
};

export default App;
