import React from 'react';
import logo from '../../images/logo_main.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header() {

    return (
        <header className="header" >
            <div className="header__container">
                <Link to="/" className="link header__logo"><img src={logo} alt="Логотип"/></Link>
                <div className="header__login">
                    <Switch>
                        <Route path="/">
                            <p className="link header__sign-up">Регистрация</p>
                            <button className="link button header__button">Войти</button>
                        </Route>
                    </Switch>
                </div>
            </div>
        </header>

    );
}

export default Header;