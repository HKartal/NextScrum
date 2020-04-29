import React from 'react';
import {Redirect} from 'react-router-dom';

import Logo from '../nextscrumlogo.png';

import auth from '../utils/Auth';
//wouter

// import { Grid, Cell, List, ListItem, ListItemContent} from 'react-mdl';
 
 
 
 
class Login extends React.Component {
  
  state = {
    loggedIn: false,
  }
 
  login = (e) =>{
    e.preventDefault();
    let email = document.querySelector(".email-field").value;
    let password = document.querySelector(".password-input-field").value;

    auth.login({email, password}, ()=>{
      this.setState({loggedIn: true});
        window.location.reload();
    }, ()=>{
      console.log("INVALID CREDENTIALS");
    });
  }
 
  componentDidMount(){
    if(auth.isLoggedIn()){
      this.props.history.push('/projects');
    }
  }
 
  render() {
    return (
      <div className="container-fluid login-background">
        {this.state.loggedIn ? 
          <Redirect to="/projects"/>
        : null}

        <div className="row">
          <div className="col-lg-12 login-container-spacer"></div>
        </div>
        <div className="container login-container"> 
          <div className="login-logo-wrapper">
            <img className="login-logo" src={Logo} alt=""/>
          </div>
          <h5 className="login-head-text mt-5">Inloggen</h5>

          <div className="mail-field">
            <input name='email' className="custom-field email-field  mt-4" placeholder='email' />
          </div>
          <div className="password-field mt-4">
            <input name='password' className="custom-field password-input-field mt-3" placeholder='wachtwoord' type='password'/>
          </div>
          <div className="button-field mt-4 ">
            <button className="btn btn-branded " onClick={this.login}>Log in</button>
          </div>
        </div>
        <br />
       
      </div>
    );
  }
}
 

export default Login;