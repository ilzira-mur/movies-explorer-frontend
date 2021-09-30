import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onNavigation, onSignOut, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();

    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
      }, [currentUser]); 

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name: name,
          email: email,
        });
      } 

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    return (
        <section className="register">
                 <Header onNavigation={onNavigation}/>
                 <h2 className="profile__header">Привет, {name}!</h2>
                 <form onSubmit={handleSubmit} className="profile__info">
                    <div className="profile__data">
                        <p className="profile__text">Имя</p>
                        <input className="profile__text profile__input" value={name || ''} onChange={handleNameChange} type="text" id ="profilename" name="profilename" required />
                    </div>
                    <div className="profile__data">
                        <p className="profile__text">E-mail</p>
                        <input className="profile__text profile__input" value={email || ''} onChange={handleEmailChange} type="text" id="profileemail" name="profileemail" required />
                    </div>
                    <button type="submit" className="link button profile__button">Редактировать</button>
                 </form>
                 <button className="link button profile__button profile__button_tupe_exit" onClick={onSignOut}>Выйти из аккаунта</button>
        </section>
    );
}

export default Profile;