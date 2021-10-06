import './Movies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ButtonMore from '../Movies/ButtonMore/ButtonMore';
import Preloader from '../Movies/Preloader/Preloader';
import { useEffect, useState } from 'react';

function Movies({ foundMovies, loading, onSubmit, onCardLike, onNavigation, cards, savedCards, owner, filteredCards = "", errorQuery, emptyResult, emptyQuery,  onCheckbox, checkbox, popupError, movieSearch }) {
  
  const [countCards, setCountCards] = useState(setCountCard('init'));
  const [shortMovies, setShortMovies] = useState([]);

   
      useEffect(() => {
        setShortMovies(cards.filter(card => card.duration <= 40));
      }, [cards]);

  function setCountCard(str) {
    let initCountCards = 0;
    let addCountCards = 0;
    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth < 1280) {
      initCountCards = 8;
      addCountCards = 2;
    } else {
      initCountCards = 12;
      addCountCards = 3;
    };
    if (pageWidth < 768) {
      initCountCards = 5;
      addCountCards = 2;
    }
    if (str === 'init') {
      return initCountCards
    } else {
      return addCountCards
    }
  }
  
  useEffect(() => {
    setCountCard();
    window.addEventListener("resize", setCountCard);
  }, []);
  
  function handleClick() {
    setCountCards(countCards + setCountCard('add'));
  }

    return(
        <section className="movies">
                <Header onNavigation={onNavigation}/>
                <SearchForm onSubmit={onSubmit} onCheckbox={onCheckbox} checkbox={checkbox} movieSearch={movieSearch} />
                {loading && (<Preloader />)}
                <MoviesCardList cards={checkbox ? cards : shortMovies} onCardLike={onCardLike} foundMovies={foundMovies} countCards={countCards} savedCards={savedCards} owner={owner} />
                <ButtonMore onClick={handleClick} />
                <Footer />
        </section>
    );
}

export default Movies;