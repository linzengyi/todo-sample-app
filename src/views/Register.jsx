import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box, Divider } from '@mui/material';
import { userRegister } from '../utilts/user.js'


export default function Register() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
 

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await userRegister({account, password, name});

      alert('註冊成功');

      navigate('/login');
    } catch(error) {
      alert(error.message);
    }
  };


  const handleRedirectToLogin = () => {
    navigate('/login'); 
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
      <Paper sx={{ padding: '20px', width: '300px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          帳號註冊
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
        <TextField
          label="姓名"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button sx={{ marginTop: '15px', marginBottom: '15px' }} variant="contained" color="primary" fullWidth onClick={handleRegister}>
          註冊
        </Button>
        <Divider sx={{ marginBottom: '15px' }} />
        <Button variant="contained" color="secondary" fullWidth onClick={handleRedirectToLogin}>
          取消
        </Button>
      </Paper>
    </Box>
  );
}