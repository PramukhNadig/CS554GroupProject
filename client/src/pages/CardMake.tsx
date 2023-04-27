import { useState } from "react";
import CardInput from "../components/CardInput";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

type Card = {
  word: string;
  meaning: string;
  imageUrl: string;
};
const initCard = { word: "", meaning: "", imageUrl: "" };
function App() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [cards, setCards] = useState<Card[]>([initCard, initCard, initCard]);
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
          await axios.post("/v1/sets", { title, description, subject, cards });
          navigate("/");
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
