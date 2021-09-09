import React, { useState } from 'react';
import './App.css';
import Main from '../Main/Main';
import { Route, Switch } from "react-router-dom";
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Navigation from '../Navigation/Navigation';

function App() {
    // eslint-disable-next-line
    const [loggedIn, setLoggedIn] = useState(false);
    const [isNavigationOpen, setNavigationOpen] = React.useState(false);


    const handleNavigationClick = () => {
        setNavigationOpen(true);
    };

    const closeNavigation = () => {
        setNavigationOpen(false);
    }

    return (
        <div className="page">
            <Switch>
                <Route exact path="/">
                    <Main loggedIn={loggedIn} />
                </Route>
                <Route path="/movies">
                    <Movies onNavigation={handleNavigationClick} />
                </Route>
                <Route path="/signup">
                    <Register />
                </Route>
                <Route path="/signin">
                    <Login />
                </Route>
                <Route path="/profile">
                    <Profile onNavigation={handleNavigationClick} />
                </Route>
                <Route path="/saved-movies">
                    <SavedMovies onNavigation={handleNavigationClick} />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            <Navigation isOpen={isNavigationOpen} onClose={closeNavigation}/>
        </div>
    );
}

export default App;