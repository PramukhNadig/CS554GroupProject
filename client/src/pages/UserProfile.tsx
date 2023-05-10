import { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import ShowSets from "../components/ShowSets";

function App() {
  const [displayedSets, setDisplayedSets] = useState([]);
  const user = useParams().user;
  let fourohfour = false;
  const { data: owned } = useQuery(["MySets"], () => {
    return axios
      .get("http://localhost:4000/v1/sets/my/" + user)
      .then((res) => {
        if (res.status === 404) {
          fourohfour = true;
          return [];
        }
        console.log(res.data);
        return res.data;
      });
  });

  useEffect(() => {
    if (owned) {
      setDisplayedSets(owned);
    }
  }, [owned]);


  if (fourohfour) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h1" sx={{ mt: 2 }}>
          User not found
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h1" sx={{ mt: 2 }}>
          {user}
        </Typography>
        <Typography variant="h2" sx={{ mt: 2 }}>
          User-Made Sets:
        </Typography>
        <Box sx={{ mt: 4 }}>
          {owned && owned?.length === 0 && <p>user has no sets</p>}
          {owned && owned?.length > 0 && (
            <ShowSets sets={displayedSets} onSetDeleted={(setId) => setDisplayedSets(displayedSets.filter((set: any) => set._id !== setId))} />
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
