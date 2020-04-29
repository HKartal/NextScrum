//wouter
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import LandingPage from './landingpage';
import create from './create';
import login from './login';
import Projects from './projects';
import home from './home';
import board from './board';
import Project from './project';
import TicketCRUDView from './ticket';
import ProtectedRoute from '../components/protected.route';
import Logout from '../components/logout.route';
import RegisterView from './register';

const Main = (props) => {
  console.log(props);
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <ProtectedRoute path="/create" component={create} />
      <Route path="/login" component={login} />
      <Route path="/register" component={RegisterView} />
      <ProtectedRoute path="/projects" component={Projects} />
      <ProtectedRoute path="/project/:id" component={Project} />
      <ProtectedRoute path="/ticket/:project_id/:ticket_id" component={TicketCRUDView} />
      <ProtectedRoute path="/ticket/:project_id/" component={TicketCRUDView} />
      <Route path="/home" component={home} />
      <ProtectedRoute path="/board/:project_id" component={board} />
      <ProtectedRoute path="/logout" component={Logout} />
    </Switch>
    );
}

export default withRouter(Main);
