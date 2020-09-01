 export interface signUpInput {
   username: string;
   password: string; 
   email:string;
   firstname:string;
   lastname:string;
}

export interface LoginInput {
    username: string;
    password: string;
}

const signUp = async ({username, password, firstname, lastname, email}:signUpInput) => {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/signup/`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({username,password,firstname,lastname,email})
        })
        let result = await response.json();
        return true
    } catch {
        console.log("failed to signup")
        return false
    }
}

const login = async ({username, password}: LoginInput) => {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/login/`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({username,password})
        })
        let { token } = await response.json()
        sessionStorage.setItem('Authorization', token);
        return true
    } catch {
        console.log("failed to login")
        return false
    }
}

const tokenCheck = async () => {
    const token = sessionStorage.getItem('Authorization');
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/login/token`, 
        {
            method: 'get',
            mode: 'cors',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token ? `Bearer ${token}`: ''
            }
        },
       )
        let {username, id, iat} = await response.json();
        console.log(username)
        return { username, pending:false }
    } catch {
        console.log("failed to authenticate. Missing token....")
        return { username:null, pending:false }
    }
    
}

const getToken = () => {
    const token = sessionStorage.getItem('Authorization');

    if (token) {
        return token
    } else {
        return null
    }
}

const singOut = () => {
    sessionStorage.removeItem('Authorization');
    //clear mobx username and pending.....
} 

export { login, tokenCheck, signUp, singOut, getToken };