import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { delPost, likePost } from '../../../actions/posts';
import useStyles from './styles';
    
const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    
    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `A ti y a ${post.likes.length - 1} más les gusta` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

    const abrirPost = () => navigate(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={6}>
        <ButtonBase component="span" name="test" className={classes.cardAction} onClick={abrirPost}>
            <CardMedia className={classes.media} image={post.selectedFile} tittle={post.titulo} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.nombre}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" component="h2" gutterBottom>{post.titulo}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.historia.length > 100 ? post.historia.substring(0, 120) : post.historia }</Typography>
            </CardContent>
            </ButtonBase>
            {(user?.result?.googleId === post?.autor || user?.result?._id === post?.autor) && (
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            )}
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.autor || user?.result?._id === post?.autor) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(delPost(post._id))}>
                        <DeleteIcon fontSize="small" /> Eliminar
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;