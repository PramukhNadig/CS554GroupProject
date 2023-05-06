import React, { useState } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back }) => {
  const [showBack, setShowBack] = useState(false);

  const handleClick = () => {
    setShowBack(!showBack);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      <div className={`flashcard-inner ${showBack ? 'show-back' : ''}`}>
        <div className="flashcard-front">
          {front}
        </div>
        <div className="flashcard-back">
          {back}
        </div>
      </div>
    </div>
  );
};

interface FlashcardListProps {
  flashcards: FlashcardProps[];
}

const FlashcardList: React.FC<FlashcardListProps> = ({ flashcards }) => {
  return (
    <div className="flashcard-list">
      {flashcards.map((flashcard, index) => (
        <Flashcard key={index} front={flashcard.front} back={flashcard.back} />
      ))}
    </div>
  );
};

export default {FlashcardList, Flashcard};