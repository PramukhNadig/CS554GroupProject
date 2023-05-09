import { Container, Grid } from "@mui/material";
import cookies from "../helpers/cookies";
import HomeList from "../components/HomeList";

function Home() {

  const username:string = cookies.getCookie("username") || "test";

  if (username === null ||username === undefined || username === "" || cookies.getCookie("id") === undefined || cookies.getCookie("id") === "" || cookies.getCookie("id") === null) {
    return (
        <div>
          <h1>Welcome!</h1>
          <h2>Log in to view your sets</h2>
        </div>
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
