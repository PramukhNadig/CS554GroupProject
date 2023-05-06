/** @format */

import { useState } from "react";
import CardInput from "../components/CardInput";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import cookies from "../helpers/cookies";
import { TextField, Button, Box } from "@mui/material";

type Card = {
  word: string;
  meaning: string;
  imageUrl: string;
};

const unloggedIn = (
  <Navigate
    to='/login'
    state={{ from: window.location.pathname, message: "Please login first" }}
  />
);

const initCard = { word: "", meaning: "", imageUrl: "" };

function App() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [cards, setCards] = useState<Card[]>([initCard, initCard, initCard]);
  if (!cookies.doesExist("username")) return unloggedIn;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: 3,
        marginLeft: 10,
      }}>
      <Box sx={{ alignSelf: "center" }}>
        <TextField
          sx={{ margin: 1 }}
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          sx={{ margin: 1 }}
          label='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          sx={{ margin: 1 }}
          label='Subject or Course'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </Box>
      {cards.map(() => {
        return <CardInput />;
      })}
      <Box sx={{ alignSelf: "center" }}>
        <Button
          sx={{ margin: 1 }}
          variant='contained'
          onClick={() => setCards((s) => [...s, initCard])}>
          + Add Card
        </Button>
        <Button
          sx={{ margin: 1 }}
          variant='contained'
          onClick={async () => {
            if (!cookies.doesExist("username")) return unloggedIn;
            if (!title || !description || !subject || !cards)
              return alert("Please fill out all fields");
            if (
              cards.some(
                (card) => !card.word || !card.meaning || !card.imageUrl
              )
            )
              return alert("Please fill out all fields");
            await axios.post("http://localhost:4000/v1/sets", {
              title,
              description,
              subject,
              cards,
            });
            navigate("/");
          }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default App;
