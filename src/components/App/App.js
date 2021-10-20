import React, { useEffect } from 'react';
import './App.css';
import Main from '../Main/Main';
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
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
    const [currentUser, setCurrentUser] = React.useState({});
    const [userData, setUserData] = React.useState({});
    const [foundMovies, setFoundMovies] = React.useState([]);
    const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
    const [checkboxSavedCards, setCheckboxSavedCards] = React.useState(true);
    const [checkboxCards, setCheckboxCards] = React.useState(true);
    const [errorFromApi, setErrorFromApi] = React.useState('');
    const [isErrorLoginFromApi, setErrorLoginFromApi] = React.useState(false);
    const [isMoviesErrorFromApi, setIsMoviesErrorFromApi] = React.useState(false);
    const [isSavedMovies, setIsSavedMovies] = React.useState(true);
    const [isSearchMovies, setIsSearchMovies] = React.useState(false);
    const [isSearching, setIsSearching] = React.useState(false);
    const [isSuccessfulNameChange, setIsSuccessfulNameChange] = React.useState(false);
    const [isFormDisabled, setIsFormDisabled] = React.useState(false);
    const [isEmptySearch, setEmptySearch] = React.useState(false);
    const [emptyResultSearch, setEmptyResultSearch] = React.useState(false);
    const imageUrl = "https://api.nomoreparties.co";
    const history = useHistory();


    useEffect(()=>{
      if (loggedIn) {
        Promise.all([
          mainApi.getUserInfo()])
        .then(([userInfo]) => {
          setCurrentUser(userInfo);
          setLoggedIn(true);
        })
        .catch(err => console.log(`${err}`))
        .finally(() => {
        });
        }
    }, [loggedIn])

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
          }
        })
        .catch((err) => {console.log(`${err}`)}
        )}
    }, [loggedIn]);

    

    useEffect(() => {
      if (loggedIn) {
        if (!localStorage.getItem('saved-cards')) {
          mainApi
          .getMoviesCard(localStorage.getItem('token'))
          .then((cards) => {
            setSavedCards(cards);
            localStorage.setItem('saved-cards', JSON.stringify(cards));
          })
          .catch((err) => {
            console.log(err);
          });
          } else {
            setSavedCards(JSON.parse(localStorage.getItem('saved-cards')));
          }
      }
    }, [currentUser, loggedIn]);

    useEffect(() => {
      localStorage.getItem('cards') && setCards(JSON.parse(localStorage.getItem('cards')));
      localStorage.getItem('found-cards') && setFoundMovies(JSON.parse(localStorage.getItem('found-cards')));
    }, []);
    
    useEffect(() => {
      loggedIn && localStorage.setItem('saved-cards', JSON.stringify(savedCards));
    }, [savedCards, loggedIn]);

    const handleRegister = (name, email, password) => {
      setErrorFromApi('');
      setIsFormDisabled(true);
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
          setErrorLoginFromApi(true);
          setErrorFromApi(err);
        })
        .finally(() => {
          setIsFormDisabled(false);
        });
    };

    const handleLogin = (email, password) => {
      setErrorFromApi('');
      setIsFormDisabled(true);
      mainApi.loginUser(email, password)
        .then(data => {
          if (data.token) {
            setUserData({
              email: email,
              password: password
            });
            setLoggedIn(true);
            localStorage.setItem('token', data.token)
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(`${err}`);
          setErrorLoginFromApi(true);
          setErrorFromApi(err);
        })
        .finally(() => {
          setIsFormDisabled(false);
        });
    }

    const handleUpdateUser = (userInfo) => {
      setErrorFromApi('');
      setIsFormDisabled(true);
      mainApi.setUserInfo(userInfo)
      .then((newUser) => {
          setCurrentUser(newUser);
          setIsSuccessfulNameChange(true);
      })
      .catch((err) => {
        console.log(`${err}`);
        setErrorLoginFromApi(true);
        setErrorFromApi(err);
      })
      .finally(() => {
          setIsFormDisabled(false);
        });
    }

    const onSignOut = () => {
      localStorage.removeItem('token');
      setLoggedIn(false);
      history.push('/');
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

    const handleMovieSearch = (search) => {
      let changeMovieCards;
      setEmptySearch(false);
      setEmptyResultSearch(false)
      setIsSearching(true);
      if (!localStorage.getItem('cards')) {
        moviesApi
          .getMoviesCard()
          .then((cards) => {
            changeMovieCards = cards.map(card => changeMovieCard(card));
            setCards(changeMovieCards);
            localStorage.setItem('cards', JSON.stringify(changeMovieCards));
            const foundMovies = movieSearch(search, changeMovieCards, 'found-cards');
            setIsSearching(false);
            setFoundMovies(foundMovies);
            
          })
          .catch((err) => {
            console.log(`${err}`);
            setIsMoviesErrorFromApi(true);
          })
      } else {
        setCards(JSON.parse(localStorage.getItem('cards')));
        setIsSearching(false);
        setFoundMovies(movieSearch(search, cards, 'found-cards'));
      }
    }

    const movieSearch = (search, cards, name) => {
    let foundMovies;
    if (search.length === 0){
      setEmptySearch(true);
    } else {
      foundMovies = cards.filter((card) => card.nameRU.toLowerCase().includes(search.toLowerCase()));
      if (foundMovies.length !== 0) {
        localStorage.setItem(name, JSON.stringify(foundMovies));
      } else {
        setEmptyResultSearch(true)
        localStorage.removeItem(name)
      }
    }
      return foundMovies;
    }

    const handleSavedMovieSearch = (search) => {
        setEmptySearch(false);
        setEmptyResultSearch(false)
        setIsSearching(true);
        if (!localStorage.getItem('saved-cards')) {
          setIsSearching(true);
          mainApi
            .getMoviesCard(localStorage.getItem('token'))
            .then((cards) => {
              setSavedCards(cards);
              localStorage.setItem('saved-cards', JSON.stringify(cards));
              setIsSearching(false);
              setFoundSavedMovies(savedMovieSearch(search, cards, 'saved-cards'));
            })
            .catch(() => {
              setIsSearching(false);
            });
        } else {
          setSavedCards(JSON.parse(localStorage.getItem('saved-cards')));
          setIsSearching(false);
          setFoundSavedMovies(savedMovieSearch(search, savedCards, 'found-saved-cards'));
        }
    }

    const savedMovieSearch = (search, cards, name) => {
      let foundSavedMovies
      if (search.length === 0){
      setEmptySearch(true);
    } else {
        foundSavedMovies = savedCards.filter((movie) => movie.nameRU.toLowerCase().includes(search.toLowerCase()));
        if (foundSavedMovies.length !== 0) {
        localStorage.setItem(name, JSON.stringify(foundSavedMovies));
      } else {
        setEmptyResultSearch(true)
        localStorage.removeItem(name)
      }
    }
        return foundSavedMovies;
    }


    const handleLikeCardStatus = (card) => {
      const { country, director, duration, year, description, image, trailer, thumbnail, nameEN, nameRU, id: movieId } = card;
      const isLiked = savedCards.some((savedCard) => ((savedCard.movieId === (card.id || card.movieId)) && savedCard.owner === currentUser._id));
      const deleteCard = savedCards.find((savedCard) => ((savedCard.movieId === (card.id || card.movieId)) && savedCard.owner === currentUser._id)) || '';
      mainApi
        .changeLikeCardStatus({
          country, director, duration, year, description, image, trailer, thumbnail, nameEN, nameRU, movieId
        }, deleteCard._id, !isLiked, localStorage.getItem('token'))
        .then((likeMovie) => {
          setFoundMovies((state) => state.map((c) => (c.id === card.id ? card : c)));
          !isLiked ? setSavedCards([...savedCards, likeMovie]) : setSavedCards((state) => state.filter((c) => c.movieId !== (card.id || card.movieId)));
        })
        .catch(err => console.log(`${err}`));
    }

    const showSavedSearchedMovies = () => {
      setIsSavedMovies(true);
    }

    const showSearchMovies = () => {
      setIsSearchMovies(true);
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
                    {!loggedIn ?
                    <Register handleRegister={handleRegister} isFormDisabled={isFormDisabled} errorFromApi={errorFromApi} isErrorLoginFromApi={isErrorLoginFromApi} setErrorFromApi={setErrorFromApi} />
                    : <Redirect to="/movies" />}
                </Route>
                <Route path="/signin">
                    {!loggedIn ?
                    <Login handleLogin={handleLogin} isFormDisabled={isFormDisabled} errorFromApi={errorFromApi} isErrorLoginFromApi={isErrorLoginFromApi} setErrorFromApi={setErrorFromApi} />
                    : <Redirect to="/movies" />}
                </Route>
                <ProtectedRoute 
                    loggedIn={loggedIn}
                    onCardLike={handleLikeCardStatus}
                    path="/movies"
                    component={Movies}
                    onNavigation={handleNavigationClick}
                    cards={cards}
                    isSearching={isSearching}
                    onSearch={handleMovieSearch}
                    foundMovies={foundMovies}
                    owner={currentUser._id}
                    savedCards={savedCards}
                    showSearchMovies={showSearchMovies}
                    isSearchMovies={isSearchMovies}
                    onCheckbox={handleCheckboxCards}
                    checkbox={checkboxCards}
                    startPreloader={startPreloader}
                    setIsSearching={setIsSearching}
                    isMoviesErrorFromApi={isMoviesErrorFromApi}
                    isEmptySearch={isEmptySearch}
                    emptyResultSearch={emptyResultSearch} />
                <ProtectedRoute 
                    loggedIn={loggedIn}
                    onSignOut={onSignOut}
                    onUpdateUser={handleUpdateUser}
                    path="/profile"
                    component={Profile}
                    onNavigation={handleNavigationClick}
                    name={userData.name}
                    email={userData.email}
                    errorFromApi={errorFromApi}
                    isErrorLoginFromApi={isErrorLoginFromApi}
                    setErrorFromApi={setErrorFromApi}
                    isSuccessfulNameChange={isSuccessfulNameChange}
                    isFormDisabled={isFormDisabled} />
                <ProtectedRoute 
                    loggedIn={loggedIn}
                    onCardRemove={handleLikeCardStatus}
                    path="/saved-movies"
                    component={SavedMovies}
                    onNavigation={handleNavigationClick}
                    savedCards={savedCards}
                    showSavedSearchedMovies={showSavedSearchedMovies}
                    foundSavedMovies={foundSavedMovies}
                    isSavedMovies={isSavedMovies}
                    savedMovieSearch={handleSavedMovieSearch}
                    onCheckbox={handleCheckboxSavedCards}
                    checkbox={checkboxSavedCards}
                    isSearching={isSearching}
                    setIsSearching={setIsSearching}
                    isMoviesErrorFromApi={isMoviesErrorFromApi}
                    isEmptySearch={isEmptySearch}
                    emptyResultSearch={emptyResultSearch} />
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            
            <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;