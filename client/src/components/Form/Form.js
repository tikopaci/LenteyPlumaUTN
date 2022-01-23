import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ titulo: '', historia: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(null);
        setPostData({
            titulo: '', historia: '', tags: '', selectedFile: ''
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId === 0) {
            dispatch(createPost({ ...postData, nombre: user?.result?.nombre }, navigate));

            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, nombre: user?.result?.nombre }));
            clear();
        } 
    };

    if(!user?.result?.nombre) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Necesitas loggearte para postear historias!
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editar Historia' : 'Subir una historia'}</Typography>
                <TextField name="titulo" variant="outlined" label="Título" fullWidth value={postData.titulo} onChange={(e) => setPostData({ ...postData, titulo: e.target.value })} />
                <TextField name="historia" variant="outlined" label="Historia" fullWidth value={postData.historia} onChange={(e) => setPostData({ ...postData, historia: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="default" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Borrar</Button>
            </form>
        </Paper>
    );
}

export default Form;