import './SearchForm.css';
import FilterCheckbox from '../SearchForm/FilterCheckbox/FilterCheckbox';
import SearchformButton from '../../../images/searchform__button.svg';
import { useState } from 'react';

function SearchForm({ isSavedMovies, showSavedSearchedMovies, savedMovieSearch, onSubmit, onCheckbox, checkbox, movieSearch }) {
    
    const [movieName, setMovieName] = useState([]);
    const [savedMovieName, setSavedMovieName] = useState([]);
    

    function handleMovieNameChange(evt) {
        setMovieName(evt.target.value);
    }

    function handleSavedMovieNameChange(evt) {
        setSavedMovieName(evt.target.value);
    }
    
    function handleSubmit(evt) {
        evt.preventDefault();
        movieSearch(movieName);
    }

    function handleSavedSubmit(evt) {
        evt.preventDefault();
        savedMovieSearch(savedMovieName);
        showSavedSearchedMovies();
    }

    return(
        <>
        {isSavedMovies ? (
        <>
        <section className="searchform">
                <div className="searchform__box">
                    <form onSubmit={handleSavedSubmit} className="searchform__form" noValidate>
                        <input onChange={handleSavedMovieNameChange} id="searchform-film" name="searchform-film" type="text" placeholder="Фильм" className="searchform__input" required></input>
                        <button type="submit" name="button" className="link button searchform__button"><img src={SearchformButton} alt="Кнопка"></img></button>
                    </form>
                </div>
            <FilterCheckbox />
        </section>
        </>
        ) : (
        <>
        <section className="searchform">
                <div className="searchform__box">
                    <form onSubmit={handleSubmit} className="searchform__form" noValidate>
                        <input onChange={handleMovieNameChange} id="searchform-film" name="searchform-film" type="text" placeholder="Фильм" className="searchform__input" required></input>
                        <button type="submit" name="button" className="link button searchform__button"><img src={SearchformButton} alt="Кнопка"></img></button>
                    </form>
                </div>
            <FilterCheckbox />
        </section>
        </>
        )}
        
        </>
    );
}

export default SearchForm;