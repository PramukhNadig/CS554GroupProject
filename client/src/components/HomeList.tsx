import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Set from "./Set";

function App(name: any) {
  const [set, setSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSets = async () => {
      setLoading(true);
      setError(false);
      try {
        let url = "http://localhost:4000/v1/sets/sets/" + name.name;
        url = "http://localhost:4000/v1/sets/sets/test";
        console.log(url);
        const res = await axios.get(url);
        console.log(res.data);
        if (res.data?.length > 5) {
          setSets(res.data.slice(0, 5));
        } else {
          setSets(res.data);
        }
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchSets();
    console.log(name);
  }, [name]);

  const card = (set: any) => (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <h3>{set.subject}</h3>
        </Typography>
        <Typography variant="h5" component="div">
          <h3>{set.title}</h3>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <h3>{set.description}</h3>
        </Typography>
      </CardContent>
    </Card>
  );
  return (
    <div className="App">
      <h1>Home</h1>

      <h2>Sets</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {set.length === 0 && <p>Create a set and it'll show up here!</p>}
      {set.length > 0 &&
        set.map(
          (set: {
            _id: string | number | undefined;
            subject: React.ReactNode;
            title: React.ReactNode;
            description: React.ReactNode;
            owner: React.ReactNode;
            cards: any;
          }) => (
            <div key={set._id}>
              <Set
                subject={set.subject}
                title={set.title}
                description={set.description}
                cards={set.cards}
                owner={set.owner}
                setId={set._id}
              ></Set>
              {/* <Grid item xs={12}>
                        <Box sx={{ minWidth: 275 }}>
                            <Card variant="outlined">{card(Set)}</Card>
                        </Box>
                    </Grid> */}
            </div>
          )
        )}
    </div>
  );
}

export default App;
