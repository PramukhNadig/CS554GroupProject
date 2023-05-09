/** @format */
import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { Button, Typography, Link } from "@mui/material";
import cookies from "../helpers/cookies";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function App({ subject, title, description, cards, setId, owner }: any) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const currentCard = cards?.[index];

  const handleClick = () => {
    setShowBack(!showBack);
  };

  
  const { data: savedSets } = useQuery(["SavedSets"], () => {
    if(!cookies.doesExist("username")) return [];
    return axios.get("http://localhost:4000/v1/sets/saved/" + cookies.getCookie("username")).then((res) => {
      return res.data.saved_sets;
    });
  });

  const navigate = useNavigate();

  const nav = (own: any) => {
    return '/userprofile/' + own;
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div className='app'>
          <Button
            variant='contained'
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
            }}>
            
            {savedSets?.some((set: any) => set === setId) ? "Unsave" : "Save"}
          </Button>
          <Typography variant='h1'><Link href={nav(owner)}>
            {owner}
          </Link></Typography>
          <Typography variant='h2'>{subject}</Typography>
          <Typography variant='h3'>{title}</Typography>
          <Typography variant='body1' sx={{ mb: 2 }}>
            {description}
          </Typography>
          <div className='card'>
            {currentCard?.imageUrl && (currentCard?.imageUrl !== "") && (
              <img
                src={currentCard?.imageUrl}
                alt={currentCard?.word}
                style={{ maxWidth: "100%" }}
              />
            )
            }
            <div className='card-details'>
                <Typography variant='h3'>{currentCard?.word}</Typography>
              <Typography variant='body1'>{showBack && currentCard?.meaning}</Typography>
            </div>
            <Button onClick={handleClick} sx={{ mt: 2 }}>
              Flip
            </Button>
          </div>
          <div
            className='card-nav'
            style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant='contained'
              disabled={index === 0}
              onClick={() => {
                setIndex(index - 1);
                setShowBack(false);
              }}>
              Prev
            </Button>
            <Button
              variant='contained'
              disabled={index === cards?.length - 1}
              onClick={() => {
                setIndex(index + 1);
                setShowBack(false);
              }}>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default App;
