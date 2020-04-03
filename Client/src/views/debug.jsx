
    
import React, { Component } from 'react';
import { Grid, Cell, List, ListItem, ListItemContent} from 'react-mdl';




class login extends Component {
  render() {
    return(
     



    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <form method="POST" action="">
                            <div className="form-group row">
                                    <label for="email" className="col-md-4 col-form-label text-md-right"></label>
                                    <div className="col-md-6">
                                        <input id="email" type="email" className="form-control @error('email') is-invalid @enderror" name="email" value="  old('email')  " required autocomplete="email" autofocus/>
                                            <span className="invalid-feedback" role="alert"></span>
                                    <div className="form-group row">
                                        <label for="password" className="col-md-4 col-form-label text-md-right"></label>
                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password"/>

                                                <span className="invalid-feedback" role="alert">
                                                    <strong></strong>
                                                </span>
                                        </div>
                                    </div>


                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="remember" id="remember"/>


                                            <label className="form-check-label" for="remember">
                                            
                                            </label>
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                        
                                        </button>


                                        
                                            <a className="btn btn-link" href="">
                                            
                                            </a>
                                        
                                    </div>
                                </div>
                                </div>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>



    )
  }
}


export default login;
 

















