import React from "react";
import { useState } from "react";
import { Card, Button, ListGroup, Container } from "react-bootstrap";
import axios from "axios";
import cookies from "../helpers/cookies";
import { useQuery } from "react-query";
import { FlashcardArray } from "react-quizlet-flashcard";
import { Typography } from "@mui/material";

type Card = {
  word: string,
  meaning: string,
  imageUrl: string
}

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
  
  let cardList = []
  if (cards) {
    cardList = cards.map((card: Card, index: number) => ({
    id: index + 1,
    frontHTML: <div style={{display: "flex", justifyContent: "center", alignItems: "center", height:"100%"}}><Typography variant="h3">{card.word}</Typography></div>,
    backHTML: <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", height:"100%"}}>{card.imageUrl !== "" ? (<img src={card.imageUrl} alt="Image" />) : null}<Typography variant="h4">{card.meaning}</Typography></div>
  }));
}

  // return (
  //   <Container
  //     className="d-flex justify-content-center align-items-center"
  //     style={{ minHeight: "100vh" }}
  //   >
  //     <Card style={{ width: "48rem" }}>
  //       <Card.Img variant="top" src={currentCard?.imageUrl} />
  //       <Card.Body>
  //         <div className="app">
  //           <Button
  //             variant="contained"
  //             onClick={() => {
  //               if (cookies.doesExist("username")) {
  //                 if (savedSets?.some((set: any) => set === setId)) {
  //                   axios.post("http://localhost:4000/v1/sets/save", {
  //                     username: cookies.getCookie("username"),
  //                     setId,
  //                   });
  //                 } else {
  //                   axios.post("http://localhost:4000/v1/sets/unsave", {
  //                     username: cookies.getCookie("username"),
  //                     setId,
  //                   });
  //                 }
  //               }
  //             }}
  //           >
  //             {/* {savedSets?.some((set: any) => set === setId)
  //               ? "Unsave"
  //               : "Save"} */}
  //           </Button>
  //           {/* <Card.Title>
  //             <a href={nav(owner)}>{"Owner: " + owner}</a>
  //           </Card.Title> */}
  //           {/* <Card.Title>{"Subject: " + subject}</Card.Title>
  //           <Card.Title>{"Title: " + title}</Card.Title> */}
  //           {/* <Card.Subtitle className="mb-2 text-muted">
  //             {"Description: " + description}
  //           </Card.Subtitle> */}
  //           <div className="card">
  //             {currentCard?.imageUrl && currentCard?.imageUrl !== "" && (
  //               <img
  //                 src={currentCard?.imageUrl}
  //                 alt={currentCard?.word}
  //                 style={{ maxWidth: "100%" }}
  //               />
  //             )}
  //             <div className="card-details">
  //               <h3>{currentCard?.word}</h3>
  //               <p>{showBack && currentCard?.meaning}</p>
  //             </div>
  //             <Button onClick={handleClick} style={{ marginTop: 2 }}>
  //               Flip
  //             </Button>
  //           </div>
  //           <div
  //             className="card-nav"
  //             style={{ display: "flex", justifyContent: "space-between" }}
  //           >
  //             <Button
  //               variant="contained"
  //               disabled={index === 0}
  //               onClick={() => {
  //                 setIndex(index - 1);
  //                 setShowBack(false);
  //               }}
  //             >
  //               Prev
  //             </Button>
  //             <Button
  //               variant="contained"
  //               disabled={index === cards?.length - 1}
  //               onClick={() => {
  //                 setIndex(index + 1);
  //                 setShowBack(false);
  //               }}
  //             >
  //               Next
  //             </Button>
  //           </div>
  //         </div>
  //       </Card.Body>
  //     </Card>
  //   </Container>
  // );

  return (
    <div>
      <FlashcardArray cards={cardList} />
    </div>
  )
}

export default App;