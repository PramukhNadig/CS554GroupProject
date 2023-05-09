/** @format */

import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import cookies from "../helpers/cookies";
import { useQuery } from "react-query";

function App({ subject, title, description, cards, setId }: any) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const currentCard = cards?.[index];

  const handleClick = () => {
    setShowBack(!showBack);
  };


  // const { data: savedSets } = useQuery(["SavedSets"], () => {
  //   return axios  
  //     .get("http://localhost:4000/v1/sets/saved/" + cookies.getCookie("username"))
  //     .then((res) => {
  //       console.log(res.data.saved_sets);
  //       return res.data.saved_sets;
  //     });
  // });

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div className='app'>
          <Button
            variant='contained'
            onClick={() => {
              if (cookies.doesExist("username")) {
                axios.post("http://localhost:4000/v1/sets/save", {
                  username: cookies.getCookie("username"),
                  setId,
                });
              }
            }}>
            Bookmark
          </Button>
          <Typography variant='h4'>{subject}</Typography>
          <Typography variant='h3'>{title}</Typography>
          <Typography variant='body1' sx={{ mb: 2 }}>
            {description}
          </Typography>
          <div className='card'>
            <img
              src={currentCard?.imageUrl}
              alt={currentCard?.word}
              style={{ maxWidth: "100%" }}
            />
            <div className='card-details'>
              {showBack && (
                <Typography variant='h3'>{currentCard?.word}</Typography>
              )}
              <Typography variant='body1'>{currentCard?.meaning}</Typography>
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
