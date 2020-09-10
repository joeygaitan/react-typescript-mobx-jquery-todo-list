import React, { FC, useState, useEffect } from 'react';

import { isEqual } from 'lodash';

import { RouteComponentProps, match, useLocation, withRouter } from 'react-router-dom'
import { useLocalStore } from 'mobx-react';

const PersonalProjectDashboard : FC = (props) => {
    let location = useLocation() 
    const [state, setState] = useState({userInformation:{id:0}, listBoards:[], displayListBoards:""})
    console.log(location.pathname)

    const getProjectInformation = async () => {
        const id = location.pathname
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
    }, [state.userInformation.id])
    console.log("here", state.userInformation)
    return (
        <>
        
        </>
    )
}

export default withRouter(PersonalProjectDashboard);