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

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ width: "48rem" }}>
        <FlashcardArray cards={cardList} />
      </div>
    </Container>
  );
}

export default App;
