import React, { useContext, useEffect } from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from './Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedMovies({ onNavigation, savedCards, onSubmit, onCardRemove, onCheckbox, checkbox, savedMovieSearch,
showSavedSearchedMovies, isSavedMovies, foundSavedMovies="", isSearchMovies, isMoviesErrorFromApi, isEmptySearch, emptyResultSearch, isSearching  }) {


    const currentUser = useContext(CurrentUserContext);
    const [shortSavedMovies, setShortSavedMovies] = React.useState([]);

    function checkOwnerMovieList() {
        return savedCards.some(item => item.owner === currentUser._id)
    }

    useEffect(() => {
        const cards = foundSavedMovies.length !== 0 ? foundSavedMovies : savedCards;
        setShortSavedMovies(cards.filter(card => card.duration <= 40));
    }, [savedCards, foundSavedMovies]);

    
    

    return (
        <section className="saved-movies">
            <Header onNavigation={onNavigation} />
            <SearchForm onSubmit={onSubmit} savedMovieSearch={savedMovieSearch} isSavedMovies={isSavedMovies}
            showSavedSearchedMovies={showSavedSearchedMovies} onCheckbox={onCheckbox} checkbox={checkbox} />
            {isSearching && (<Preloader />)}
            {isMoviesErrorFromApi && (<p className="moviescardlist__text">«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»</p>)}
            {isEmptySearch && (<p className="movies__text">Пожалуйста введите запрос в поиск</p>)}
            {emptyResultSearch && (<p className="movies__text">«Ничего не найдено»</p>)}
            {checkOwnerMovieList() ? foundSavedMovies.length ?
            (<MoviesCardList owner={currentUser._id}
                savedCards={checkbox ? foundSavedMovies : shortSavedMovies} onCardRemove={onCardRemove} />)
            :
            (<MoviesCardList
                owner={currentUser._id}
                savedCards={checkbox ? savedCards : shortSavedMovies} onCardRemove={onCardRemove}  />)
                : ''
            }
            <Footer />
        </section>
    );
}

export default SavedMovies;