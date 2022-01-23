import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { login, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const initialState = { nombre: '', apellido: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [form, setForm] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const handleMostrarPassword = () => setMostrarPassword(!mostrarPassword);

    const cambiarModo = () => {
        setForm(initialState);
        setIsRegistered((prevRegistered) => !prevRegistered);
        setMostrarPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isRegistered) {
            dispatch(signup(form, navigate));
        } else {
            dispatch(login(form, navigate));
        }
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });

            navigate('/'); // envía al home una vez loggeado

        } catch (error) {
            console.error(error);
        }
    };

    const googleFailure = () => alert('No se pudo loggear con Google. Pruebe mas tarde');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isRegistered ? 'Registrarse' : 'Log In' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isRegistered && (
                            <>
                                <Input name="nombre" label="Nombre" handleChange={handleChange} autoFocus half />
                                <Input name="apellido" label="Apellido" handleChange={handleChange} half />
                            </>   
                            )}
                            <Input name="email" label="Email" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={ mostrarPassword ? "text" : "password" } handleMostrarPassword={handleMostrarPassword}/>
                            { isRegistered && <Input name="confirmPassword" label="Confirmar contraseña" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isRegistered ? 'Registrarse' : 'Entrar'}
                    </Button>
                    <GoogleLogin 
                        clientId="733159232199-lmp2rtbbpq3ortiv04tumitmfptk370t.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} variant="contained" color="primary" fullWidth onClick={renderProps.onClick} startIcon={<Icon />}>
                                Logearse con Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Button onClick={cambiarModo}>
                              { isRegistered ? "Si ya tienes cuenta, loggeate" : "¿No tienes cuenta? Registrate!"} 
                        </Button> 
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;
