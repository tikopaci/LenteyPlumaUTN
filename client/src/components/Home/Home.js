import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import useStyles from './styles';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getPosts());
      }, [currentId, dispatch]);

    const searchPost = () => {
        if (search.trim()) {
            dispatch(getPostsBySearch({ search }));
            navigate(`/posts/search?searchQuery=${search || 'none'}`);
        } else {
            navigate('/');
        }
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPost();
        }
    };

    return (
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField name="search" variant="outlined" label="Buscar historias" fullWidth value={search} onKeyPress={handleKeyPress} onChange={(e) => {setSearch(e.target.value)}}/>
                                <Button onClick={searchPost} className={classes.search} variant="contained" color="primary">Buscar</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    );
}

export default Home;