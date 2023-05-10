import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import cookies from "../helpers/cookies";
import { Navigate } from "react-router-dom";
import xss from "xss";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

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
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant='h1'>Profile</Typography>
        <Typography variant='h2' sx={{ mt: 2 }}>
          Username: {user}
        </Typography>
        <Typography variant='h3' sx={{ mt: 2 }}>
          User Made Sets:
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Row xs={1} sm={2} md={3} className="g-4 justify-content-md-center">
            {owned && owned?.length === 0 && <p>"No sets found"</p>}
            {owned && owned?.length > 0 && owned?.map((set: any) => (
              <Col key={set.setId}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "25px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title as="h4">{'Title: ' + set.title}</Card.Title>
                      <hr />
                      <Card.Text>
                        {'Description: ' + set.description}
                      </Card.Text>
                      <hr />
                      <Button variant="primary" href={xss("/set/" + set._id)}>View Set</Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
