import React from 'react';
import {Link} from 'react-router-dom';
import auth from '../utils/Auth';

const LoginOnly = ({to, text, ...rest}) => {
    if(auth.isLoggedIn()){
        return (
            <Link to={to} {...rest}>{text}</Link>
        )
    }
    return null;
}

export default LoginOnly;