/** @format */

import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import cookies from "../helpers/cookies";
import { Navigate } from "react-router-dom";
import Link from "@mui/material/Link";

function App() {
  let fourohfour = false;
  const user = cookies.getCookie("username");
  const { data: owned } = useQuery(["MySets"], () => {
    return axios.get("http://localhost:4000/v1/sets/my/" + user).then((res) => {
      if (res.status === 404) { 
        fourohfour = true;
        return [];
      };
      return res.data;
    });
  });
  const { data: saved } = useQuery(["SavedSets"], () => {
    return axios.get("http://localhost:4000/v1/sets/savedverbose/" + user).then((res) => {
      if (res.status === 404) {
        fourohfour = true;
        return [];
      };
      return res.data.saved_sets;
    });
  });

  if (cookies.doesExist("username") === false) {
    // return (
      // <Box sx={{ textAlign: "center", mt: 4 }}>
      //   <Typography variant='h1'>My Profile</Typography>
      //   <Typography variant='h2' sx={{ mt: 2 }}>
      //     Log in to view your profile
      //   </Typography>
      // </Box>
      return (<Navigate to="/login" />);
  }

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
        {owned && owned?.length === 0 && <p>"No sets found"</p>}
        {owned && owned?.length > 0 && owned?.map((set: any) => (
          <li key={set.setId}>
            <Link href={"/set/" + set._id}>{set.title}</Link>
          </li>
        ))}
      </Typography>
    </Box>
  );
}

export default App;
