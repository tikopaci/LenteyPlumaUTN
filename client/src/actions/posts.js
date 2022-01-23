import { FETCHALL, FETCHPOST, FETCHBYSEARCH, STARTLOADING, ENDLOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api/index.js';
 
// Creador de accion con redux thunk para manejar promesas
export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: STARTLOADING });
        const { data } = await api.fetchPosts();
        console.log(data);

        dispatch({ type: FETCHALL, payload: data });
        dispatch({ type: ENDLOADING });
    } catch (error) {
        console.error(error);
    }
};

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: STARTLOADING });
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCHPOST, payload: data });
        dispatch({ type: ENDLOADING });
    } catch (error) {
        console.error(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: STARTLOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCHBYSEARCH, payload: data });
        dispatch({ type: ENDLOADING });
    } catch (error) {
        console.error(error);
    }    
};

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: STARTLOADING });
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
        navigate(`/posts/${data._id}`);
    } catch (error) {
        console.error(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.error(error);
    }
};

export const delPost = (id) => async (dispatch) => {
    try {
        await api.delPost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.error(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.error(error);
    }
};

