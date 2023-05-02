import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function App({ subject, title, description, cards }: any) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const currentCard = cards?.[index];

  const handleClick = () => {
    setShowBack(!showBack);
  };

  return (
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
    <div className="app">      
      <header>
        <h1>{subject}</h1>
      </header>
      <main>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="card">
          <img src={currentCard?.imageUrl} alt={currentCard?.word} />
          <div className="card-details">
            <h3>{showBack ? currentCard?.word : ""}</h3>
            <p>{currentCard?.meaning}</p>
          </div>
          <button onClick={handleClick}>Flip</button>
        </div>
        <div className="card-nav">
          <button
            onClick={() => {
              if (index > 0) {
                setIndex(index - 1);
              }
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              if (index < cards?.length - 1) {
                setIndex(index + 1);
              }
            }}
          >
            Next
          </button>
        </div>
      </main>
      <footer>
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
        </div>
      </CardContent>
    </Card>
  );
}

export default App;
