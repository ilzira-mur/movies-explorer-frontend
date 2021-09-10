import React from 'react';
import './MoviesCard.css';
import cardImage from '../../../images/test_cards.jpg';

function MoviesCard() {
    
    const [isSavedMovie, setSavedMovie] = React.useState(false);

    const handleSavedMovie = () => {
        setSavedMovie(true);
    }
    
    return(
        <div className="moviescard">
            <div className="moviescard__data">
                <div className="moviescard__about">
                    <p className="moviescard__name">33 слова о дизайне</p>
                    <p className="moviescard__time">1ч 47м</p>
                </div>
                <button onClick={handleSavedMovie} className={`link button moviescard__button ${isSavedMovie ? "moviescard__button_active" : ""}`}></button>
            </div>
            <img className="moviescard__img" src={cardImage} alt="Картинка"></img>
        </div>
    );
}

export default MoviesCard;