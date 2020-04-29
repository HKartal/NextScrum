import auth from '../utils/Auth';

const Logout = (props) =>{
    window.location.reload();
    auth.logout(()=>{
        props.history.push('/login');
    });
    return null;
}


export default Logout;