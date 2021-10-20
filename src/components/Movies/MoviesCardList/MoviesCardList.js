import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, widthCards, onCardLike, savedCards, owner }) {
    
    return(
            <section className="moviescardlist">
                {cards.length === 0 ? 
                                (
                                    <p className="moviescardlist__text">«Ничего не найдено»</p>
                                ) : (
                                <>
                                    {cards.slice(0, widthCards).map(card => (<MoviesCard {...cards} key={card.id} card={card} onCardLike={onCardLike} savedCards={savedCards} owner={owner} />))}
                                </>
                                )}
            </section>            
    );
}

export default MoviesCardList;