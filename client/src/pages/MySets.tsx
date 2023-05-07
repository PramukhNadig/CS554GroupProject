/** @format */

import Set from "../components/Set";
import axios from "axios";
import { useQuery } from "react-query";
import { Box, Grid } from "@mui/material";

function App() {
  const { data } = useQuery(["MySets"], () => {
    return axios.get("http://localhost:4000/v1/sets/my").then((res) => {
      return res.data;
    });
  });
  console.log("data", data);
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
