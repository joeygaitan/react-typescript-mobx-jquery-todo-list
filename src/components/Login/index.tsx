import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import React, { FC, useState, useEffect } from 'react';
import {Link, RouteComponentProps } from 'react-router-dom';

import { login } from '../../utils/authentication'; 
import { setInterval } from 'timers';

interface DefaultState {
    username?:string;
    password?:string;
    errorMessage?:string;
    displayPassword?:boolean;
}

const Login:FC<RouteComponentProps> = (props) => {

    let defaultState: DefaultState = {}
    
    // check for signup input
    if (props.location.state){
        defaultState = { ...props.location.state, errorMessage: "",displayPassword:false  };
    } else {
        defaultState = { username: "", password: "", errorMessage : "", displayPassword:false };
    }

    const [ inputState, setInputState ] = useState<DefaultState>(defaultState)


    const onLogin = async (event:any) => { 
        event.preventDefault();
        console.log(inputState.password)
        let token = sessionStorage.getItem('Authorization')
        // checks if user is already signed in.... Need to rework this since it needs to take a request to check if the token is correct... 
        if (token) {
            token = "";
            setInputState({
                ...inputState,
                ["errorMessage"]: "Already Logged In"
            })
            setInterval(()=>{
                setInputState({
                ...inputState,
                ["errorMessage"]: ""
            })
            clearInterval()
            },10000)
            props.history.push('/')
        }

        if (inputState.username == "" && inputState.password == "") {
            setInputState({
                ...inputState,
                ["errorMessage"]: "Username or password can't be left empty"
            })
            setInterval(()=>{
                setInputState({
                ...inputState,
                ["errorMessage"]: ""
            })
            clearInterval()
            },5000)
            return
        }
        
        let result = await login({username:inputState.username || "", password:inputState.password || ""})
        
        if (result === true) {
            console.log("here")
            props.history.push('/')
        } else {
            setInputState({
                ...inputState,
                ["errorMessage"]: "Username or password are wrong. please type in the correct information"
            })
            setInterval(()=>{
                setInputState({
                ...inputState,
                ["errorMessage"]: ""
            })
            clearInterval()
            },5000)
            return
        }
    }

    return (
        <div>
            {(inputState.errorMessage !== "") ? <p>{inputState.errorMessage}</p> : ""}
            <p>please input username</p>
            <form onSubmit={onLogin}>
            <input value={inputState.username} name='username' onChange={(event)=>{
                const {name, value} = event.target
                setInputState({
                  ...inputState,
                  [name]:value  
                })
            }}/>
            <br/>
            <p>please input password</p>
            <input value={inputState.password} type={(inputState.displayPassword) ? "text":"password"} name='password' onChange={(event)=>{
                const {name, value} = event.target
                setInputState({
                  ...inputState,
                  [name]:value  
                })
            }}/>
            <button onClick={()=>{
                setInputState({
                    ...inputState,
                    ["displayPassword"]:!inputState.displayPassword
                })
            }}></button>
            <br/>
            <button type="submit">Login</button>
            <br/>
            </form>
            <Link to="/signup"><button>New Here? Sign up!</button></Link>
        </div>
    )
}

export default Login;