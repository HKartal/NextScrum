//wouter
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './landingpage';
import create from './create';
import login from './login';
import Projects from './projects';
import home from './home';
import board from '../views/board';

const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/create" component={create} />
    <Route path="/login" component={login} />
    <Route path="/projects" component={Projects} />
    <Route path="/home" component={home} />
    <Route path="/board/" component={board} />
  </Switch>
)

export default Main;
