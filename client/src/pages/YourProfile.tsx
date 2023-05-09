/** @format */

import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import cookies from "../helpers/cookies";

function App() {
  const user = cookies.getCookie("username");
  const { data: owned } = useQuery(["MySets"], () => {
    return axios.get("http://localhost:4000/v1/sets/sets/" + user).then((res) => {
      console.log(res.data)
      return res.data;
    });
  });
  const { data: saved } = useQuery(["SavedSets"], () => {
    return axios.get("http://localhost:4000/v1/sets/saved/" + user).then((res) => {
      console.log(res.data.saved_sets)
      return res.data.saved_sets;
    });
  });

  if (cookies.doesExist("username") === false) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant='h1'>My Profile</Typography>
        <Typography variant='h2' sx={{ mt: 2 }}>
          Log in to view your profile
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant='h1'>My Profile</Typography>
      <Typography variant='h2' sx={{ mt: 2 }}>
        Username: {user}
      </Typography>
      <Typography variant='h3' sx={{ mt: 2 }}>
        User Made Sets:
      </Typography>
      <Typography variant='h4' sx={{ mt: 2 }}>
        {owned && owned.map((set: any) => (
          <li key={set.setId}>{set.title}</li>
        ))}
      </Typography>
      <Typography variant='h5' sx={{ mt: 2 }}>
        Saved Sets: {saved && saved.map((set: any) => (
          <li key={set.setId}>{set.title}</li>
        ))}
      </Typography>
    </Box>
  );
}

export default App;
