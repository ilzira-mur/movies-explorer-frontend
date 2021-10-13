import './Movies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ButtonMore from '../Movies/ButtonMore/ButtonMore';
import React, { useEffect } from 'react';
import { SHORT_MOVIE, ADD_MOVIES_1280, ADD_MOVIES_768,
  ADD_MOVIES_320, INIT_MOVIES_1280, INIT_MOVIES_768, INIT_MOVIES_320 } from '../../utils/constants';

function Movies({ foundMovies, isSearching, onSubmit, onCardLike, onNavigation, savedCards, owner,
  onCheckbox, checkbox, onSearch, startPreloader, showSearchMovies, isSearchMovies, isMoviesErrorFromApi }) {
  
  const [widthCards, setWidthCards] = React.useState(setWidthCard('init'));
  const [shortMovies, setShortMovies] = React.useState([]);
  const [more, setMore] = React.useState(true);

  function setWidthCard(str) {
    let initWidthCards = 0;
    let addWidthCards = 0;
    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth > 768) {
      initWidthCards = INIT_MOVIES_1280;
      addWidthCards = ADD_MOVIES_1280;
    } else {
      initWidthCards = INIT_MOVIES_768;
      addWidthCards = ADD_MOVIES_768;
    };
    if (pageWidth < 768) {
      initWidthCards = INIT_MOVIES_320;
      addWidthCards = ADD_MOVIES_320;
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

  useEffect(() => {
    foundMovies.length !==0 &&
    setShortMovies(foundMovies.filter(card => card.duration <= SHORT_MOVIE));
  }, [foundMovies]);
  

  const searchedMoviesListLength = checkbox ? shortMovies.length : foundMovies.length;
  useEffect(() => {
    widthCards < searchedMoviesListLength ? setMore(true) : setMore(false);
  }, [widthCards, searchedMoviesListLength]);

  
    return(
        <section className="movies">
                <Header onNavigation={onNavigation} />
                <SearchForm showSearchMovies={showSearchMovies} onSubmit={onSubmit} onCheckbox={onCheckbox}
                checkbox={checkbox} onSearch={onSearch} startPreloader={startPreloader} />
                {isSearchMovies ? 
                (<MoviesCardList isSearching={isSearching}
                cards={checkbox ? shortMovies : foundMovies}
                onCardLike={onCardLike}
                foundMovies={foundMovies}
                widthCards={widthCards}
                savedCards={savedCards}
                owner={owner}
                isMoviesErrorFromApi={isMoviesErrorFromApi} />)
                : ''}
                {more && (<ButtonMore onClick={handleClick} />)}
                <Footer />
        </section>
    );
}

export default Movies;