// Author content: Wouter Oelemans
// Author footer: Okke Mengerink

import React, { Component } from 'react';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Main from './components/main';
import { Link } from 'react-router-dom';
import Logo from './nextscrumlogo.png';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="demo-big-content">
                <Layout>
                    <Header className="header" title={<Link style={{ textDecoration: 'none', color: 'white' }} to="/"><img className="logo" alt="" src={Logo} /></Link>} scroll>
                        <Navigation>
                            <Link to="/home">Home</Link>
                            <Link to="/create">Create</Link>
                            <Link to="/projects">Projects</Link>
                            <Link to="/login">Log in</Link>
                        </Navigation>
                    </Header>
                    <Drawer title={<Link style={{ textDecoration: 'none', color: 'black' }} to="/">NextScrum</Link>}>
                        <Navigation>
                            <Link to="/home">Home</Link>
                            <Link to="/create">Create</Link>
                            <Link to="/projects">Projects</Link>
                            <Link to="/login">Log in</Link>
                        </Navigation>
                    </Drawer>
                    <Content>
                        <div className="page-content" />
                        <Main />
                    </Content>
                    <footer className="footer">
                        <div className="footer-columns">
                            <div className="row">
                                <div className="col-4">
                                    <p className="m-2">NextScrum is een project van 6 studenten van Aventus Apeldoorn. Deze studenten hebben dit project gekozen aangezien ze verbeterpunten zagen in het gebruik van scrum.</p>
                                </div>
                                <div className="col-4">
                                <p className="m-2">Dit project is gemaakt door: Wouter, Hakan, Rick, Jermain, Loic en Okke!</p>
                                </div>
                                <div className="col-4">
                                <p className="m-2">Onze opdracht gever is de heer Fleur, de heer Fleur heeft ontzettend veel ervaring in het maken en gebruiken van scrumborden. Om dezelfde reden is de top-docent een uitstekende product owner!</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 m-2">
                                    <div className="footer-column-copyright">
                                        <p>©2020 - ROC Aventus Apeldoorn</p>
                                    </div>
                                </div>
                                <div className="col-1">
                                    <div className="footer-column-icons">
                                        <a href="www.facebook.com"><i className="fa fa-facebook m-2"></i></a>
                                        <a href="www.instagram.com"><i className="fa fa-instagram m-2"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </Layout>
            </div>

        );
    }
}

export default App;
