/* eslint-disable import/no-anonymous-default-export */
import { FETCHALL, FETCHBYSEARCH, FETCHPOST, STARTLOADING, ENDLOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case STARTLOADING:
            return { ...state, isLoading: true };
        case ENDLOADING:
            return { ...state, isLoading: false };
        case FETCHALL:
            return { ...state, posts: action.payload };
        case FETCHBYSEARCH:
            return { ...state, posts: action.payload };
        case FETCHPOST:
            return { ...state, post: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
};
