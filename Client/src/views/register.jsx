import React from 'react';
import {Redirect} from 'react-router-dom';

import Logo from '../nextscrumlogo.png';

import auth from '../utils/Auth';

 
 
 
 
class RegisterView extends React.Component {
  
  state = {
    loggedIn: false,
    missingFields: false,
    mailInvalid: false,
    mailTaken: false,
    passwordMissMatch: false,
  }
 
  
  
 
  register = (e) =>{
    e.preventDefault();
    let name = document.querySelector(".name-input-field").value;
    let email = document.querySelector(".email-field").value;
    let password = document.querySelector(".password-input-field").value;
    let password_confirmation = document.querySelector(".password-repeat-input-field").value;
    auth.register({name, email, password, password_confirmation}, ()=>{
      console.log(1);
      auth.login({
        email, password
      }, ()=>{
        this.setState({loggedIn: true});
        window.location.reload();
      }, null);
    }, (info)=>{
      console.log(2);
      let fieldMissed = false;
      let mailInvalid = false;
      let mailTaken = false;
      let passwordMissMatch = false;

      const {name, email, password} = info.errors;

      if(name){
        fieldMissed = true;
      }
      if(email){
        console.log(email);
        if(email.indexOf("The email must be a valid email address.") !== -1){
          mailInvalid = true;
        }else if(email.indexOf("The email field is required.") !== -1){
          fieldMissed = true;
        }else if(email.indexOf("The email has already been taken.") !== -1){
          mailTaken = true;
        }
      }
      if(password){
        if(password.indexOf("The password field is required.") !== -1){
          fieldMissed = true;
        }else if(password.indexOf("The password confirmation does not match.") !== -1){
          passwordMissMatch = true;
        }
      }
      
      this.setState({
        missingFields: fieldMissed,
        mailInvalid,
        mailTaken,
        passwordMissMatch
      });

      setTimeout(()=>{
        this.setState({
          missingFields: false,
          mailInvalid: false,
          mailTaken: false,
          passwordMissMatch: false
        });
      }, 3000);


    });

  }

  componentDidMount(){
    if(auth.isLoggedIn()){
      this.props.history.push('/projects');
    }
  }
 
  render() {

    const {missingFields, mailInvalid, mailTaken, passwordMissMatch} = this.state;

    return (
      <div className="container-fluid register-background">
        {this.state.loggedIn ? 
          <Redirect to="/projects"/>
        : null}

        <div className="row">
          <div className="col-lg-12 register-container-spacer"></div>
        </div>
        <div className="container register-container"> 
          <div className="login-logo-wrapper">
            <img className="login-logo" src={Logo} alt=""/>
          </div>
          <h5 className="register-head-text mt-3">Registreer</h5>
          <div className="errorArea">
            {missingFields ? 
                <div className="alert alert-danger">
                  Alle velden moeten ingevuld zijn!
                </div>
              : null}
              {mailInvalid ? 
                <div className="alert alert-danger">
                  Geef een geldig email adres op!
                </div>
              : null}
               {mailTaken ? 
                <div className="alert alert-danger">
                  Er bestaat al een account met dit email adres!
                </div>
              : null}


              {passwordMissMatch ? 
                <div className="alert alert-danger">
                  De ingevulde wachtwoorden komen niet overeen!
                </div>
              : null}
          </div>
          <div className="name-field">
           

            <input name='text' className="custom-field name-input-field  mt-4" placeholder='naam' />
          </div>

          <div className="mail-field">
            <input name='email' className="custom-field email-field  " placeholder='email' />
          </div>
          <div className="password-field mb-3">
            <input name='password' className="custom-field password-input-field my-3 " placeholder='wachtwoord' type='password'/>
          </div>
          <div className="password-repeat-field mt-2">
            <input name='password' className="custom-field password-repeat-input-field mt-4" placeholder='herhaal wachtwoord' type='password'/>
          </div>
          <div className="button-register-field">
            <button className="btn btn-branded " onClick={this.register}>Registreer</button>
          </div>
        </div>
        <br />
       
      </div>
    );
  }
}
 

export default RegisterView;