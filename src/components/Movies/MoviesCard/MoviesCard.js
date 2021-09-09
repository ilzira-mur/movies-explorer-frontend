import './MoviesCard.css';
import cardImage from '../../../images/test_cards.jpg';

function MoviesCard() {

    return(
        <div className="moviescard">
            <div className="moviescard__data">
                <div className="moviescard__about">
                    <p className="moviescard__name">33 слова о дизайне</p>
                    <p className="moviescard__time">1ч 47м</p>
                </div>
                <button className="link button moviescard__button"></button>
            </div>
            <img className="moviescard__img" src={cardImage} alt="Картинка"></img>
        </div>
    );
}

export default MoviesCard;