import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box, Divider } from '@mui/material';
import { authLogin } from '../utilts/auth.js'
import { getUserInfo } from '../utilts/user.js';

// eslint-disable-next-line react/prop-types
export default function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleLogin =async () => {
    try {
      await authLogin(account, password);

      await getUserInfo();

      navigate("/todo");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRedirect = () => {
    navigate('/register'); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper sx={{ padding: '20px', width: '300px', marginLeft: 'auto', marginRight: 'auto' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          登入
        </Typography>
        <TextField
          label="帳號"
          variant="outlined"
          fullWidth
          margin="normal"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <TextField
          label="密碼"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button sx={{ marginTop: '15px', marginBottom: '15px' }} variant="contained" color="primary" fullWidth onClick={handleLogin}>
          登入
        </Button>
        <Divider sx={{ marginBottom: '15px' }} />
        <Button variant="contained" color="success" fullWidth onClick={handleRedirect}>
          註冊帳號
        </Button>
      </Paper>
    </Box>
  );
}