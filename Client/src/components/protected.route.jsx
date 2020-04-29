import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../utils/Auth';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
               
                if(auth.isLoggedIn()){
                    return <Component {...props}/>
                }else{
                    console.log("not authenticated");
                    return <Redirect to="/login"/>
                }
            }
        }/>
    );
}

export default ProtectedRoute;