import React, { createContext, useEffect } from 'react';
import { useReducer } from 'react';
import { auth, db } from './firebase';
import { initialState, reducer } from './reducer';

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'AUTHENTICATED', payload: user });
      } else {
        dispatch({ type: 'NOT-AUTHENTICATED' });
      }
    });
    return () => unsubscribe();
  }, []);

  const getPosts = () => {
    dispatch({ type: 'LOADING' });
    db.collection('posts')
      .orderBy('timestap', 'desc')
      .onSnapshot((snapshot) => {
        dispatch({
          type: 'GET_POSTS',
          payload: snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          })),
        });
      });
  };

  const signinUser = async (email, password, username) => {
    try {
      const authUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      authUser.user.updateProfile({
        displayName: username,
      });
      dispatch({ type: 'SIGNIN', payload: authUser });
    } catch (error) {
      alert(error.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const authUser = await auth.signInWithEmailAndPassword(email, password);
      dispatch({ type: 'LOGIN', payload: authUser });
    } catch (error) {
      alert(error.message);
    }
  };

  const logoutUser = () => auth.signOut();

  return (
    <StateContext.Provider
      value={{ ...state, getPosts, signinUser, loginUser, logoutUser }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
