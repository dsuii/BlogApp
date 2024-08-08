import axios from 'axios';
export const FETCH_BLOGS_REQUEST = 'FETCH_BLOGS_REQUEST';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';
const fetchBlogsRequest = () => ({
  type: FETCH_BLOGS_REQUEST,
});

const fetchBlogsSuccess = (blogs) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: blogs,
});

const fetchBlogsFailure = (error) => ({
  type: FETCH_BLOGS_FAILURE,
  payload: error,
});
export const fetchBlogs = () => {
  return async (dispatch) => {
    dispatch(fetchBlogsRequest());
    try {
      const response = await axios.get('http:localhost:8000/getblogs');
      dispatch(fetchBlogsSuccess(response.data));
    } catch (error) {
      dispatch(fetchBlogsFailure(error.message));
    }
  };
};
