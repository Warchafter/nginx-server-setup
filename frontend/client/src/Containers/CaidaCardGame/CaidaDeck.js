import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeDeck, shuffleDeck } from 'features/caidagame';

import "./css/CaidaDeck.css";

/// caida-front-wraper --> caida-frontcard-wrapper --> caida-frontcard-content

const Card = ({ suit, rank }) => {
  return (
    <div className='caida-frontcard-wrapper'>
      <div className='caida-frontcard-content'>
        <div className='top-row'>{rank}</div>
        <div className='bottom-row'>{suit}</div>
      </div>
    </div>
  )
};


const CaidaDeck = () => {
  const dispatch = useDispatch();
  const { deck } = useSelector(state => state.caida);

  const onInitializeDeckHandler = (e) => {
    e.preventDefault(); // Corrected method name
    dispatch(initializeDeck());
  }

  const onShuffleDeckHandler = (e) => {
    e.preventDefault(); // Corrected method name
    dispatch(shuffleDeck());
  }

  return (
    <div>
      <button onClick={onInitializeDeckHandler}>Initialize Deck</button>
      <button onClick={onShuffleDeckHandler}>Shuffle Deck</button>
      <hr />
      <div className='deck-display-wrapper'>
        {deck.map((card, index) => (
          <Card
            key={index}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>
    </div>
  );
};

export default CaidaDeck;