import React, {useState, useEffect} from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import xss from "xss";
import cookies from "../helpers/cookies";
import axios from 'axios';
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ShowSetsProps {
  sets: any[];
  onSetDeleted: (setId: string) => void;
}


const ShowSets: React.FC<ShowSetsProps> = ({ sets, onSetDeleted }) => {

    const username = cookies.getCookie("username")
    const [ownedSets, setOwnedSets] = useState<string[]>([]);
    const [savedSets, setSavedSets] = useState<string[]>([]);

    useEffect(() => {
        const username = cookies.getCookie("username");

        axios
            .get("https://librelearn-backend-aa.herokuapp.com/v1/sets/my/" + username)
            .then((response) => {
            setOwnedSets(response.data.map((item: { _id: any; }) => item._id));
            })
            .catch((error) => {
            console.log(error);
            });

        axios
            .get("https://librelearn-backend-aa.herokuapp.com/v1/sets/saved/" + username)
            .then((response) => {
            setSavedSets(response.data.saved_sets);
            })
            .catch((error) => {
            console.log(error);
            });
    }, []);


    const handleSave = (setId: string) => {
        axios
          .post("https://librelearn-backend-aa.herokuapp.com/v1/sets/save", {
            username: username,
            setId: setId,
          })
          .then((response) => {
            if (response.data === "success") {
              setSavedSets([...savedSets, setId]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const handleUnsave = (setId: string) => {
        axios
          .post("https://librelearn-backend-aa.herokuapp.com/v1/sets/save", {
            username: username,
            setId: setId,
          })
          .then((response) => {
            if (response.data === "success") {
              setSavedSets(savedSets.filter((id) => id !== setId));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const handleDelete = (setId: string) => {
        axios
          .post("https://librelearn-backend-aa.herokuapp.com/v1/sets/delete", {
            username: username,
            setId: setId,
          })
          .then((response) => {
            if (response.data === "success") {
                setOwnedSets(ownedSets.filter((id) => id !== setId));
                onSetDeleted(setId);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };


    return (
        <Container style={{ paddingTop: 20}}>
        <Row xs={1} sm={2} md={3} className="g-4 justify-content-md-center">
          {sets.map((set: any) => (
            <Col key={set.setId}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "25px",
                }}
              >
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title as="h4">{set.title}</Card.Title>
                    <hr />
                    <Card.Text>Description: {set.description}</Card.Text>
                    <Card.Text>Subject: {set.subject}</Card.Text>
                    <Card.Text>Owner: <Link to={'/profile/' + set.owner}>{set.owner}</Link></Card.Text>
                    <hr />
                    <Link to={xss("/set/" + set._id)}>
                    <Button variant="primary">
                      View
                    </Button>
                    </Link>
                    {ownedSets.includes(set._id) ? (
                        <Button
                            variant="danger"
                            onClick={() => handleDelete(set._id)}
                            style={{ marginLeft: "10px" }}
                        >
                            Delete
                        </Button>
                        ) : savedSets.includes(set._id) ? (
                        <Button
                            variant="warning"
                            onClick={() => handleUnsave(set._id)}
                            style={{ marginLeft: "10px" }}
                        >
                            Unsave
                        </Button>
                        ) : (
                        <Button
                            variant="success"
                            onClick={() => handleSave(set._id)}
                            style={{ marginLeft: "10px" }}
                        >
                            Save
                        </Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
        </Container>
      );
};

export default ShowSets;
