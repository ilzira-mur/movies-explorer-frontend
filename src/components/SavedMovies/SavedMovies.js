import React from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';

function SavedMovies() {

    return (
        <section>
            <Header />
            <SearchForm />
            <Footer />
        </section>
    );
}

export default SavedMovies;