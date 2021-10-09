import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ foundMovies, cards, widthCards, onCardLike, onCardRemove, savedCards, owner, foundSavedMovies, isSavedMovies }) {
   
    return(
            <>
                {isSavedMovies ? (
                    <>
                    <section className="moviescardlist">
                        {foundSavedMovies.slice(0, widthCards).map(card => (<MoviesCard {...cards} key={card.id} card={card} onCardRemove={onCardRemove} savedCards={savedCards} owner={owner} />)) }
                    </section>
                    </>
                ) : (<>
                    {foundMovies.length > 0 ? (
                    <section className="moviescardlist">
                        {foundMovies.slice(0, widthCards).map(card => (<MoviesCard {...cards} key={card.id} card={card} onCardLike={onCardLike} savedCards={savedCards} owner={owner} />)) }
                    </section>
                    ) : (
                    <section className="moviescardlist">
                        {cards.slice(0, widthCards).map(card => (<MoviesCard {...cards} key={card.id} card={card} onCardLike={onCardLike} savedCards={savedCards} owner={owner} />)) }
                    </section>)}
                    </>
                )}
            </>
    );
}

export default MoviesCardList;