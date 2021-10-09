import React, { useEffect } from 'react';
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
  
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isNavigationOpen, setNavigationOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [savedCards, setSavedCards] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [userData, setUserData] = React.useState({});
    const [foundMovies, setFoundMovies] = React.useState([]);
    const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
    const [checkboxSavedCards, setCheckboxSavedCards] = React.useState(false);
    const [checkboxCards, setCheckboxCards] = React.useState(false);
    const [errorFromApi, setErrorFromApi] = React.useState('');
    const [isSavedMovies, setIsSavedMovies] = React.useState(true);
    const [isSearching, setIsSearching] = React.useState(false);
    const imageUrl = "https://api.nomoreparties.co";
    const history = useHistory();
    
    useEffect(() => {
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
    }, [history]);

    useEffect(()=>{
      setLoading(true)
      if (loggedIn) {
        Promise.all([
          mainApi.getUserInfo()])
        .then(([userInfo]) => {
          setCurrentUser(userInfo);
        })
        .catch(err => console.log(`${err}`))
        .finally(() => {
          setLoading(false);
        });
        }
    }, [loggedIn])

    useEffect(() => {
      if (loggedIn) {
        if (!localStorage.getItem('saved-cards')) {
          getSavedMovies();
        } else {
          setSavedCards(JSON.parse(localStorage.getItem('saved-cards')));
        }
      }
    }, [currentUser, loggedIn]);

    const getSavedMovies = () => {
      mainApi
        .getMoviesCard(localStorage.getItem('token'))
        .then((cards) => {
          setSavedCards(cards);
          localStorage.setItem('saved-cards', JSON.stringify(cards));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(() => {
      localStorage.getItem('cards') && setCards(JSON.parse(localStorage.getItem('cards')));
      localStorage.getItem('found-cards') && setFoundMovies(JSON.parse(localStorage.getItem('found-cards')));
      localStorage.getItem('found-saved-cards') && setFoundSavedMovies(JSON.parse(localStorage.getItem('found-saved-cards')));
    }, []);
    
    useEffect(() => {
      loggedIn && localStorage.setItem('saved-cards', JSON.stringify(savedCards));
    }, [savedCards, loggedIn]);

    const handleRegister = (name, email, password) => {
      setErrorFromApi('');
      mainApi.registerUser(name, email, password)
        .then(data => {
          if (data) {
            handleLogin(email, password);
            setUserData({
              name: data.name,
              email: data.email,
              password: data.password
            });
            history.push('/signin');
          }
        })
        .catch((err) => {
          console.log(`${err}`);
          setErrorFromApi(err);
        })
    };

    const handleLogin = (email, password) => {
      setErrorFromApi('');
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
        .catch((err) => {
          console.log(`${err}`);
          setErrorFromApi(err);
        });
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

    const changeMovieCard = (card) => {
      const { country, director, duration, year, description,
        image_select: image = imageUrl + card.image.url,
        trailer = card.trailerLink,
        thumbnail = imageUrl + card.image.formats.thumbnail.url, nameEN, nameRU, id } = card;
        return {
          country, director, duration, year, description, image, trailer, thumbnail, nameEN, nameRU, id
        }
    }

    const handleMovieSearch = (query) => {
      let changeMovieCards;
      setLoading(true);
      if (!localStorage.getItem('cards')) {
        setLoading(true);
        moviesApi
          .getMoviesCard()
          .then((cards) => {
            changeMovieCards = cards.map(card => changeMovieCard(card));
            setCards(changeMovieCards);
            localStorage.setItem('cards', JSON.stringify(changeMovieCards));
            setFoundMovies(movieSearch(query));
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setCards(JSON.parse(localStorage.getItem('cards')));
        setLoading(false);
        setFoundMovies(movieSearch(query));
      }
    }

    const movieSearch = (query) => {
      if (checkboxCards) {
        const shortMovie = cards.filter((movie) => {
          return (
            movie.duration <= 40 && movie.nameRU.toLowerCase().includes(query.toLowerCase())
          );
        });
        return shortMovie;
      } else {
        const foundMovie = cards.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(query.toLowerCase());
        });
        return foundMovie;
      }
    }

    const savedMovieSearch = (search) => {
      if (checkboxSavedCards) {
        const shortMovie = savedCards.filter((movie) => {
          return (
            movie.duration <= 40 && movie.nameRU.toLowerCase().includes(search.toLowerCase())
          );
        });
        setFoundSavedMovies(shortMovie);
      } else {
        const foundSavedMovie = savedCards.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(search.toLowerCase());
        });
        setFoundSavedMovies(foundSavedMovie);
      }
    }

    const handleLikeCardStatus = (card) => {
      const { country, director, duration, year, description, image, trailer, thumbnail, nameEN, nameRU, id: movieId } = card;
      const isLiked = savedCards.some((savedCard) => ((savedCard.movieId === card.movieId) && savedCard.owner === currentUser._id));
      const deleteCard = savedCards.find((savedCard) => ((savedCard.movieId === card.movieId) && savedCard.owner === currentUser._id)) || '';
      mainApi
        .changeLikeCardStatus({
          country, director, duration, year, description, image, trailer, thumbnail, nameEN, nameRU, movieId
        }, deleteCard._id, !isLiked, localStorage.getItem('token'))
        .then((likeMovie) => {
          setFoundMovies((state) => state.map((c) => (c.id === card.id ? card : c)));
          !isLiked ? setSavedCards([...savedCards, likeMovie]) : setSavedCards((state) => state.filter((c) => c.movieId !== card.movieId));
          console.log(card)
        })
        .catch(err => console.log(`${err}`));
    }

    const showSavedSearchedMovies = () => {
      setIsSavedMovies(true);
    }

    const handleNavigationClick = () => {
        setNavigationOpen(true);
    };

    const closeNavigation = () => {
        setNavigationOpen(false);
    }

    const handleCheckboxSavedCards = () => {
        setCheckboxSavedCards(!checkboxSavedCards);
    }
      
    const handleCheckboxCards = () => {
        setCheckboxCards(!checkboxCards);
    }

    const startPreloader = () => {
      setIsSearching(true);
      setTimeout(async () => {
        setIsSearching(false);
      }, 100);
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path="/">
                    <Main loggedIn={loggedIn} />
                </Route>
                <Route path="/signup">
                    <Register handleRegister={handleRegister} errorFromApi={errorFromApi} setErrorFromApi={setErrorFromApi} />
                </Route>
                <Route path="/signin">
                    <Login handleLogin={handleLogin} errorFromApi={errorFromApi} setErrorFromApi={setErrorFromApi} />
                </Route>
                <ProtectedRoute 
                    loggedIn={loggedIn}
                    onCardLike={handleLikeCardStatus}
                    path="/movies"
                    component={Movies}
                    onNavigation={handleNavigationClick}
                    cards={cards}
                    loading={loading}
                    onSearch={handleMovieSearch}
                    foundMovies={foundMovies}
                    owner={currentUser._id}
                    savedCards={savedCards}
                    onCheckbox={handleCheckboxCards}
                    checkbox={checkboxCards}
                    startPreloader={startPreloader}
                    setIsSearching={setIsSearching}
                    isSearching={isSearching} />
                <ProtectedRoute 
                    loggedIn={loggedIn}
                    onSignOut={onSignOut}
                    onUpdateUser={handleUpdateUser}
                    path="/profile"
                    component={Profile}
                    onNavigation={handleNavigationClick}
                    name={userData.name}
                    email={userData.email} />
                <ProtectedRoute 
                    loggedIn={loggedIn}
                    onCardRemove={handleLikeCardStatus}
                    path="/saved-movies"
                    component={SavedMovies}
                    onNavigation={handleNavigationClick}
                    loading={loading}
                    savedCards={savedCards}
                    showSavedSearchedMovies={showSavedSearchedMovies}
                    foundSavedMovies={foundSavedMovies}
                    isSavedMovies={isSavedMovies}
                    savedMovieSearch={savedMovieSearch}
                    onCheckbox={handleCheckboxSavedCards}
                    checkbox={checkboxSavedCards} />
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;