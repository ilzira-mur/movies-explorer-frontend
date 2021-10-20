import React from 'react';
import './MoviesCard.css';

function MoviesCard({ card, onCardLike, savedCards, owner }) {
    
    const isSavedMovie = savedCards.some((savedCard) => (savedCard.movieId ===
    card.id && savedCard.owner === owner))
    const hour = ~~(card.duration / 60);
    const minute = (card.duration % 60);
    const time = `${hour === 0 ? "" : hour + 'ч '}${minute === 0 ? "" : minute + 'м'}`;
    
    const handleSavedMovie = () => {
        onCardLike(card);
    }
    
    return(
        <div className="moviescard">
            <div className="moviescard__data">
                <div className="moviescard__about">
                    <p className="moviescard__name">{card.nameRU}</p>
                    <p className="moviescard__time">{time}</p>
                </div>
                <button onClick={handleSavedMovie} className={`link button moviescard__button ${isSavedMovie ? "moviescard__button_active" : ""}`}></button>
            </div>
            <a className="link" href={card.trailer} target="_blank" rel="noreferrer"><img className="moviescard__img" src={card.image} alt={card.nameRU}></img></a>
        </div>
    );
}

export default MoviesCard;