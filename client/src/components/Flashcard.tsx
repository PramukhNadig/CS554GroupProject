import { FlashcardArray } from "react-quizlet-flashcard";
import { Typography } from "@mui/material";

type Card = {
  word: string;
  meaning: string;
  imageUrl: string;
};

function App({ cards }: any) {

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
            <img src={card.imageUrl} alt="unknown error" />
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
      
      <div style={{ textAlign: "center" }}>
          <FlashcardArray cards={cardList} />
      </div>
    </div>
  );
}

export default App;
