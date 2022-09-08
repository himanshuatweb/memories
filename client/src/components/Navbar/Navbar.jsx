import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import decode from 'jwt-decode';

import AuthContext from '../../context/auth/authContext';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';

import memoriesLogo from '../../assets/memories-Logo.png';
import memoriesText from '../../assets/memories-Text.png';
import useStyles from './styles';
const Navbar = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { authData, userLogout } = authContext;

  console.log(authData);
  const [user, setUser] = useState(authData);

  useEffect(() => {
    console.log('useEffect runs in Navbar.jsx');
    const token =
      user?.token || JSON.parse(localStorage.getItem('profile'))?.token;
    if (token) {
      console.log('In console log of checking token expiration.');
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        console.log('Token Expired');
        localStorage.removeItem('profile');
        logout();
      }
    }
    if (authData === null) {
      console.log('If auth data null then fetch from localStorage ');
      setUser(JSON.parse(localStorage.getItem('profile')));
      //JWT...
    } else {
      console.log('When auth data is not null.');
      setUser(authData);
    }
  }, [authData]);

  const logout = () => {
    userLogout();
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img src={memoriesText} alt='memories icon' height='45px ' />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt='memories logo'
          height='40px'
        />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              scr={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {' '}
              {user.result.name}{' '}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
