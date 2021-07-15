import React from 'react';
import { useContext } from 'react';
import Home from './components/Home';
import Landing from './components/Landing';
import { StateContext } from './StateProvider';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Button } from '@material-ui/core';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
    width: '28%',
    outline: 'none',
  },
}));

const App = () => {
  const { authUser } = useContext(StateContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <>
      {authUser ? (
        <>
          <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <div className={classes.paper}>
              <div className='text-center'>
                <p>
                  Now you can delete your own posts by clicking the more option
                  button!
                </p>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => setOpen(false)}
                >
                  Got you!
                </Button>
              </div>
            </div>
          </Modal>
          <Home />
        </>
      ) : (
        <Landing />
      )}
    </>
  );
};

export default App;
