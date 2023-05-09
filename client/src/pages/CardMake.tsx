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
  if (!cookies.doesExist("username")) return unloggedIn;

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
          label='Subject or Course'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </Box>
      {cards.map((currElem, index) => {
        return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField label='Term' variant='outlined' sx={{ flex: 1 }} onChange={
              (e) => { cards[index].word = e.target.value }
      }/>
            <TextField label='Definition' variant='outlined' sx={{ flex: 1 }} onChange={
              (e) => { cards[index].meaning = e.target.value }
      } />
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

                let imageId = await axios.post("http://localhost:4000/v1/images", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                cards[index].imageUrl = imageId;
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
                let imageId = await axios.post("http://localhost:4000/v1/images", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                if (imageId.data) { 
                  imageId = imageId.data
                }
                cards[index].imageUrl = imageId;
              }}

        accept='image/*'
        
        style={{
          backgroundColor: "#f5f5f5",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
        }}
      />
          </Box>
        );
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
                (card) => !card.word || !card.meaning
              )
            )
              return alert("Please fill out all fields");
            
            
            await axios.post("http://localhost:4000/v1/sets", {
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
