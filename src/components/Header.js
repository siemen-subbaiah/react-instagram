import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { StateContext } from '../StateProvider';
import instagram from '../assets/logo.png';
import { Avatar } from '@material-ui/core';

const Header = ({ handleOpen }) => {
  const { logoutUser, authUser } = useContext(StateContext);
  return (
    <div className='app__header'>
      <div className='container app__flex'>
        <img className='app__headerImage2' src={instagram} alt='logo' />
        <div className='d-flex btns my-2 my-lg-0'>
          <Avatar className='avt mr-3'>
            {authUser?.displayName?.charAt(0).toUpperCase()}
          </Avatar>
          <Button
            className='mr-2'
            variant='outline-primary'
            onClick={handleOpen}
          >
            New Post
          </Button>
          <Button onClick={logoutUser}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
