import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { db, storage } from '../firebase';
import firebase from 'firebase';
import { StateContext } from '../StateProvider';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '28%',
  },
}));

const ModalComp = ({ open, setOpen }) => {
  const classes = useStyles();
  const { authUser } = useContext(StateContext);

  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // UPLOAD!
  const handleUpload = (e) => {
    e.preventDefault();
    if (caption && image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // PROGRESS LOGIC!
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          alert(error.message);
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection('posts').add({
                timestap: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                image: url,
                username: authUser.displayName,
                authId: authUser.uid,
              });
              setProgress(0);
              setCaption('');
              setImage(null);
              setImagePreview('');
              setOpen(false);
            });
        }
      );
    } else {
      alert('add caption and image!');
    }
  };

  return (
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
      <Fade in={open}>
        <div className={classes.paper}>
          <form>
            <div className='MuiDialogTitle-root'>
              <h5 className='MuiTypography-root MuiTypography-h6 text-center'>
                New Post
              </h5>
              <div className='d-flex justify-content-center'>
                <label htmlFor='contained-button-file' className='upload-file'>
                  <span
                    className='MuiButtonBase-root MuiFab-root upload-file__icon'
                    tabIndex='0'
                    role='button'
                    aria-disabled='false'
                  >
                    <span className='MuiFab-label'>
                      <AddPhotoAlternateIcon className='file-upload' />
                    </span>

                    <span className='MuiTouchRipple-root'></span>
                  </span>
                </label>
                <input
                  id='contained-button-file'
                  name='contained-button-file'
                  type='file'
                  style={{ display: 'none' }}
                  onChange={handleChange}
                ></input>
              </div>
              <div className='text-center my-2'>
                <img src={imagePreview} alt='' className='img-preview' />
              </div>
              {/* <progress value={progress} max='100' style={{ width: '100%' }} /> */}
              <LinearProgress
                variant='determinate'
                value={progress}
                style={{ width: '100%' }}
              />

              <TextField
                id='standard-basic'
                label='caption'
                style={{ width: '100%' }}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <div className='d-flex justify-content-center my-3'>
              <Button
                variant='primary'
                size='sm'
                className='btn-block'
                onClick={handleUpload}
              >
                Post
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalComp;
