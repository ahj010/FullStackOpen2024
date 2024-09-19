import { useSelector } from 'react-redux';
import { Alert, Box } from '@mui/material';

const Notification = () => {
  const { message, error } = useSelector((state) => state.notification);

  if (!message && !error) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Alert severity={error ? "error" : "success"}>
        {error || message}
      </Alert>
    </Box>
  );
};

export default Notification;
