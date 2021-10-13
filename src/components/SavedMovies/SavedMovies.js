import React, { useContext, useEffect } from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedMovies({ onNavigation, savedCards, onSubmit, onCardRemove, onCheckbox, checkbox, savedMovieSearch,
showSavedSearchedMovies, isSavedMovies, foundSavedMovies, foundShortSavedMovies }) {


    const currentUser = useContext(CurrentUserContext);
    const [shortSavedMovies, setShortSavedMovies] = React.useState([]);

    function checkOwnerMovieList() {
        return savedCards.some(item => item.owner === currentUser._id)
    }

    useEffect(() => {
        setShortSavedMovies(savedCards.filter(card => card.duration <= 40));
    }, [savedCards]);
    
    

    return (
        <section className="saved-movies">
            <Header onNavigation={onNavigation} />
            <SearchForm onSubmit={onSubmit} savedMovieSearch={savedMovieSearch} isSavedMovies={isSavedMovies}
            showSavedSearchedMovies={showSavedSearchedMovies} onCheckbox={onCheckbox} checkbox={checkbox} />
            {checkOwnerMovieList() ? foundSavedMovies.length ?
            (<MoviesCardList owner={currentUser._id}
                savedCards={checkbox ? foundShortSavedMovies : foundSavedMovies} onCardRemove={onCardRemove} foundSavedMovies={foundSavedMovies} />)
            :
            (<MoviesCardList
                owner={currentUser._id}
                savedCards={checkbox ? shortSavedMovies : savedCards} onCardRemove={onCardRemove} foundSavedMovies={foundSavedMovies} />)
                : ''
            }
            <Footer />
        </section>
    );
}

export default SavedMovies;