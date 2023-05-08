/** @format */

import React from "react";
import { Box, Typography } from "@mui/material";

import { useQuery } from "react-query";
import axios from "axios";

function App() {
  const { data } = useQuery(["MySets"], () => {
    return axios.get("http://localhost:4000/v1/users/auth").then((res) => {
      return res.data;
    });
  });

  if (data === undefined) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant='h4'>My Profile</Typography>
        <Typography variant='h6' sx={{ mt: 2 }}>
          Log in to view your profile
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant='h4'>My Profile</Typography>
      <Typography variant='h6' sx={{ mt: 2 }}>
        Username: {data.username}
      </Typography>
      <Typography variant='h6' sx={{ mt: 2 }}>
        Age: {data.age}
      </Typography>
      <Typography variant='h6' sx={{ mt: 2 }}>
        Email: {data.email}
      </Typography>
      <Typography variant='h6' sx={{ mt: 2 }}>
        User Made Set: {data.owned_sets}
      </Typography>
      <Typography variant='h6' sx={{ mt: 2 }}>
        Save Set: {data.saved_sets}
      </Typography>
    </Box>
  );
}

export default App;
