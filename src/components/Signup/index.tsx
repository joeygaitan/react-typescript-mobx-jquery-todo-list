import { observable, action } from 'mobx';
import React, {FC, useState } from 'react';
import { observer } from 'mobx-react';

import {Link, useHistory, withRouter } from 'react-router-dom';

import { signUp } from '../../utils/authentication';
import { errorMessages } from '../../utils/failureStrings';

import SignUpVerification from './SignUpVerification/index';
import { stat } from 'fs';

export interface SignUpState {
    firstname: string;
    lastname: string;
    email: string;
    username:string;
    password:string;
    errorMessage:string;
    displayPassword:boolean;
    failure:boolean;
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
    const [state, setState] = useState<SignUpState>({firstname: "", lastname:"", email:"", username:"", password:"", errorMessage:"", displayPassword:false, failure:false});
    
    let pathWay : PathWayLocation = { pathname:"/login", state: {username: state.username, password: state.password} }

    const onSignUp = async () => {

        if (state.failure) {
            setState({
                ...state,
                ["errorMessage"]: "password doesn't meet the requirements....."
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

        let result = await signUp({username: state.username, password:state.password, email:state.email, firstname:state.firstname, lastname:state.lastname})

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
    console.log(state.failure)
    return (<div>
            {(state.errorMessage.length > 0) ? <p>{state.errorMessage}</p> : ""}
            <br/>
            <br/>
            first name
            <input name="firstname" defaultValue={state.firstname} onChange={(event)=>{
                const { name, value } = event.target;
                setState({
                    ...state,
                    [name]:value
                })
            }}/>
            <br/>
            <br/>
            last name
            <input name="lastname" defaultValue={state.lastname} onChange={(event)=>{
                const { name, value } = event.target;
                setState({
                    ...state,
                    [name]:value
                })
            }}/>
            <br/>
            <br/>
            <SignUpVerification state={state} changeState={setState} />
            <br/>
            <button onClick={onSignUp}>Sign Up</button>
            <br/>
            <Link to={"/login"}><button>Already have an account? login!</button></Link>
        </div>) 
}

export default SignUp;