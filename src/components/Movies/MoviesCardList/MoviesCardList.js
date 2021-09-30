import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({cards, onCardLike}) {

    return(
        <section className="moviescardlist">
            { cards.map(card => (<MoviesCard {...cards} key={card.id} card={card} onCardLike={onCardLike} />)) }
        </section>
    );
}

export default MoviesCardList;