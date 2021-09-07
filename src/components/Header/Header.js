import './Header.css';
import logo from '../../images/logo_main.svg';
import icon from '../../images/account_icon.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ loggedIn }) {

    return (
        <header className="header" >
            <div className="header__container">
                <Link to="/" className="link header__logo"><img src={logo} alt="Логотип"/></Link>
                    <Switch>
                    <Route path="/movies">
                            {!loggedIn && (
                            <>
                                <div className="header__films">
                                <Link className="link" to="/movies"><p className="link header__sign-up">Фильмы</p></Link>
                                <Link className="link" to="/saved-movies"><p className="link header__sign-up">Сохранённые фильмы</p></Link>
                                </div>
                            </>
                            )}
                        </Route>
                        <Route path="/saved-movies">
                            {!loggedIn && (
                            <>
                                <div className="header__films">
                                <Link className="link" to="/movies"><p className="link header__sign-up">Фильмы</p></Link>
                                <Link className="link" to="/saved-movies"><p className="link header__sign-up">Сохранённые фильмы</p></Link>
                                </div>
                            </>
                            )}
                        </Route>
                        <Route path="/profile">
                            {!loggedIn && (
                            <>
                                <div className="header__films">
                                <Link className="link" to="/movies"><p className="link header__sign-up">Фильмы</p></Link>
                                <Link className="link" to="/saved-movies"><p className="link header__sign-up">Сохранённые фильмы</p></Link>
                                </div>
                            </>
                            )}
                        </Route>
                    </Switch>
                
                    <Switch>
                        <Route exact path="/">
                            {!loggedIn && (
                            <>
                                <div className="header__login">
                                <Link className="link" to="/signup"><p className="header__sign-up">Регистрация</p></Link>
                                <Link className="link" to="/signin"><button type="submit" name="button" className="button header__button">Войти</button></Link>
                                </div>
                            </>
                            )}
                        </Route>
                        <Route path="/movies">
                            {!loggedIn && (
                            <>
                                <div className="header__login">
                                <Link className="link" to="/profile">
                                    <div className="header__account">
                                        <p className="link header__sign-up header__sign-up_type_account">Аккаунт</p>
                                        <img src={icon} alt="Аккаунт"/>
                                    </div>
                                </Link>
                                </div>
                            </>
                            )}
                        </Route>
                        <Route path="/saved-movies">
                            {!loggedIn && (
                            <>
                                <div className="header__login">
                                <Link className="link" to="/profile">
                                    <div className="header__account">
                                        <p className="link header__sign-up header__sign-up_type_account">Аккаунт</p>
                                        <img src={icon} alt="Аккаунт"/>
                                    </div>
                                </Link>
                                </div>
                            </>
                            )}
                        </Route>
                        <Route path="/profile">
                            {!loggedIn && (
                            <>
                                <div className="header__login">
                                <Link className="link" to="/profile">
                                    <div className="header__account">
                                        <p className="link header__sign-up header__sign-up_type_account">Аккаунт</p>
                                        <img src={icon} alt="Аккаунт"/>
                                    </div>
                                </Link>
                                </div>
                            </>
                            )}
                        </Route>
                    </Switch>
            </div>
        </header>

    );
}

export default Header;