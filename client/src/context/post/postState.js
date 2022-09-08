import { useReducer } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';

import {
  GET_ALL_POST,
  DELETE_POST,
  UPDATE_LIKE,
  UPDATE_POST,
  SET_ID,
  SET_LOADING,
  POST_ERROR,
  CREATE_POST,
  CLEAR_EDIT_POST,
  FETCH_BY_SEARCH,
  FETCH_SINGLE_POST,
  COMMENT_POST,
} from '../types';

const PostState = (props) => {
  const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: null,
    currentId: null,
    editPost: null,
    currentPage: null,
    numberOfPages: null,
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  const url = 'http://localhost:5000/posts';

  const API = axios.create({ baseURL: `http://localhost:5000` });
  API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem('profile')).token
      }`;
    }
    return req;
  });

  //Get Posts
  const getPosts = async (page) => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      console.log('In getPosts(page)', page);
      const { data } = await API.get(`/posts?page=${page}`);
      console.log(data);

      dispatch({
        type: GET_ALL_POST,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: POST_ERROR,
        paylaod: error,
      });
    }
  };

  //Get Single Post By ID.
  const getSinglePost = async (id) => {
    try {
      console.log(id);
      dispatch({
        type: SET_LOADING,
      });
      const { data } = await API.get(`/posts/${id}`);
      dispatch({
        type: FETCH_SINGLE_POST,
        payload: data,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: POST_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  //Get all the posts by search term from Home.jsx
  const getPostsBySearch = async (searchQuery) => {
    try {
      console.log(searchQuery);
      dispatch({
        type: SET_LOADING,
      });
      const { data } = await API.get(
        `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
          searchQuery.tags
        }`
      );
      console.log(data);
      dispatch({
        type: FETCH_BY_SEARCH,
        payload: data,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: POST_ERROR,
        paylaod: error.response.data.message,
      });
    }
  };

  //Create Post
  const createPost = async (newPost) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      console.log(newPost);
      //Send data to backend-server(newPost) using axios.
      // const { data } = await axios.post(url, newPost);
      const { data } = await API.post('/posts', newPost);
      console.log(data);
      dispatch({
        type: CREATE_POST,
        payload: data,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: POST_ERROR,
        paylaod: error.response.data.message,
      });
    }
  };

  //Set CurrentID
  const setCurrentID = (id) => {
    try {
      dispatch({
        type: SET_ID,
        payload: id,
      });
    } catch (error) {
      console.log('Cannot set currentId ', error.message);
    }
  };

  //Create Post
  const updatePost = async (updatePost) => {
    try {
      const { data } = await API.patch(`${url}/${state.currentId}`, updatePost);
      dispatch({
        type: UPDATE_POST,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: POST_ERROR,
        paylaod: error,
      });
    }
  };

  //Delete Post
  const deletePost = async (id) => {
    try {
      console.log(id);
      await API.delete(`${url}/${id}`);
      dispatch({
        type: DELETE_POST,
        payload: id,
      });

      getPosts(1);
    } catch (error) {
      console.log(error);
      dispatch({
        type: POST_ERROR,
        paylaod: error,
      });
    }
  };

  //Like Post
  const updateLike = async (id) => {
    try {
      const { data } = await API.patch(`${url}/${id}/likePost`);
      dispatch({
        type: UPDATE_LIKE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: POST_ERROR,
        paylaod: error,
      });
    }
  };

  //Clear Edit Post
  const clearEditPost = () => {
    dispatch({
      type: CLEAR_EDIT_POST,
    });
  };

  //Comment on Post
  const commentOnPost = async (id, finalComment) => {
    try {
      console.log('Comment Received', finalComment);

      const { data } = await API.post(`/posts/${id}/comment`, {
        comment: finalComment,
      });

      dispatch({
        type: COMMENT_POST,
        payload: data,
      });

      return data.comments;
    } catch (error) {
      console.log(error);
      dispatch({
        type: POST_ERROR,
        paylaod: error,
      });
    }
  };

  return (
    <PostContext.Provider
      value={{
        post: state.post,
        posts: state.posts,
        loading: state.loading,
        error: state.error,
        currentId: state.currentId,
        editPost: state.editPost,
        currentPage: state.currentPage,
        numberOfPages: state.numberOfPages,
        getPosts,
        createPost,
        updatePost,
        deletePost,
        setCurrentID,
        clearEditPost,
        updateLike,
        getPostsBySearch,
        getSinglePost,
        commentOnPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
