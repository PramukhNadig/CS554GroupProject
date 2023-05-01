import { useState } from "react";

function App({ subject, title, description, cards }: any) {
  const [index, setIndex] = useState(0);
  const v = cards?.[index];
  return (
    <div className="app">
      <div>{subject}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>
        <div>
          <div>{v?.word}</div>
          <div>{v?.meaning}</div>
          <div>{v?.imageUrl}</div>
        </div>
      </div>
      <button
        onClick={() => {
          if (0 < index) {
            setIndex(index - 1);
          }
        }}
      >
        {"<-"}
      </button>
      <button
        onClick={() => {
          if (index < cards?.length - 1) {
            setIndex(index + 1);
          }
        }}
      >
        {"->"}
      </button>
    </div>
  );
}

export default App;
