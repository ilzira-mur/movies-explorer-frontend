import React, { useContext, useState, useEffect } from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from '../Movies/Preloader/Preloader';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies({onNavigation, loading, savedCards, filteredSavedCards = "", errorQuery,
emptyResult, emptyQuery, onSubmit, onCardRemove, onCheckbox, checkbox}) {

    const currentUser = useContext(CurrentUserContext);
    const [shortSavedMovies, setShortSavedMovies] = useState([]);
    const SHORT_MOVIES_DURATION = 40;

    function checkOwnerCardList() {
        return savedCards.some(item => item.owner === currentUser._id)
      }
      useEffect(() => {
        const cards = filteredSavedCards.length !== 0 ? filteredSavedCards : savedCards;
        setShortSavedMovies(cards.filter(card => card.duration <= SHORT_MOVIES_DURATION));
      }, [savedCards, filteredSavedCards]);
    

    return (
        <section className="saved-movies">
            <Header onNavigation={onNavigation}/>
            <SearchForm />
            {loading && (<Preloader />)}
            {checkOwnerCardList() ? filteredSavedCards.length ?
            (<MoviesCardList owner={currentUser._id}
                savedCards={checkbox ? shortSavedMovies : filteredSavedCards} onCardRemove={onCardRemove}/>)
            :
            (<MoviesCardList
                owner={currentUser._id}
                savedCards={checkbox ? shortSavedMovies : savedCards} onCardRemove={onCardRemove} />)
                : ''
            }
            <Footer />
        </section>
    );
}

export default SavedMovies;