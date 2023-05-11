import {useState, useEffect} from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import cookies from "../helpers/cookies";
import { Navigate } from "react-router-dom";
import { Container} from "react-bootstrap";
import ShowSets from "../components/ShowSets";

function App() {
  const [displayedSets, setDisplayedSets] = useState<string[]>([]);
  const [fourohfour, setFourohfour] = useState(false);
  const user = cookies.getCookie("username");

  const { data: owned } = useQuery(["MySets"], () => {
    return axios.get("https://librelearn-backend-aa.herokuapp.com/v1/sets/my/" + user).then((res) => {
      if (res.status === 404) { 
        setFourohfour(true);
        return [];
      };
      return res.data;
    });
  });

  useEffect(() => {

    if (owned) {
      setDisplayedSets(owned);
    }
  }, [owned]);

  if (cookies.doesExist("username") === false) {
    return (<Navigate to="/login" />);
  }

  if (fourohfour) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant='h1' sx={{ mt: 2 }}>
          User not found
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant='h1' sx={{ mt: 2 }}>
          {user}
        </Typography>
        <Typography variant='h2' sx={{ mt: 2 }}>
          User-Made Sets:
        </Typography>
        <Box sx={{ mt: 4 }}>
          {owned && owned?.length === 0 && <p>user has no sets</p>}
          {owned && owned?.length > 0 && <ShowSets
            sets={displayedSets}
            onSetDeleted={(setId) => setDisplayedSets(displayedSets.filter((set: any) => set._id !== setId))}
          />}
        </Box>
      </Box>
    </Container>
  );
}


export default App;
