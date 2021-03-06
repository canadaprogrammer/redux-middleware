import { handleActions, createAction } from 'redux-actions';
// using axios
import axios from 'axios';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

const GET_POST = 'GET_POST';
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

// const getPostPending = createAction(GET_POST_PENDING);
// const getPostSuccess = createAction(GET_POST_SUCCESS);
// const getPostFailure = createAction(GET_POST_FAILURE);

// using thunk
// export const getPost = (postId) => dispatch => {
// dispatch(getPostPending());

//     return getPostAPI(postId).then((response) => {
//         dispatch(getPostSuccess(response));

//         return response;
//     }).catch(error => {
//         dispatch(getPostFailure(error));

//         throw(error);
//     });
// }

// using redux-promise-middleware
export const getPost = (postId) => ({
    type: GET_POST,
    payload: getPostAPI(postId)
});
    
// initial reducer
const initialState = {
    pending: false,
    error: false,
    data: {
        title: '',
        body: ''
    }
}

export default handleActions({
    [GET_POST_PENDING]: (state, actions) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_POST_SUCCESS]: (state, actions) => {
        const { title, body } = actions.payload.data;
        return {
            ...state,
            pending:false,
            data: {
                title, body
            }
        };
    },
    [GET_POST_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    }
}, initialState);