import {reqWithAuth, request} from './functions';

class Auth{
    constructor(){
        this.authenticated = false;
    }

    async verify(){
        
        try{
            const res = await reqWithAuth('auth/user', null, "GET");
            
            if(res.status === 200){
                this.authenticated = true;
                return true;
            }
        }catch(e){
            this.authenticated = false;
            return false;
        }
       
        
    }

    async login(credentials, success, invalid){
        const res = await request('auth/login', credentials, "POST");
        
        if(res.message){
            console.error("INVALID CREDENTIALS");
            invalid();
            return;
        }
        this.authenticated = true;
        localStorage.setItem("jwt", res.access_token);
        success();
              
          
    }

    async register(credentials, success, invalid){
        const res = await request('auth/signup', credentials, "POST");
        
        if(res.errors){
            invalid(res);
            return;
        }
        success();

    }

    async logout(callback){
        this.authenticated = false;
        localStorage.removeItem("jwt");
        await reqWithAuth('auth/logout', null, "GET");
        callback();
        
    }


    isLoggedIn(){
       
       return (localStorage.getItem("jwt") === null) ? false : true;
       
    }

}

export default new Auth();