import './SearchForm.css';
import FilterCheckbox from '../SearchForm/FilterCheckbox/FilterCheckbox';
import SearchformButton from '../../../images/searchform__button.svg';
import { useState } from 'react';

function SearchForm({ onSubmit }) {
    const [search, setSerach] = useState('');

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        setSerach({[name]: value})
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(search)
    }

    return(
        <section className="searchform">
                <div className="searchform__box">
                    <form onSubmit={handleSubmit} className="searchform__form" noValidate>
                        <input onChange={handleChange} value={search.value} id="searchform-film" name="searchform-film" type="text" placeholder="Фильм" className="searchform__input" required></input>
                        <button type="submit" name="button" className="link button searchform__button"><img src={SearchformButton} alt="Кнопка"></img></button>
                    </form>
                </div>
            <FilterCheckbox />
        </section>
    );
}

export default SearchForm;