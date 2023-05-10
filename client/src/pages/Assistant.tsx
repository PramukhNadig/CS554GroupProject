import React, { useState } from 'react';
import { Container, Grid, TextField, IconButton, Paper, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';


function Assistant() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const sendRequest = async (request: string) => {
        try {
            setResponse("Loading...");

          const completion = await axios.post("http://localhost:4000/v1/assistant", {
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
          <Typography variant="h5" align="center">
            I am your virtual assistant, ask me anything!
          </Typography>
          <br />
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={4}>
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  variant="outlined"
                  fullWidth
                  autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClear}>
                        <ClearIcon />
                        </IconButton>
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
