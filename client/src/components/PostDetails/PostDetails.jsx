import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CommentSection from './CommentSection';

import PostContext from '../../context/post/postContext';

import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import moment from 'moment';

import useStyles from './styles';

const PostDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const postContext = useContext(PostContext);
  const { post, posts, loading, error, getSinglePost, getPostsBySearch } =
    postContext;

  useEffect(() => {
    console.log('i ran on id changes');
    getSinglePost(id);
  }, [id]);

  // useEffect(() => {
  //   if (post) {
  //     console.log('i ran on post changes');
  //     getPostsBySearch({ search: 'none', tags: post?.tags.join(',') });
  //   }
  // }, [post]);

  let recommendedPosts = [];
  if (posts && post) {
    recommendedPosts = posts.filter((eachPost) => eachPost._id !== post._id);
  }
  console.log(recommendedPosts);

  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  };

  if (loading) {
    console.log('In loading pd');
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <Typography variant='h6' align='center'>
          {error}
        </Typography>
      </Paper>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h3' component='h2'>
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant='h6'
            color='textSecondary'
            component='h2'
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant='body1' component='p'>
            {post.message}
          </Typography>
          <Typography variant='h6'>Created by: {post.name}</Typography>
          <Typography variant='body1'>
            {moment(post.createdAt).fromNow()}
          </Typography>

          <Divider style={{ margin: '20px 0' }} />

          <CommentSection post={post} />

          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>
      {/*RECOMMENDED POST LOGIC HERE*/}
      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          {console.log('I run recommendedPosts')}
          <Typography gutterBottom variant='h5'>
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: '20px', cursor: 'pointer' }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant='h6'>
                    {title}
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    {name}
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    {message}
                  </Typography>
                  <Typography gutterBottom variant='subtitle1'>
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width='200px' alt='' />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};
export default PostDetails;
