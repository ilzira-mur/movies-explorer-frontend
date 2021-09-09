import './SearchForm.css';
import FilterCheckbox from '../SearchForm/FilterCheckbox/FilterCheckbox';
import SearchformButton from '../../../images/searchform__button.svg';

function SearchForm() {

    return(
        <section className="searchform">
                <div className="searchform__box">
                    <form className="searchform__form" noValidate>
                        <input id="searchform-film" name="searchform-film" type="text" placeholder="Фильм" className="searchform__input"></input>
                        <button type="submit" name="button" className="link button searchform__button"><img src={SearchformButton} alt="Кнопка"></img></button>
                    </form>
                </div>
            <FilterCheckbox />
        </section>
    );
}

export default SearchForm;