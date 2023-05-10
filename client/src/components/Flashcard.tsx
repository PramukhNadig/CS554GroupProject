import React from "react";
import { useState } from "react";
import { Card, Button, ListGroup, Container } from "react-bootstrap";
import axios from "axios";
import cookies from "../helpers/cookies";
import { useQuery } from "react-query";
import { FlashcardArray } from "react-quizlet-flashcard";
import { Typography } from "@mui/material";

type Card = {
  word: string;
  meaning: string;
  imageUrl: string;
};

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

  let cardList = [];
  if (cards) {
    cardList = cards.map((card: Card, index: number) => ({

      id: index + 1,
      frontHTML: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          {card.imageUrl !== "" ? (
            <img src={card.imageUrl} alt="Image" />
          ) : null}
        
          <Typography variant="h1">{card.word}</Typography>
        </div>
      ),
      backHTML: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {card.imageUrl !== "" ? (
            <img src={card.imageUrl} alt="Image" />
          ) : null}
          <Typography variant="h3">{card.meaning}</Typography>
        </div>
      ),
    }));
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Remove fixed width and center FlashcardArray component */}
      <div style={{ textAlign: "center" }}>
          <FlashcardArray cards={cardList} />
      </div>
    </div>
  );
}

export default App;
