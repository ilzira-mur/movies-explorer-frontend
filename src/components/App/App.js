import React, { useEffect, useState } from 'react';
import './App.css';
import Main from '../Main/Main';
import { Route, Switch, useHistory } from "react-router-dom";
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Navigation from '../Navigation/Navigation';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
    // eslint-disable-next-line
    const [loggedIn, setLoggedIn] = useState(false);
    const [isNavigationOpen, setNavigationOpen] = React.useState(false);
    const [savedCards, setSavedCards] = useState([]);
    // eslint-disable-next-line
    const [filteredCards, setFilteredCards] = useState([]);
    // eslint-disable-next-line
    const [filteredSavedCards, setFilteredSavedCards] = useState([])
    const [cards, setCards] = React.useState([]);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = React.useState({});
    const [userData, setUserData] = useState({});
    // eslint-disable-next-line
    const [isAuthSuccess, setAuthSuccess] = React.useState(false);
    const [checkboxSavedCards, setCheckboxSavedCards] = useState(true);// Состояние чекбокса в SavedCards
    const [checkboxCards, setCheckboxCards] = useState(true);
    const history = useHistory();
    

    useEffect(()=>{
      if (loggedIn) {
        Promise.all([mainApi.getUserInfo(), moviesApi.getMoviesCard()])
        .then(([userInfo, cards]) => {
            setCards(cards.map(card => handleMovieCard(card)));
            setCurrentUser(userInfo)
          }).catch(err => console.log(`${err}`))
        }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      mainApi.getContent(token)
      .then((res) => {
        if (res) {
          setUserData({
            name: res.name,
            email: res.email
          });
          setLoggedIn(true);
          history.push('/profile');
        }
      })
      .catch((err) => {
        if (err === 401) {
          console.log(`401 — Переданный токен некорректен`);
        }
        if (err === 400) {
          console.log(`400 — Токен не передан или передан не в том формате`);
        }
        else {
          console.log(`${err}`)
        }
      })
    }
  }

  const LS_CARDS = 'cards';
  const LS_SAVED_CARDS = 'saved-cards';
  const LS_FILTERED_CARDS = 'filtered-cards';
  const LS_FILTERED_SAVED_CARDS = 'filtered-saved-cards';

  useEffect(() => {
    localStorage.getItem(LS_CARDS) && setCards(JSON.parse(localStorage.getItem(LS_CARDS)));
  }, []);

  useEffect(() => {
    localStorage.getItem(LS_FILTERED_CARDS) && setFilteredCards(
      JSON.parse(localStorage.getItem(LS_FILTERED_CARDS)));
    localStorage.getItem(LS_FILTERED_SAVED_CARDS) && setFilteredSavedCards(
      JSON.parse(localStorage.getItem(LS_FILTERED_SAVED_CARDS)));
  }, []);

  useEffect(() => {
    loggedIn && localStorage.setItem(LS_SAVED_CARDS, JSON.stringify(savedCards));
  }, [savedCards, loggedIn]);

    const handleNavigationClick = () => {
        setNavigationOpen(true);
    };

    const closeNavigation = () => {
        setNavigationOpen(false);
    }
    const URL_SERVER_MOVIES_API = "https://api.nomoreparties.co";
    const handleMovieCard = (card) => {
        const { country, director, duration, year, description,
            image_select: image = URL_SERVER_MOVIES_API + card.image.url,
            trailer = card.trailerLink,
            thumbnail = URL_SERVER_MOVIES_API + card.image.formats.thumbnail.url,
            nameEN, nameRU, id } = card;
          return {
            country, director, duration, year, description, image, trailer, thumbnail,
            nameEN, nameRU, id
          }
    }

    const handleMoviesSearch = () => {
        let handleMovieCards;
        setLoading(true);
        moviesApi.getMoviesCard()
        .then((cards) => {
            handleMovieCards = cards.map(card => handleMovieCard(card))
            setCards(handleMovieCards);
            setLoading(false);
        })
        .catch(err => console.log(`${err}`))
    }
    
    function handleCheckboxSavedCards() {
        setCheckboxSavedCards(!checkboxSavedCards);
      }
      function handleCheckboxCards() {
        setCheckboxCards(!checkboxCards);
      }

    const handleRegister = (name, email, password) => {
        mainApi.registerUser(name, email, password)
          .then(data => {
            if (data) {
              setUserData({
                name: data.name,
                email: data.email,
                password: data.password
              });
              setAuthSuccess(true)
              history.push('/signin');
            }
          })
          .catch((err) => {
            if (err === 400) {
              console.log(`400 - некорректно заполнено одно из полей`);
              setAuthSuccess(false)
            }
          });
      }

    const handleLogin = (email, password) => {
     mainApi.loginUser(email, password)
      .then(data => {
        if (data.token) {
          setUserData({
            email: email,
            password: password
          });
          setLoggedIn(true);
          localStorage.setItem('token', data.token)
          history.push('/profile');
        }
      })
      .catch((err) => {
        if (err === 401) {
          console.log(`401 - пользователь с email не найден`);
        }
        if (err === 400) {
          console.log(`400 - не передано одно из полей `);
        }
        setAuthSuccess(false)
      });
  }

  const handleUpdateUser = (userInfo) => {
    mainApi.setUserInfo(userInfo)
    .then((newUser) => {
        setCurrentUser(newUser);
    })
    .catch(err => console.log(`${err}`))
  }

  const onSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/signin');
  }

  function handleCardLike(card) {
    const { country, director, duration, year, description, image, trailer, thumbnail,
      nameEN, nameRU, id: movieId } = card;
    const isLiked = savedCards.some((savedCard) =>
      ((savedCard.movieId === (card.id || card.movieId)) && savedCard.owner === currentUser._id));
    const deleteCard = savedCards.find((savedCard) => (
      (savedCard.movieId === (card.id || card.movieId)) && savedCard.owner === currentUser._id)) || '';
    mainApi
      .changeLikeCardStatus({
        country, director, duration, year, description, image, trailer, thumbnail,
        nameEN, nameRU, movieId
      }, deleteCard._id, !isLiked, localStorage.getItem('token'))
      .then((likeCard) => {
        setFilteredCards((state) => state.map((c) => (c.id === card.id ? card : c)));
        !isLiked ? setSavedCards([...savedCards, likeCard]) :
          setSavedCards((state) => state.filter((c) => c.movieId !== (card.id || card.movieId)));
      })
      .catch(err => console.log(`${err}`));
  }

  

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path="/">
                    <Main loggedIn={loggedIn} />
                </Route>
                <Route path="/signup">
                    <Register handleRegister={handleRegister}/>
                </Route>
                <Route path="/signin">
                    <Login handleLogin={handleLogin}/>
                </Route>
                <ProtectedRoute loggedIn={loggedIn} onCardLike={handleCardLike} onCheckbox={handleCheckboxCards} path="/movies" component={Movies} onNavigation={handleNavigationClick} cards={cards} loading={loading} onSubmit={handleMoviesSearch} filteredCards={filteredCards} />
                <ProtectedRoute loggedIn={loggedIn} onSignOut={onSignOut} onUpdateUser={handleUpdateUser} path="/profile" component={Profile} onNavigation={handleNavigationClick} name={userData.name} email={userData.email}/>
                <ProtectedRoute loggedIn={loggedIn} onCardRemove={handleCardLike} onCheckbox={handleCheckboxSavedCards} path="/saved-movies" component={SavedMovies} onNavigation={handleNavigationClick} loading={loading} savedCards={savedCards}/>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            <Navigation isOpen={isNavigationOpen} onClose={closeNavigation}/>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;