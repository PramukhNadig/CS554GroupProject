import React, { useState } from 'react';
import { Container, Grid, TextField, IconButton, Paper, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import cookies from '../helpers/cookies';


function Assistant() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    if (cookies.doesExist("username") === false) {
        return (<Navigate to="/login" />);
    }

    const sendRequest = async (request: string) => {
        try {
            setResponse("Loading...");

          const completion = await axios.post("https://librelearn-backend-a.herokuapp.com/v1/assistant", {
              "input": request,
            
});

            setResponse(completion.data);

        } catch (e) {
            setResponse("Error Occurred.");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendRequest(input);
    };

    const handleClear = () => {
        setInput('');
    };      

  return (
    
    <Container sx={{ paddingTop: '2rem' }}>
      <Typography variant="h1" align="center">
        </Typography>
        <Typography variant="h2" align="center">         
            I am your virtual assistant, ask me anything!
          </Typography>
          <br />
          <br />
        <br />
        
          <form onSubmit={handleSubmit}>
          
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={6}>
                <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                variant="outlined"
                fullWidth
                autoComplete="off"
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <label id='icon'>
                        <IconButton onClick={handleClear} id='icon'>
                            <ClearIcon id='clear' />
                        </IconButton>
                        </label>
                    </InputAdornment>
                    ),
                }}
                />
            </Grid>
            <Grid item>
                <IconButton type="submit">
                <SearchIcon />
                </IconButton>
            </Grid>
            </Grid>
          </form>
          <br />
          <br />
          <Paper elevation={16} sx={{ padding: '20px' }}>
            {response}
          </Paper>
      </Container>
      );
}

export default Assistant;
