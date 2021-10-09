import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ isMoviesErrorFromApi, cards, widthCards, onCardLike, savedCards, owner, isSearching }) {
   
    return(
        <>
        {isMoviesErrorFromApi ? (
            <>
            <p className="moviescardlist__text">«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»</p>
            </>
            ) : (
                <>
                {isSearching && <Preloader />}
                {cards.length > 0 ? (
                    <>
                    <section className="moviescardlist">
                        {cards.slice(0, widthCards).map(card => (<MoviesCard {...cards} key={card.id} card={card} onCardLike={onCardLike} savedCards={savedCards} owner={owner} />)) }
                    </section>
                    </>
                    ) : (
                    <>
                        <p className="moviescardlist__text">«Ничего не найдено»</p>
                    </>
                )}
                    
            </>
            )
        }
        </>
    );
}

export default MoviesCardList;