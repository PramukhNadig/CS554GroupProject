/** @format */

import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import cookies from "../helpers/cookies";
import { TextField, Button, Box, Tooltip } from "@mui/material";

type Card = {
  word: string;
  meaning: string;
  imageUrl: any;
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
  const [index, setIndex] = useState(cards?.length - 1);
  if (!cookies.doesExist("username")) return unloggedIn;

  const handleValueChange = (index: number, value: Card) => {
    const newCards = [...cards];
    newCards[index] = value;
    setCards(newCards);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: 3,
        marginLeft: 1,
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
          label='Subject'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </Box>
      {cards.map((currElem, index) => {
        return (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField label='Front' variant='outlined' sx={{ flex: 1 }} onChange={
            (e) => { handleValueChange(index, { ...cards[index], word: e.target.value }) }
      } />
            <TextField label='Back' variant='outlined' sx={{ flex: 1 }} onChange={
              (e) => { handleValueChange(index, { ...cards[index], meaning: e.target.value }) }
      } />
      <Tooltip title="Optional" enterDelay={100}>
            <input
              type='file'
              name='file'

        onSubmit={async(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
                          let formData = new FormData();

                if (!e.target.files) return;
                e.preventDefault();
                if (!e.target.files) return;
                console.log(e.target.files[0].name)
                formData.append('file', e.target.files[0]);

              let imageId = await axios.post("https://librelearn-backend-aa.herokuapp.com/v1/images", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                if (imageId.data) { 
                  imageId = imageId.data
                }
                handleValueChange(index, { ...cards[index], imageUrl: imageId })
                }
              }
              
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                let formData = new FormData();
                e.preventDefault();
                if (!e.target.files) return;
                console.log(e.target.files[0].name)

                formData.append('file', e.target.files[0]);
                formData.append('name', 'file')
                formData.append('type', 'file')
                if (e.target.files[0].size > 4000000) { 
                  alert("File is too big! Max 4MB")
                  e.target.value = ""
                  return
                }

                let imageId = await axios.post("https://librelearn-backend-a.herokuapp.com/v1/images", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                if (imageId.data) { 
                  imageId = imageId.data
                }
                handleValueChange(index, { ...cards[index], imageUrl: imageId })
              }}

        accept='image/*'
        
        style={{
          backgroundColor: "#f5f5f5",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          width: "20%",
        }}
      />
      </Tooltip>
          </Box>
        );
      })}
      <Box sx={{ alignSelf: "center" }}>
      <Button
          disabled={cards.length === 1}
          variant="outlined"
          color="error"
          onClick={() => {
            const newCards = cards.slice(0, -1); // Remove the last element
            setCards(newCards);
          }}
        >
          - Remove Card
      </Button>
        <Button
          sx={{ margin: 1 }}
          variant='outlined'
          onClick={
            () => {
              setCards([...cards, initCard]);
              setIndex(index + 1);
            }
          }>
          + Add Card
        </Button>
        <Button
          sx={{ margin: 1 }}
          variant='contained'
          onClick={async () => {
            if (!cookies.doesExist("username")) return unloggedIn;
            if (!title || !description || !subject || !cards)
              return alert("Please fill out all fields (images are optional)");
            if (
              cards.some(
                (card) => !card.word || !card.meaning
              )
            )
              return alert("Please fill out all fields (images are optional)");
            
            
            await axios.post("https://librelearn-backend-aa.herokuapp.com/v1/sets", {
              owner: cookies.getCookie("username"),
              title: title,
              description: description,
              subject: subject,
              cards: cards,

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
