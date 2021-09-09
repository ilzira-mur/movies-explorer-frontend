import React from 'react';
import '../Register/Register.css';
import logo from '../../images/logo_main.svg';
import { Link } from 'react-router-dom';

function Login() {

    return (
        <section className="register">
              <div className="register__container">
                  <div className="register__top">
                    <Link to="/" className="link header__logo"><img src={logo} alt="Логотип"/></Link>
                    <h2 className="register__header">Рады видеть!</h2>
                  </div>
                  <form className="register__form">
                    <p className="register__name">E-mail</p>
                    <input className="register__input" type="email" placeholder="" required></input>
                    <p className="register__name">Пароль</p>
                    <input className="register__input" type="password" placeholder="" required></input>
                    <span className="register__error"></span>
                    <button className="link button register__button">Войти</button>
                  </form>
                  <div className="register__signin">
                      <p className="register__text">Ещё не зарегистрированы?</p>
                      <Link to="/signup" className="link button register__link">Регистрация</Link>
                  </div>
              </div>
          </section>
    );
}

export default Login;