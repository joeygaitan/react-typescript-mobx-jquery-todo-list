import { observable, action } from 'mobx';
import React, {FC, useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import {Link, useHistory, withRouter } from 'react-router-dom';

import { signUp } from '../../utils/authentication';
import { errorMessages } from '../../utils/failureStrings';

import filter from '../../utils/inputValidation'
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

interface IIndexable {
    [key:string]:any;
}

interface PasswordState extends IIndexable {
    capitalCheck: string;
    lowerCaseCheck: string;
    numberCheck: string;
    specialCharacterCheck: string;
    inputValueClicked: string;
}


const SignUp : FC = (props) => {
    
    let history = useHistory();
    const [state, setState] = useState<SignUpState>({firstname: "", lastname:"", email:"", username:"", password:"", errorMessage:"", displayPassword:false, failure:false});
    
    const [passwordState, setPasswordState] = useState({ capitalCheck:false, lowerCaseCheck:false, numberCheck:false, specialCharacterCheck:false, inputValueClicked:false})

    const SpecialCharacterRef = useRef<any>({...passwordState})

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

    const verifyValue = (regex:RegExp, value:string) => {
        
        if (regex.test(state.password)) {
            SpecialCharacterRef.current[value] = true;
        }
         else {
            SpecialCharacterRef.current[value] = false;
        }
    } 

    

    const checkInputValue = () => {
        verifyValue(/[a-z]/g, "lowerCaseCheck")
        verifyValue(/[A-Z]/g, "capitalCheck")
        verifyValue(/[\!|\@|\?|\_|\-|\*|\~]/, "specialCharacterCheck")
        verifyValue(/[0-9]/g, "numberCheck")

        if(SpecialCharacterRef.current.capitalCheck && SpecialCharacterRef.current.lowerCaseCheck && SpecialCharacterRef.current.numberCheck && SpecialCharacterRef.current.specialCharacterCheck && state.password.length >= 8) {
            setState({
                ...state,
                ["failure"]:false 
            })
            return
        } else {
            setState({
                ...state,
                ["failure"]:true,
                
            })
            return
        }
    }

    useEffect(()=>{
        checkInputValue()
    }, [state.password])

    return (<div>
            {(state.errorMessage.length > 0) ? <p>{state.errorMessage}</p> : ""}
            <br/>
            <br/>
            first name
            <input name="firstname" defaultValue={state.firstname} onChange={(event)=>{
                const { name, value } = event.target;
                setState({
                    ...state,
                    [name]: value
                })
            }}/>
            <br/>
            <br/>
            last name
            <input name="lastname" defaultValue={state.lastname} onChange={(event)=>{
                let { name, value } = event.target;
                value = filter.clean(value) 
                setState({
                    ...state,
                    [name]:value
                })
            }}/>
            <br/>
            <br/>
            <br/>
            email
            <input name="email" type="email" defaultValue={state.email} onChange={(event)=>{
                let { name, value } = event.target;
                value = filter.clean(value)
                setState({
                    ...state,
                    [name]:value
                })
            }}/>
            <br/>
            <br/>
            username
            <input name="username" defaultValue={state.username} onChange={(event)=>{
                let { name, value } = event.target;
                value = filter.clean(value)
                setState({
                    ...state,
                    [name]:value
                })
            }}/> 
            <br/>
            <br/>
            password
            <input name="password" defaultValue={state.password} type={(state.displayPassword) ? "text":"password"} onChange={(event)=>{
                const { name, value } = event.target;
                setState({
                    ...state,
                    [name]:value
                })
                setPasswordState({
                    ...passwordState,
                    ["inputValueClicked"]:true
                })
                
            }}/>
            <button onClick={()=>{
                setState({
                    ...state,
                    ["displayPassword"]:!state.displayPassword
                })
            }}></button>
            <br/>
            <br/>
                {(passwordState.inputValueClicked) ? (<div>
                    <p>at least 8 characters: {(state.password.length >= 8)? "passed" : "failed"}</p>
                    <br/>
                    <p> At least one lower case alphabetical character: {(SpecialCharacterRef.current.lowerCaseCheck) ? "passed": "failed"}</p>
                    <br/>
                    <p>At least one upper case alphabetical character: {(SpecialCharacterRef.current.capitalCheck) ? "passed": "failed"}</p>
                    <br/>
                    <p>At least one of these special characters (?!@_-*~): {(SpecialCharacterRef.current.specialCharacterCheck) ? "passed":"failed"}</p>
                    <br/>
                    <p> At least one numerical number: {(SpecialCharacterRef.current.numberCheck)?"passed" :"failed"}</p></div>) :""}  

            <br/>
            <button onClick={onSignUp}>Sign Up</button>
            <br/>
            <Link to={"/login"}><button>Already have an account? login!</button></Link>
        </div>) 
}

export default SignUp;