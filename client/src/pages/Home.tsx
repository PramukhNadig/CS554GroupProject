import { Container, Grid, Typography } from "@mui/material";
import cookies from "../helpers/cookies";
import HomeList from "../components/HomeList";
import StyleIcon from '@mui/icons-material/Style';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Link } from 'react-router-dom';

function Home() {

  const username:string = cookies.getCookie("username") || "";

  if (cookies.doesExist("username") === false) {
    return (
        <Container sx={{py: '20px'}}>
          <h1>Welcome</h1>
          <h2>LibreLearn was created under one vision: make learning tools free.</h2>
          <br />
          <br />
          <br />
          <Typography variant="h4">We offer: </Typography>
          <br />
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StyleIcon sx={{ fontSize: "3rem" }} />
              <Typography variant="h4" sx={{ pl: 3 }}>Flashcards that are easy to make, use, and find.</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PsychologyIcon sx={{ fontSize: "3.5rem"}} />
              <Typography variant="h4" sx={{ pl: 2 }}>A virtual assistant powered by AI technology.</Typography>
            </div>
          </>
          <br />
          <br />
          <br />
          <div>
          <Link to="/login" style={{display: 'inline'}}>Log in</Link>
          <p style={{display: 'inline'}}> to enjoy all the features or </p>
          <Link to="/signup" style={{display: 'inline'}}>sign up</Link>
          <p style={{display: 'inline'}}> today and join our community.</p>
        </div>

  
        </Container>
    );
  }

  return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HomeList name={username} />
          </Grid>
        </Grid>
      </Container>
    );
  };

export default Home;
