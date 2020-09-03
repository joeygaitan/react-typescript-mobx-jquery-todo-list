import React, { FC, useState, useEffect } from 'react';

import { isEqual } from 'lodash';

import { RouteComponentProps } from 'react-router-dom'


type RouteParams = {
    id: string; // must be type string since route params
}

const PersonalProjectDashboard : FC<RouteComponentProps<RouteParams>> = (props) => {
    const [state, setState] = useState({userInformation:{}, listBoards:[]})
    
    const getProjectInformation = async () => {
        const id = props.match.params.id
        let token = sessionStorage.getItem('Authorization');
        try {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/personal_projects/${id}`, {
                method: 'get',
                mode: 'cors',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token ? `Bearer ${token}`: ''
                    }
            })
            let personal_project = await response.json();    
            setState({
                ...state,
                ["userInformation"]: { ...personal_project}
            })
            token = "";
        } catch {
            token = ""
        }
    }

    useEffect(()=>{
        getProjectInformation()
    }, [state.userInformation])
    
    return (
        <>
        hello
        <header></header>
        </>
    )
}

export default PersonalProjectDashboard;