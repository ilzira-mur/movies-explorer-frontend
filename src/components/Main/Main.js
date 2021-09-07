import './Main.css';
import Promo from '../Main/Promo/Promo';
import AboutProject from '../Main/AboutProject/AboutProject';
import Thechs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Main({loggedIn}) {
    

    return (
        <main className="main">
            <Header loggedIn={loggedIn}/>
            <Promo />
            <AboutProject />
            <Thechs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </main>

    );
}

export default Main;