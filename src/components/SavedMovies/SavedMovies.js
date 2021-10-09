import React, { useContext, useEffect } from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from '../Movies/Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedMovies({ onNavigation, loading, savedCards, onSubmit, onCardRemove, onCheckbox, checkbox, savedMovieSearch,
showSavedSearchedMovies, isSavedMovies, foundSavedMovies }) {


    const currentUser = useContext(CurrentUserContext);
    const [shortSavedMovies, setShortSavedMovies] = React.useState([]);

    function checkOwnerCardList() {
        return savedCards.some(item => item.owner === currentUser._id)
    }

    useEffect(() => {
        setShortSavedMovies(savedCards.filter(card => card.duration <= 40));
    }, [savedCards]);
    
    

    return (
        <section className="saved-movies">
            <Header onNavigation={onNavigation}/>
            <SearchForm onSubmit={onSubmit} savedMovieSearch={savedMovieSearch} isSavedMovies={isSavedMovies}
            showSavedSearchedMovies={showSavedSearchedMovies} onCheckbox={onCheckbox} checkbox={checkbox}/>
            {loading && (<Preloader />)}
            {checkOwnerCardList() ? foundSavedMovies.length ?
            (<MoviesCardList owner={currentUser._id}
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