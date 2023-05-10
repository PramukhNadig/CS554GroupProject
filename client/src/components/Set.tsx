import React from "react";
import { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import cookies from "../helpers/cookies";
import { useQuery } from "react-query";

function App({ subject, title, description, cards, setId, owner }: any) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const currentCard = cards?.[index];
  const handleClick = () => {
    setShowBack(!showBack);
  };
  const { data: savedSets } = useQuery(["SavedSets"], () => {
    if (!cookies.doesExist("username")) return [];
    return axios
      .get(
        "http://localhost:4000/v1/sets/saved/" + cookies.getCookie("username")
      )
      .then((res) => {
        return res.data.saved_sets;
      });
  });
  const nav = (own: any) => {
    return "/userprofile/" + own;
  };
  return (
    <Container>
      <Row xs={1} md={3} className="g-4 justify-content-md-center">
        <Col>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <hr />
                <Card.Text>
                  Subject: {subject} <br />
                  Owner: <a href={nav(owner)}>{owner}</a> <br />
                  Description: {description}
                </Card.Text>
                <hr />
                <Button
                  variant="primary"
                  style={{ marginRight: "10px" }}
                  onClick={() =>
                    (window.location.href =
                      `http://localhost:3000/set/${setId}`)
                  }
                >
                  Study
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (cookies.doesExist("username")) {
                      if (savedSets?.some((set: any) => set === setId)) {
                        axios.post("http://localhost:4000/v1/sets/save", {
                          username: cookies.getCookie("username"),
                          setId,
                        });
                      } else {
                        axios.post("http://localhost:4000/v1/sets/unsave", {
                          username: cookies.getCookie("username"),
                          setId,
                        });
                      }
                    }
                  }}
                >
                  {savedSets?.some((set: any) => set === setId)
                    ? "Unsave"
                    : "Save"}
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
