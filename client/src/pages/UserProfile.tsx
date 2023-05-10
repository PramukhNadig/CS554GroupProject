/** @format */

import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import cookies from "../helpers/cookies";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";

function App() {
  const user = useParams().user;
  let fourohfour = false;
  const { data: owned } = useQuery(["MySets"], () => {
    return axios.get("http://localhost:4000/v1/sets/my/" + user).then((res) => {
      if (res.status === 404) { 
        fourohfour = true;
        return [];
      }
      console.log(res.data)
      return res.data;
    });
  });
  const { data: saved } = useQuery(["SavedSets"], () => {
    return axios.get("http://localhost:4000/v1/sets/savedverbose/" + user).then((res) => {
      if (res.status === 404) {
        fourohfour = true;
        return [];
      }
      console.log(res.data.saved_sets)
      return res.data.saved_sets;
    });
  });

  if (fourohfour) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant='h1'>Profile</Typography>
        <Typography variant='h2' sx={{ mt: 2 }}>
          User not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant='h1'>Profile</Typography>
      <Typography variant='h2' sx={{ mt: 2 }}>
        Username: {user}
      </Typography>
      <Typography variant='h3' sx={{ mt: 2 }}>
        User Made Sets:
      </Typography>
      <Typography variant='h4' sx={{ mt: 2 }}>
        {owned && owned?.length === 0 && "No sets found"}
        {owned && owned?.length > 0 && owned?.map((set: any) => (
          <li key={set._id}>
            <Link href={"/set/" + set._id}>{set.title}</Link>
            </li>
        ))}
      </Typography>
    </Box>
  );
}

export default App;
