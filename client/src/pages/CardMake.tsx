import { useState } from "react";
import CardInput from "../components/CardInput";
import axios from "axios";

type Card = {
  word: string;
  meaning: string;
  imageUrl: string;
};
const initCard = { word: "", meaning: "", imageUrl: "" };
function App() {
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
        onClick={() => {
          axios.post("/v1/learningSet", { title, description, subject, cards });
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
