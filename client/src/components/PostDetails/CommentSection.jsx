import { useState, useContext, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';

import PostContext from '../../context/post/postContext';

import useStyles from './styles';

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const postContext = useContext(PostContext);
  const { commentOnPost } = postContext;

  const [comments, setComments] = useState(post.comments ? post.comments : []);
  const [comment, setComment] = useState('');

  const commentsRef = useRef();

  const handleClick = async () => {
    //dispatch commentPost action.
    //1. grab the user, who is commenting, -> from localstorage.
    const finalComment = `${user?.result?.name}: ${comment}`;
    const updatedComments = await commentOnPost(post._id, finalComment);
    setComments(updatedComments);
    setComment('');

    commentsRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant='h6'>
            Comments
          </Typography>
          {comments.map((comment, index) => (
            <Typography key={index} gutterBottom variant='subtitle1'>
              <strong> {comment.split(': ')[0]}</strong> {comment.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant='h6'>
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              maxRows={4}
              variant='outlined'
              label='Comment'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment}
              variant='contained'
              onClick={handleClick}
              color='primary'
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CommentSection;
