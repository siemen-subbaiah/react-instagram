export const initialState = {
  user: null,
  authUser: null,
  posts: null,
  loading: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return { ...state, user: action.payload };
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'AUTHENTICATED':
      return { ...state, authUser: action.payload };
    case 'GET_POSTS':
      return { ...state, posts: action.payload, loading: false };
    case 'NOT-AUTHENTICATED':
      return { ...state, authUser: null };
    case 'LOADING':
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};
