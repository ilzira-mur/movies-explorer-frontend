import './Movies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ButtonMore from '../Movies/ButtonMore/ButtonMore';

function Movies({ onNavigation }) {

    return(
        <section className="movies">
                <Header onNavigation={onNavigation}/>
                <SearchForm />
                <MoviesCardList />
                <ButtonMore />
                <Footer />
        </section>
    );
}

export default Movies;