import './Navigation.css';
import icon from '../../images/account_icon.svg';
import closeButton from '../../images/close_button.svg';
import { Link } from 'react-router-dom';

function Navigation(props) {

    return (
        <article className={`${props.isOpen ? `navigation navigation_type_opened` : `navigation`}`}>
            <div className="navigation__container">
                <button onClick={props.onClose} className="link button navigation__button"><img src={closeButton} alt="Кнопка закрытия" /></button>
                <div className="navigation__block">
                <Link to="/" onClick={props.onClose} className="link button navigation__text navigation__text_type_small">Главная</Link>
                <Link to="/movies" onClick={props.onClose} className="link button navigation__text navigation__text_type_small">Фильмы</Link>
                <Link to="/saved-movies" onClick={props.onClose} className="link button navigation__text navigation__text_type_large">Сохранённые фильмы</Link>
                </div>
                <Link to="/profile" onClick={props.onClose} className="link button navigation__account-link">
                    <p className="navigation__account">Аккаунт</p>
                    <img className="navigation__icon" src={icon} alt="Аккаунт"/>
                </Link>

            </div>
        </article>
    );
}

export default Navigation;