
const API_LOCATION = 'http://127.0.0.1:8000/api/';


// /**
//  * 
//  * @param {string} url 
//  * @param {object} data 
//  * @param {string} method 
//  * 
//  * @returns {Promise}
//  */
// async function reqWithAuth(url, data, method){
//     let token = localStorage.getItem("jwt");



//     let headers = {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "authorization": `Bearer ${token}`,
//     }

//     if(method === "GET" || method === "HEAD"){
//         const response = await fetch(API_LOCATION + url, {
//             method,
//             headers,
            
//         });
    
//         return response.json();
//     }

  

//     const response = await fetch(API_LOCATION + url, {
//         method,
//         headers,
//         body: JSON.stringify(data),
        
//     });



//     return response.json();


// }

async function reqWithAuth(url, data, method){
    let token = localStorage.getItem("jwt");



    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "authorization": `Bearer ${token}`,
    }

    if(method === "GET" || method === "HEAD"){
        try{
            const response = await fetch(API_LOCATION + url, {
                method,
                headers,
                
            });
        
            return response;
        }catch(e){
            return null;
        }
    }

  

    const response = await fetch(API_LOCATION + url, {
        method,
        headers,
        body: JSON.stringify(data),
        
    });



    return response;

}

async function request(url, data, method){

    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    const response = await fetch(API_LOCATION + url, {
        method,
        headers,
        body: JSON.stringify(data),
        
    });

    return response.json();

}

export {reqWithAuth, request};