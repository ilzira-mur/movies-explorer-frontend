import './Movies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ButtonMore from '../Movies/ButtonMore/ButtonMore';
import Preloader from '../Movies/Preloader/Preloader';
import React, { useEffect } from 'react';

function Movies({ foundMovies, loading, onSubmit, onCardLike, onNavigation, cards, savedCards, owner, onCheckbox, checkbox, onSearch }) {
  
  const [widthCards, setWidthCards] = React.useState(setWidthCard('init'));
  const [shortMovies, setShortMovies] = React.useState([]);
  const [more, setMore] = React.useState(true);

  useEffect(() => {
    setShortMovies(cards.filter(card => card.duration <= 40));
  }, [cards]);

  function setWidthCard(str) {
    let initWidthCards = 0;
    let addWidthCards = 0;
    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth > 768) {
      initWidthCards = 12;
      addWidthCards = 3;
    } else {
      initWidthCards = 8;
      addWidthCards = 2;
    };
    if (pageWidth < 768) {
      initWidthCards = 5;
      addWidthCards = 1;
    }
    if (str === 'init') {
      return initWidthCards
    } else {
      return addWidthCards
    }
  }
  
  useEffect(() => {
    setWidthCard();
    window.addEventListener("resize", setWidthCard);
  }, []);
  
  function handleClick() {
    setWidthCards(widthCards + setWidthCard('add'));
  }

  const foundCardListLength = checkbox ? shortMovies.length : foundMovies.length;

  useEffect(() => {
    widthCards < foundCardListLength ? setMore(true) : setMore(false);
  }, [widthCards, foundCardListLength]);

  useEffect(() => {
    if (cards.length > widthCards) {
          setMore(true)
        }
  }, [loading, cards, widthCards])
  
    return(
        <section className="movies">
                <Header onNavigation={onNavigation}/>
                <SearchForm onSubmit={onSubmit} onCheckbox={onCheckbox} checkbox={checkbox} onSearch={onSearch} />
                {loading && (<Preloader />)}
                <MoviesCardList cards={checkbox ? shortMovies : cards} onCardLike={onCardLike} foundMovies={foundMovies} widthCards={widthCards} savedCards={savedCards} owner={owner} />
                {more && (<ButtonMore onClick={handleClick} />)}
                <Footer />
        </section>
    );
}

export default Movies;