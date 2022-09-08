import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import PostContext from '../../context/post/postContext';

import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles';
const Paginate = ({ page, setPage }) => {
  const classes = useStyles();

  const postContext = useContext(PostContext);
  const { getPosts, numberOfPages } = postContext;

  useEffect(() => {
    if (page) {
      console.log('useEffect in Pagination', page);
      getPosts(page);
    }
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant='outlined'
      color='primary'
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
          onClick={() => setPage(item.page)}
        />
      )}
    />
  );
};
export default Paginate;
