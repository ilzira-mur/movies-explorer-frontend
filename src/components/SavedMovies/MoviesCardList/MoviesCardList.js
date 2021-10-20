import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ savedCards, onCardRemove, owner }) {

    return(
        <section className="moviescardlist">
                {savedCards.length === 0 ? 
                    (
                    <p className="moviescardlist__text">«Ничего не найдено»</p>
                    ) : (
                    <>
                        { savedCards && savedCards.map((card) => card.owner === owner ? (
                            <MoviesCard key={card.movieId} card={card} onCardRemove={onCardRemove} />
                        ) : '')}
                    </>
                    )}
        </section>
    );
}

export default MoviesCardList;