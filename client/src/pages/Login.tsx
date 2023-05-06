/** @format */

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@mui/material";

import setCookie from "../helpers/cookies";
import cookies from "../helpers/cookies";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const alert = () => {
    if (errorMessage) {
      return <Alert severity='error'>{errorMessage}</Alert>;
    }
  };

  const successAlert = () => {
    if (successMessage) {
      return <Alert severity='success'>{successMessage}</Alert>;
    }
  };

  return (
    <div className='app'>
      {successAlert()}
      {alert()}
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
            Login
          </Typography>
          <Box
            component='form'
            onSubmit={async (e) => {
              let id = "";
              e.preventDefault();
              try {
                let result = await axios.post(
                  "http://localhost:4000/v1/users/login",
                  {
                    username: (e.target as any).username.value,
                    password: (e.target as any).password.value,
                    //add more if we need
                  }
                );
                id = result.data._id;
              } catch (err) {
                setErrorMessage("Invalid username or password");
                return;
              }
              setErrorMessage("");
              setSuccessMessage("Login successful");
              cookies.setCookie(
                "username",
                (e.target as any).username.value,
                1
              );
              cookies.setCookie("id", id, 1);
              setTimeout(() => {
                navigate("/");
              }, 1000);
            }}
            sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
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
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default App;
