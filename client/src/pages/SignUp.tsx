/** @format */

import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import cookies from '../helpers/cookies';
import { Link as RouterLink } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  if (cookies.doesExist("username") === true) {
    return (<Navigate to="/" />);
  }

  return (
    <Container component='main' maxWidth='sm'>
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
            await axios.post("http://localhost:4000/v1/users/signup", {
              username: (e.target as any).username.value,
              password: (e.target as any).password.value,
              email: (e.target as any).email.value,
            });
            navigate("/");
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
