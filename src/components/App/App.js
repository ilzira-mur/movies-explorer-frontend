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
  
    const [loggedIn, setLoggedIn] = useState(false);
    const [isNavigationOpen, setNavigationOpen] = useState(false);
    const [savedCards, setSavedCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [cards, setCards] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [moviesCards, setMoviesCards] = useState([]);
    const [userData, setUserData] = useState({});
    const [isAuthSuccess, setAuthSuccess] = React.useState(false);
    const [isShortMovies, setIsShortMovies] = React.useState(false);
    const [foundMovies, setFoundMovies] = React.useState([]);
    const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [isSavedMoviesState, setIsSavedMoviesState] = React.useState(true);
    const [isSavedSearch, setIsSavedSearch] = React.useState(false);
    const [checkboxSavedCards, setCheckboxSavedCards] = useState(true);
    const [checkboxCards, setCheckboxCards] = useState(true);
    const history = useHistory();
    
    useEffect(() => {
      tokenCheck();
      // eslint-disable-next-line
    }, []);
  
    const tokenCheck = () => {
      const token = localStorage.getItem('token');
      if (token) {
        mainApi.getContent(token)
        .then((res) => {
          if (res) {
            setUserData({
              name: res.name,
              email: res.email
            });
            setLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((err) => {console.log(`${err}`)}
        )}
    }

    useEffect(()=>{
      setLoading(true)
      if (loggedIn) {
        Promise.all([
          mainApi.getUserInfo(),
          moviesApi.getMoviesCard()])
        .then(([userInfo, cards]) => {
          setCards(cards.map(card => handleMovieCard(card)));
          setCurrentUser(userInfo)
        })
        .catch(err => console.log(`${err}`))
        .finally(() => {
          setLoading(false);
        });
        if (localStorage.getItem("allMovies")) {
          setMoviesCards(JSON.parse(localStorage.getItem("allMovies")));
        }
        }
  }, [loggedIn])
  

  
  const LS_CARDS = 'cards';
  const LS_SAVED_CARDS = 'saved-cards';
  const LS_FILTERED_CARDS = 'filtered-cards';
  const LS_FILTERED_SAVED_CARDS = 'filtered-saved-cards';
  const JWT = 'token';
  const SHORT_MOVIE_DURATION = 40;
  
  useEffect(() => {
    if (loggedIn) {
      if (!localStorage.getItem(LS_SAVED_CARDS)) {
        getSavedMovies();
      } else {
        setSavedCards(JSON.parse(localStorage.getItem(LS_SAVED_CARDS)));
      }
    }
  }, [currentUser, loggedIn]);

  function getSavedMovies() {
    mainApi
      .getMoviesCard(localStorage.getItem(JWT))
      .then((cards) => {
        setSavedCards(cards);
        localStorage.setItem(LS_SAVED_CARDS, JSON.stringify(cards));
      })
      .catch((err) => {console.log(`${err}`)}
        );
  }

  useEffect(() => {
    localStorage.getItem(LS_CARDS) && setCards(JSON.parse(localStorage.getItem(LS_CARDS)));
  }, []);

  useEffect(() => {
    localStorage.getItem(LS_FILTERED_CARDS) && setFilteredCards(
      JSON.parse(localStorage.getItem(LS_FILTERED_CARDS)));
    localStorage.getItem(LS_FILTERED_SAVED_CARDS) && setFoundSavedMovies(
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
    const urlServerApi = "https://api.nomoreparties.co";
    const handleMovieCard = (card) => {
        const { country, director, duration, year, description,
            image_select: image = urlServerApi + card.image.url,
            trailer = card.trailerLink,
            thumbnail = urlServerApi + card.image.formats.thumbnail.url,
            nameEN, nameRU, id } = card;
          return {
            country, director, duration, year, description, image, trailer, thumbnail,
            nameEN, nameRU, id
          }
    }

  function movieSearch(searchBar) {
    if (isShortMovies) {
      const shortMovie = cards.filter((movie) => {
        return (
          movie.duration <= SHORT_MOVIE_DURATION &&
          movie.nameRU.toLowerCase().includes(searchBar.toLowerCase())
        );
      });
      setFoundMovies(shortMovie);
    } else {
      const foundMovie = cards.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchBar.toLowerCase());
      });
      return setFoundMovies(foundMovie);
    }
  }

  function savedMovieSearch(searchBar) {
    if (isShortMovies) {
      const shortMovie = savedCards.filter((movie) => {
        return (
          movie.duration <= SHORT_MOVIE_DURATION &&
          movie.nameRU.toLowerCase().includes(searchBar.toLowerCase())
        );
      });
      setFoundSavedMovies(shortMovie);
    } else {
      const foundSavedMovie = savedCards.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchBar.toLowerCase());
      });
      return setFoundSavedMovies(foundSavedMovie);
      
    }
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
          .catch((err) => {console.log(`${err}`)}
          )
          setAuthSuccess(false);
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
          history.push('/movies');
        }
      })
      .catch((err) => {console.log(`${err}`)}
      );
      setAuthSuccess(false)
  }

  const handleUpdateUser = (userInfo) => {
    mainApi.setUserInfo(userInfo)
    .then((newUser) => {
        setCurrentUser(newUser);
    })
    .catch((err) => console.log(`${err}`))
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

  function showSavedSearchedMovies() {
    setIsSavedSearch(true);
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
                <ProtectedRoute 
                  loggedIn={loggedIn}
                  onCardLike={handleCardLike}
                  path="/movies"
                  component={Movies}
                  onNavigation={handleNavigationClick}
                  cards={cards}
                  loading={loading}
                  movieSearch={movieSearch}
                  foundMovies={foundMovies}
                  filteredCards={filteredCards}
                  owner={currentUser._id}
                  savedCards={savedCards}
                  onCheckbox={handleCheckboxCards}
                  checkbox={checkboxCards} />
                <ProtectedRoute loggedIn={loggedIn} onSignOut={onSignOut} onUpdateUser={handleUpdateUser} path="/profile" component={Profile} onNavigation={handleNavigationClick} name={userData.name} email={userData.email}/>
                <ProtectedRoute 
                  loggedIn={loggedIn}
                  onCardRemove={handleCardLike}
                  path="/saved-movies"
                  component={SavedMovies}
                  onNavigation={handleNavigationClick}
                  loading={loading}
                  savedCards={savedCards}
                  showSavedSearchedMovies={showSavedSearchedMovies}
                  cards={savedMovies}
                  foundSavedMovies={foundSavedMovies}
                  isSavedMovies={isSavedMoviesState}
                  isSavedSearch={isSavedSearch}
                  savedMovies={savedMovies}
                  savedMovieSearch={savedMovieSearch}
                  onCheckbox={handleCheckboxSavedCards}
                  checkbox={checkboxSavedCards} />
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