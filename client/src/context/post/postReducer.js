import {
  CLEAR_EDIT_POST,
  CREATE_POST,
  DELETE_POST,
  GET_ALL_POST,
  POST_ERROR,
  SET_ID,
  SET_LOADING,
  UPDATE_LIKE,
  UPDATE_POST,
  FETCH_BY_SEARCH,
  FETCH_SINGLE_POST,
  COMMENT_POST,
} from '../types';

const postReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      console.log('Set Loading Reducer Run');
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_POST:
      console.log('GET ALL POST Reducer Run');
      return {
        ...state,
        posts: action.payload.data,
        post: null,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        loading: false,
        error: null,
      };
    case FETCH_SINGLE_POST:
      console.log('GET SINGLE POST Reducer Run');
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_BY_SEARCH:
      console.log('FETCH BY SEARCH Reducer Run');
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_POST:
      console.log('CREATE_POST Reducer Run');
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };

    case UPDATE_POST:
    case UPDATE_LIKE:
      console.log('UPDATE_POST Reducer Run');
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        loading: false,
      };
    case DELETE_POST:
      console.log('DELETE_POST Reducer Run');
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };

    case SET_ID:
      console.log('SET_ID Reducer Run');
      return {
        ...state,
        currentId: action.payload,
        editPost: state.posts.find((post) =>
          post._id === action.payload ? post : null
        ),
      };
    case CLEAR_EDIT_POST:
      console.log('CLEAR_EDIT_POST Reducer Run');
      return {
        ...state,
        editPost: null,
        currentId: null,
      };
    case POST_ERROR:
      console.log('POST_ERROR reducer run');
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case COMMENT_POST:
      console.log('COMMENT_POST reducer run', action.payload);
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    default:
      return state;
  }
};

export default postReducer;
