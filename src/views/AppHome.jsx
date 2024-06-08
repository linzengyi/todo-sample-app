import { useEffect, useState } from 'react'

import {
  Routes,
  Route,
  NavLink,
  useNavigate
} from "react-router-dom";


import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Header from "./layouts/Header";
import Home from "./Home";
import About from "./About";
import Todo from "./Todo";

import { authLogout } from '../utilts/auth.js';

// eslint-disable-next-line react/prop-types
function AppHome() {

    const menus = [
      { title: "Todo List Sample", link: "/todo" },
      { title: "About", link: "/about" },
    ];

    const navigate = useNavigate();
  
    const [userInfo, setUserInfo] = useState({ id: -1, name: ''});
    const [open, setOpen] = useState(false);
    const [errorText, setErrorText] = useState('');


    useEffect(() => {
      const storageData = localStorage.getItem('todoSample');

      if (!storageData) {
        navigate('/login');
      } else {
        const { userInfo } = JSON.parse(storageData);
        setUserInfo(userInfo);
      }
    }, []);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    
    const logoutHandler = () => {
      authLogout()
        .then(() => {
          localStorage.removeItem("todoSample");
          navigate("/login");
        })
        .catch((error) => {
          setErrorText(error.message);
          handleClickOpen();
        });
    };
    
    
    return (
      <>
        <Grid container spacing={0} className='h-full'>
          <Grid item xs={12} md={3} xl={2} sx={{flex: 1 }}>
            <div className="w-full h-full shadow-md bg-sky-50">
              <h2 className="w-full h-14 py-3 px-4 text-2xl bg-blue-800 text-white">
                Menu
              </h2>
              <ul id="menu-container" className="w-full py-2">
                {menus.map((menu, index) => (
                  <li
                    className="w-full h-12 text-xl mb-1 font-bold hover:bg-sky-100"
                    key={index}
                  >
                    <NavLink to={menu.link}>{menu.title}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={9} xl={10} sx={{flex: 1 }}>
            <Header
              imgSrc=""
              title="Todo-Sample-App"
              userInfo={userInfo}
              logoutHandler={logoutHandler}
            />
            <Box component="main" className="h-screen bg-slate-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo />} key={Math.random()} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className="bg-blue-200">
            訊息
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className='p-2'>
              {errorText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>確認</Button>
          </DialogActions>
        </Dialog>
      </>
    );
}

export default AppHome;