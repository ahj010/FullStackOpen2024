import { useState } from "react";
import { Button, TextField, Box, Typography } from '@mui/material';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleLogin(username, password);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setError("Invalid username or password");
      setUsername("");
      setPassword("");
    }

  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 2, borderRadius: 1, boxShadow: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Login
      </Typography>

    <form onSubmit={onSubmit}>
      <div>
        username
        <TextField
                   label="Username"
                   variant="outlined"
                   fullWidth
                   margin="normal"
                   name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
           onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">login</Button>
    </form>
    </Box>
  );
};

export default LoginForm;
