/** @format */

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Alert
} from "@mui/material";
import { Navigate } from "react-router-dom";
import cookies from '../helpers/cookies';
import { Link as RouterLink } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  if (cookies.doesExist("username") === true) {
    return (<Navigate to="/" />);
  }

  const alert = () => {
    if (errorMessage) {
      return <Alert severity='error'>{errorMessage}</Alert>;
    }
  };

  return (
    <Container component='main' maxWidth='sm'>
      {alert()}
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const theUsername = (e.target as any).username.value;
              const thePassword = (e.target as any).password.value;
              const theEmail = (e.target as any).email.value;
              if (typeof theUsername != 'string' || theUsername.length < 4) {
                setErrorMessage("Username must be at least a 4 letter string.");
                return;
              }
              const username_regex = /^[a-zA-Z0-9]+$/;
              const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              if (!username_regex.test(theUsername)) {
                setErrorMessage("Username can only be letters and numbers.");
                return;
              }

              if (!email_regex.test(theEmail)) {
                setErrorMessage("Invalid email format. e.g. : example@example.com")
                return;
              }

              if (typeof thePassword != 'string' || thePassword.length < 6) {
                setErrorMessage("Password must be at least a 6 character string.");
                return;
              }

            await axios.post("http://localhost:4000/v1/users/signup", {
              username: (e.target as any).username.value,
              password: (e.target as any).password.value,
              email: (e.target as any).email.value,
            });
            navigate("/login");
          } catch (e) {
            setErrorMessage("There is already a user with this name.");
            return;
          }
          }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
          <Link component={RouterLink} to="/login">
              Already have an account? Log In
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignUp;
