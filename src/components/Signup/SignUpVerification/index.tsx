import React, { FC, useState, useEffect } from 'react';

import { SignUpState } from '../index'

interface SignUpInputProps {
    state:SignUpState,
    changeState: (state:SignUpState) => void
}

const SingUpVerification:FC<SignUpInputProps> = ({state, changeState}:SignUpInputProps) => {

    const [passwordState, setPasswordState] = useState({lengthCheck:false, capitalCheck:false, lowerCaseCheck:false, numberCheck:false, specialCharacterCheck:false, inputValueClicked:false})
    // ?!@_-*~
    const checkInputValue = () => {
        let characterCheck = new RegExp("[a-z]", "g")
        let capitalCheck = new RegExp("[A-Z]", "g")
        let specialCharCheck = new RegExp("[\!|\@|\?|\_|\-|\*|\~]", "g")
        let numeralCheck = new RegExp("[0-9]", "g")
        
        if (state.password.length > 8) {
            console.log(state.password.length)
            setPasswordState({
                ...passwordState,
                ["lengthCheck"]:true
            })
        } else {
            setPasswordState({
                ...passwordState,
                ["lengthCheck"]:false
            })
        }

        if (characterCheck.test(state.password)) {
            setPasswordState({
                ...passwordState,
                ["lowerCaseCheck"]:true
            })
        } else {
            setPasswordState({
                ...passwordState,
                ["lowerCaseCheck"]:false
            })
        }
        console.log(capitalCheck.test(state.password))
        if (capitalCheck.test(state.password)) {
            setPasswordState({
                ...passwordState,
                ["capitalCheck"]:true
            })
        } else {
            setPasswordState({
                ...passwordState,
                ["capitalCheck"]:false
            })
        }
        
        if (specialCharCheck.test(state.password)) {
            console.log(specialCharCheck.test(state.password), "on line 58")
            setPasswordState({
                ...passwordState,
                ["specialCharacterCheck"]:true
            })
        } else {
            setPasswordState({
                ...passwordState,
                ["specialCharacterCheck"]:false
            })
        }

        if (numeralCheck.test(state.password)) {
            setPasswordState({
                ...passwordState,
                ["numberCheck"]:true
            })
        } else {
            setPasswordState({
                ...passwordState,
                ["numberCheck"]:false
            })
        }

        if(passwordState.capitalCheck && passwordState.lengthCheck && passwordState.lowerCaseCheck && passwordState.numberCheck && passwordState.specialCharacterCheck) {
            changeState({
                ...state,
                ["failure"]:false 
            })
        } else {
            changeState({
                ...state,
                ["failure"]:true,
                
            })
        }
    }

    console.log(state.password, passwordState)

    useEffect(()=>{

        checkInputValue()
    }, [state.password])

    return (
        <>
            <br/>
            email
            <input name="email" type="email" defaultValue={state.email} onChange={(event)=>{
                const { name, value } = event.target;
                changeState({
                    ...state,
                    [name]:value
                })
            }}/>
            <br/>
            <br/>
            username
            <input name="username" defaultValue={state.username} onChange={(event)=>{
                const { name, value } = event.target;
                changeState({
                    ...state,
                    [name]:value
                })
            }}/> 
            <br/>
            <br/>
            password
            <input name="password" defaultValue={state.password} type={(state.displayPassword) ? "text":"password"} onChange={(event)=>{
                const { name, value } = event.target;
                changeState({
                    ...state,
                    [name]:value
                })
                setPasswordState({
                    ...passwordState,
                    ["inputValueClicked"]:true
                })
            }}/>
            <button onClick={()=>{
                changeState({
                    ...state,
                    ["displayPassword"]:!state.displayPassword
                })
            }}></button>
            <br/>
            <br/>
                {(passwordState.inputValueClicked) ? (<div><p>length is at least 9 characters or longer: {(passwordState.lengthCheck)? "passed": "failed"}</p>
                    <br/>
                    <p> At least one lower case alphabetical character: {(passwordState.lowerCaseCheck) ? "passed": "failed"}</p>
                    <br/>
                    <p>At least one upper case alphabetical character: {(passwordState.capitalCheck) ? "passed": "failed"}</p>
                    <br/>
                    <p>at least one of these special characters (?!@_-*~): {(passwordState.specialCharacterCheck) ? "passed":"failed"}</p>
                    <br/>
                    <p> at least one numerical number: {(passwordState.numberCheck)?"passed" :"failed"}</p></div>) :""}  
        </>
    )
}

export default SingUpVerification;