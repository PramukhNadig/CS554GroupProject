import { FlashcardArray } from "react-quizlet-flashcard";

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
        <div>
          {card.imageUrl !== "" ? (
            <img src={card.imageUrl} alt="unknown error" />
          ) : null}
          {card.word}
        </div>
      ),
      frontContentStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        wordWrap: "break-word",
        maxWidth: "100%",
        fontSize: "2.5vw",
      },
      backHTML: (
        <div>
          {card.meaning}
        </div>
      ),
      backContentStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        wordWrap: "break-word",
        maxWidth: "100%",
        fontSize: "2.5vw",
      },
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
