/** @format */

import Set from "../components/Set";
import axios from "axios";
import { useQuery } from "react-query";
import { Box, Grid } from "@mui/material";
import cookies from "../helpers/cookies";

function App() {
  const { data } = useQuery(["MySets"], () => {
    return axios.get("http://localhost:4000/v1/sets/my/" + cookies.getCookie("username")).then((res) => {
      console.log(res.data)
      return res.data;
    });
  });

  if (cookies.doesExist("username") === false) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <h1>My Sets</h1>
        <h2>Log in to view your sets</h2>
      </Box>
    );
  }

  if(data?.length === 0){
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <h1>My Sets</h1>
        <h2>You have no sets!</h2>
      </Box>
    );
  }
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {data?.map((v: any) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={v.id}>
              <Set
                subject={v?.subject}
                title={v?.title}
                description={v?.description}
                cards={v?.cards}></Set>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default App;
