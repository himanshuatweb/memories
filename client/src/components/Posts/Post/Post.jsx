import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContext from '../../../context/post/postContext';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from '@material-ui/core';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import moment from 'moment';

import useStyles from './styles';
const Post = ({ post }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const postContext = useContext(PostContext);
  const { setCurrentID, deletePost, updateLike } = postContext;

  const openPost = () => {
    navigate(`/posts/${post._id}`);
    // <Navigate to={`/posts/${post._id}`} replace />;
  };

  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component='div'
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          // image={post.selectedFile}
          image={
            post.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: '#fff' }}
            size='small'
            onClick={() => setCurrentID(post._id)}
          >
            <MoreHorizIcon fontSize='medium' />
          </Button>
        </div>
      )}
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => updateLike(post._id)}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size='small'
            color='primary'
            onClick={() => deletePost(post._id)}
          >
            <DeleteIcon fontSize='small' /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default Post;
