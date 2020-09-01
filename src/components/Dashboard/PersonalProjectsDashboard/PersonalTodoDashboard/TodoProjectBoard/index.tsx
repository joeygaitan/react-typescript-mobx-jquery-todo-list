import React, { FC, useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { getToken } from '../../../../../utils/authentication'


const TodoProjectBoard : FC<any> = (props:any) => {
    let location = useLocation()

    const getCurrentBoard = async () => {
        let token = getToken();
        if (token) {
            try {
                let getBoardresponse = await fetch(`${process.env.REACT_APP_API_URL}/todo/${location.pathname}`, {
        
                })
            } catch {
                console.log("failed to get Single Board response")
            }

        } else {
            return
        }
    }
    
    return (
        <div>
            
        </div>
    )
}

export default TodoProjectBoard;