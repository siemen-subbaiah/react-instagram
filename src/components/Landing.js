import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import landing from '../assets/landing.png';
import logo from '../assets/logo.png';
import { StateContext } from '../StateProvider';

const Landing = () => {
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signinUser, loginUser } = useContext(StateContext);

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password && name) {
      signinUser(email, password, name);
    } else {
      alert('please enter all the data');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser(email, password);
    } else {
      alert('please enter all the data');
    }
  };

  return (
    <div className='landing'>
      <div className='d-flex my-5 justify-content-center align-items-center flex-lg-row flex-column'>
        <img
          src={landing}
          alt='landing-png'
          className='img-fluid landing-img d-none d-lg-block'
        />
        <div className='cred-area ml-0 ml-lg-5'>
          <div className='d-flex justify-content-center'>
            <img src={logo} alt='logo' className='img-fluid logo' />
          </div>
          {toggle ? (
            <div className='signup-form'>
              <Form onSubmit={handleSignup}>
                <Form.Group controlId='formBasicName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant='primary' type='submit' className='btn-block'>
                  Sign up
                </Button>
              </Form>
            </div>
          ) : (
            <div className='login-form'>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant='primary' type='submit' className='btn-block'>
                  Log In
                </Button>
              </Form>
            </div>
          )}
          {toggle ? (
            <div className='my-3 text-center'>
              <p>Already have an account?</p>
              <span
                className='text-primary'
                style={{ cursor: 'pointer' }}
                onClick={() => setToggle(!toggle)}
              >
                Login
              </span>
            </div>
          ) : (
            <div className='my-3 text-center'>
              <p>New to Instagram?</p>
              <span
                className='text-primary'
                style={{ cursor: 'pointer' }}
                onClick={() => setToggle(!toggle)}
              >
                Signup
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
