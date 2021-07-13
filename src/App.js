import React from 'react';
import { useContext } from 'react';
import Home from './components/Home';
import Landing from './components/Landing';
import { StateContext } from './StateProvider';

const App = () => {
  const { authUser } = useContext(StateContext);
  return <div className='app'>{authUser ? <Home /> : <Landing />}</div>;
};

export default App;
