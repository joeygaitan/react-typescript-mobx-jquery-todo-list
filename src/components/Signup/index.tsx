import { observable, action } from 'mobx';
import React, {FC, useState } from 'react';
import { observer } from 'mobx-react';

import {Link, useHistory, withRouter } from 'react-router-dom';

import { signUp } from '../../utils/authentication';
import { errorMessages } from '../../utils/failureStrings';
import { stat } from 'fs';

interface SignUpState {
    username:string;
    password:string;
    errorMessage:string;
    displayPassword:boolean;
}

interface LocationState {
    username:string;
    password:string;
}

interface PathWayLocation {
    pathname: string;
    state: LocationState;
}

const SignUp : FC = (props) => {
    let history = useHistory();
    const [state, setState] = useState<SignUpState>({username:"", password:"", errorMessage:"", displayPassword:false});
    
    let pathWay : PathWayLocation    = { pathname:"/login", state: {username: state.username, password: state.password} }

    const onSignUp = async () => {
        let result = await signUp({username: state.username, password:state.password})

        if (result){
            history.push(pathWay)
        } else {
            setState({
                ...state,
                ["errorMessage"]: "Username or password failed"
            })
            setInterval(()=>{
                setState({
                ...state,
                ["errorMessage"]: ""
            })
            clearInterval()
            },5000)
            return
        }
    }

    return (<div>
            {(state.errorMessage.length > 0) ? <p>{state.errorMessage}</p> : ""}
            username
            <input name="username" defaultValue={state.username} onChange={(event)=>{
                const { name, value } = event.target;
                setState({
                    ...state,
                    [name]:value
                })
            }}/>
            <br/>
            password
            <input name="password" defaultValue={state.password} type={(state.displayPassword) ? "text":"password"} onChange={(event)=>{
                const { name, value } = event.target;
                setState({
                    ...state,
                    [name]:value
                })
            }}/>
            <button onClick={()=>{
                setState({
                    ...state,
                    ["displayPassword"]:!state.displayPassword
                })
            }}></button>
            <br/>
            <button onClick={onSignUp}>Sign Up</button>
            <br/>
            <Link to={"/login"}><button>Already have an account? login!</button></Link>
        </div>) 
}

export default SignUp;