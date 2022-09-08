import { useContext, useEffect, memo } from 'react';
import PostContext from '../../context/post/postContext';

import { Grid, CircularProgress, Typography, Paper } from '@material-ui/core';

import useStyles from './styles';
import Post from './Post/Post';
const Posts = () => {
  const classes = useStyles();

  const postContext = useContext(PostContext);
  const { posts, currentId, loading } = postContext;

  console.log('All Posts', posts);

  useEffect(() => {
    console.log('useEffect in Posts');
  }, [currentId]);

  if (!posts.length && !loading)
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          No Post To Show, try something else.
        </Typography>
      </Paper>
    );

  return loading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} xs={12} sm={12} md={6} lg={6} item>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};
export default memo(Posts);
