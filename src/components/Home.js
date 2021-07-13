import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { StateContext } from '../StateProvider';
import Header from './Header';
import Posts from './Posts';
import ModalComp from './ModalComp';
import Spinner from './Spinner';

const Home = () => {
  const { getPosts, posts, loading } = useContext(StateContext);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    getPosts();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='home'>
      <Header handleOpen={handleOpen} />
      <ModalComp open={open} setOpen={setOpen} />
      {loading ? (
        <Spinner />
      ) : (
        posts &&
        posts.map((post, i) => {
          return (
            <Posts
              key={i}
              id={post.id}
              img={post.post.image}
              caption={post.post.caption}
              username={post.post.username}
              timestap={post.post.timestap}
            />
          );
        })
      )}
    </div>
  );
};

export default Home;
