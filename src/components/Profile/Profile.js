import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile() {

    return (
        <section className="register">
                 <Header />
                 <h2 className="profile__header">Привет, Виталий!</h2>
                 <div className="profile__info">
                    <div className="profile__data">
                        <p className="profile__text">Имя</p>
                        <p className="profile__text">Виталий</p>
                    </div>
                    <div className="profile__data">
                        <p className="profile__text">E-mail</p>
                        <p className="profile__text">pochta@yandex.ru</p>
                    </div>
                 </div>
                 <buttom className="link button profile__button">Редактировать</buttom>
                 <buttom className="link button profile__button profile__button_tupe_exit">Выйти из аккаунта</buttom>
        </section>
    );
}

export default Profile;