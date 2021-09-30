import './MoviesCard.css';
import deleteButton from '../../../images/saved-movied_delete-button.svg';

function MoviesCard({card, onCardRemove}) {
    const hour = ~~(card.duration / 60);
    const minute = (card.duration % 60);
    const time = `${hour === 0 ? "" : hour + 'ч '}${minute === 0 ? "" : minute + 'м'}`;
    
    function handleClick() {
    onCardRemove(card);
  }

    return(
        <div className="moviescard">
            <div className="moviescard__data">
                <div className="moviescard__about">
                    <p className="moviescard__name">{card.nameRU}</p>
                    <p className="moviescard__time">{time}</p>
                </div>
                <button onClick={handleClick} className="link button"><img className="moviescard__button" src={deleteButton} alt="Кнопка"></img></button>
            </div>
            <img className="moviescard__img" src={card.image} alt={card.nameRU}></img>
        </div>
    );
}

export default MoviesCard;