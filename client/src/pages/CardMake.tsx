import { useState } from "react";
import CardInput from "../components/CardInput";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import cookies from "../helpers/cookies";

type Card = {
  word: string;
  meaning: string;
  imageUrl: string;
};

const unloggedIn = (
  <Navigate
    to="/login"
    state={{ from: window.location.pathname, message: "Please login first" }}
  />
)

const initCard = { word: "", meaning: "", imageUrl: "" };
function App() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [cards, setCards] = useState<Card[]>([initCard, initCard, initCard]);
  if(!cookies.doesExist("username")) return unloggedIn;
  return (
    <div className="app">
      {" "}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <input
        placeholder="subject or course"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      ></input>
      {cards.map(() => {
        return <CardInput></CardInput>;
      })}
      <button
        onClick={() => {
          setCards((s) => [...s, initCard]);
        }}
      >
        + Add Card
      </button>
      <button
        onClick={async () => {
          if (!cookies.doesExist("username")) return unloggedIn;
          if (!title || !description || !subject || !cards) return alert("Please fill out all fields");
          if(cards.some((card) => !card.word || !card.meaning || !card.imageUrl)) return alert("Please fill out all fields");
          await axios.post("http://localhost:4000/v1/sets", { title, description, subject, cards });
          navigate("/");
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
