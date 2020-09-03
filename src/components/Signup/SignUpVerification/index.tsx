import React, { FC, useState, useEffect } from 'react';

import { SignUpState } from '../index'

import filter from '../../../utils/inputValidation'

interface SignUpInputProps {
    state:SignUpState,
    changeState: (state:SignUpState) => void
}

const SingUpVerification:FC<SignUpInputProps> = ({state, changeState}:SignUpInputProps) => {

    const [passwordState, setPasswordState] = useState({ capitalCheck:false, lowerCaseCheck:false, numberCheck:false, specialCharacterCheck:false, inputValueClicked:false})
    // ?!@_-*~

    return (
       <div></div>
    )
}

export default SingUpVerification;