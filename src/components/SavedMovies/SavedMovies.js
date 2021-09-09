import React from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function SavedMovies({onNavigation}) {

    return (
        <section className="saved-movies">
            <Header onNavigation={onNavigation}/>
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </section>
    );
}

export default SavedMovies;