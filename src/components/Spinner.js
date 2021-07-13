import React from 'react';
import spinner from '../assets/spinner.gif';

const Spinner = () => {
  return (
    <div className='d-flex justify-content-center'>
      <img src={spinner} alt='spinner' />
    </div>
  );
};

export default Spinner;
