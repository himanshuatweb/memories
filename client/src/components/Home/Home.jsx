import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useContext } from 'react';

import PostContext from '../../context/post/postContext';

import {
  Grow,
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';

import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import useStyles from './styles';

const Home = () => {
  const classes = useStyles();

  const postContext = useContext(PostContext);
  const { getPostsBySearch } = postContext;

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // const page = searchParams.get('page') || 1;
  const [page, setPage] = useState(1);

  console.log('Page Value Now, ', page);

  const searchQuery = searchParams.get('searchQuery');

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags.length) {
      //dispatch in postState -> fetch search post
      console.log('In searchPost() if block');
      // getPostsBySearch({ search, tags: tags.join(',') });
      getPostsBySearch({ search, tags: tags.join(',') });

      navigate(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      );
    } else {
      console.log('In searchPost() else block');
      navigate('/');
    }
  };

  return (
    <Grow in>
      <Container maxwidth='xl'>
        <Grid
          container
          className={classes.gridContainer}
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                value={search}
                // onChange={(e) => setSearch(e.target.value)}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUpCapture={handleKeyPress}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search Tags'
                variant='outlined'
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color='primary'
                variant='contained'
              >
                Search
              </Button>
            </AppBar>
            <Form />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} setPage={setPage} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default Home;
