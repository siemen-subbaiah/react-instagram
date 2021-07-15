import React, { useContext } from 'react';
import { Avatar } from '@material-ui/core';
import { BsBookmark, BsHeart } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiShareBoxFill } from 'react-icons/ri';
import { useState } from 'react';
import { db } from '../firebase';
import { useEffect } from 'react';
import { StateContext } from '../StateProvider';
import firebase from 'firebase';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

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

const Posts = ({ username, img, caption, id, timestap, authId }) => {
  const classes = useStyles();

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { authUser } = useContext(StateContext);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (id) {
      db.collection('posts')
        .doc(id)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot(
          (snapshot) => {
            setComments(snapshot.docs.map((doc) => doc.data()));
          },
          (err) => console.log(err.message)
        );
    }
  }, [id]);

  const addComment = (e) => {
    e.preventDefault();
    db.collection('posts').doc(id).collection('comments').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: comment,
      username: authUser.displayName,
    });
    setComment('');
  };

  const handleDelete = () => {
    db.collection('posts').doc(id).delete();
    setOpen(false);
  };

  return (
    <div className='post'>
      <div className='post__header'>
        <div className='d-flex align-items-center'>
          <Avatar className='post__avatar'>
            {username?.charAt(0).toUpperCase()}
          </Avatar>
          <h6>{username}</h6>
        </div>
        <FiMoreHorizontal className='single-icons' onClick={handleOpen} />
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
            <div
              className='d-flex justify-content-center align-items-center flex-column text-center'
              style={{ cursor: 'pointer' }}
            >
              {authId === authUser.uid && (
                <div
                  style={{ borderBottom: '1px solid black', width: '100%' }}
                  onClick={handleDelete}
                >
                  <p style={{ color: '#EF5E6A', fontWeight: 'bold' }}>Delete</p>
                </div>
              )}
              <div onClick={() => setOpen(false)}>
                <p>Cancel</p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <img className='post__image' src={img} alt='insta-pic' />
      <div className='post__icons'>
        <BsHeart className='single-icons' />
        <FaRegComment className='single-icons' />
        <RiShareBoxFill className='single-icons' />
        <BsBookmark className='post__bookmark' />
      </div>
      <h6 className='post__caption'>
        <strong>{username}</strong> {caption}
      </h6>
      {comments.length > 0 && <span className='comment-h pl-2'>comments</span>}
      {comments.map((comment) => (
        <p key={Math.random()} className='pl-2 my-1'>
          <strong>{comment.username}</strong> {comment.text}
        </p>
      ))}

      <span className='comment-h pl-2 time'>
        {timestap && moment(timestap.toDate()).fromNow()}
      </span>

      <form className='post__comment'>
        <input
          className='post__comment-input'
          type='text'
          placeholder='enter comment'
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button
          className='post__comment-button btn-primary'
          type='submit'
          disabled={!comment}
          onClick={addComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Posts;
