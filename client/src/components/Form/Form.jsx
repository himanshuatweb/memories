import { useState, useContext, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';

import FileBase from 'react-file-base64';

import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

const Form = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const user = JSON.parse(localStorage.getItem('profile'));

  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);
  const { createPost, updatePost, currentId, editPost, clearEditPost } =
    postContext;

  const { authData } = authContext;

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  useEffect(() => {
    if (editPost) {
      console.log('runnig edit post useEffect');
      setPostData(editPost);
    }
  }, [editPost, authData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      updatePost({ ...postData, name: user?.result?.name });
    } else {
      createPost({ ...postData, name: user?.result?.name });
    }
    clear();
    navigate('/');
  };

  const onChange = (e) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const clear = () => {
    clearEditPost();
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? 'Editing' : 'Create'} A Memory
        </Typography>

        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={onChange}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={onChange}
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
          style={{ marginBottom: '1rem' }}
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
export default memo(Form);
