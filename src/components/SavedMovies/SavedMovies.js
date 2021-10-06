import React, { useContext, useState, useEffect } from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from '../Movies/Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedMovies({onNavigation, loading, savedCards, filteredSavedCards = "", errorQuery,
emptyResult, emptyQuery, onSubmit, onCardRemove, onCheckbox, checkbox, savedMovieSearch, isSavedMovies,
showSavedSearchedMovies, isSavedSearch, foundSavedMovies }) {


    const currentUser = useContext(CurrentUserContext);
    const [shortSavedMovies, setShortSavedMovies] = useState([]);
    const SHORT_MOVIES_DURATION = 40;

    function checkOwnerCardList() {
        return savedCards.some(item => item.owner === currentUser._id)
      }
      useEffect(() => {
        const cards = foundSavedMovies.length !== 0 ? foundSavedMovies : savedCards;
        setShortSavedMovies(cards.filter(card => card.duration <= SHORT_MOVIES_DURATION));
      }, [savedCards, foundSavedMovies]);
    
    return (
        <section className="saved-movies">
            <Header onNavigation={onNavigation}/>
            <SearchForm isSavedSearch={isSavedSearch} onSubmit={onSubmit} savedMovieSearch={savedMovieSearch} isSavedMovies={isSavedMovies}
            showSavedSearchedMovies={showSavedSearchedMovies}/>
            {loading && (<Preloader />)}
            {checkOwnerCardList() ? foundSavedMovies.length ?
            (<MoviesCardList isSavedSearch={isSavedSearch}  owner={currentUser._id}
                savedCards={checkbox ? shortSavedMovies : foundSavedMovies} onCardRemove={onCardRemove} foundSavedMovies={foundSavedMovies} isSavedMovies={isSavedMovies}/>)
            :
            (<MoviesCardList
                owner={currentUser._id}
                savedCards={checkbox ? shortSavedMovies : savedCards} onCardRemove={onCardRemove} foundSavedMovies={foundSavedMovies} isSavedMovies={isSavedMovies} />)
                : ''
            }
            <Footer />
        </section>
    );
}

export default SavedMovies;