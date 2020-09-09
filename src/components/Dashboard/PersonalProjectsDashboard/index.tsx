import React, {FC, useEffect, useState } from 'react';
import $ from "jquery";
import 'jqueryui';
import { isEqual } from 'lodash';

import { RouteComponentProps, withRouter } from 'react-router-dom';

// components
import SignOutComponent from '../../../HigherOrderComponents/SignOutComponent';

import PersonalProjectListDashboard from './personal_project/PersonalProjectListDashboard/index'

import AddPersonalProjectDashboard from './personal_project/PersonalProjectListDashboard/AddPersonalProjectDashboard/index'

import {getToken} from '../../../utils/authentication' 

const PersonalDashboard:FC<RouteComponentProps> = () => {
    const [userState, setUserState] = useState<any>({ profileInformation: {}, personalProjects:[], displayAddition:false});

    const getUserInformation = async () => {
        let token = sessionStorage.getItem('Authorization');
        try {
            let apiCall = await fetch(`${process.env.REACT_APP_API_URL}/user/`, {
                method: 'get',
                mode: 'cors',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token ? `Bearer ${token}`: ''
                } 
        })
        let user = await apiCall.json();

        setUserState({
            ...userState,
            ["profileInformation"]:{...user}
        })

        } catch {
            console.log("failed to get personal user information.....")
            token = "";
        }

        try {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/personal_projects/`, {
                method: 'get',
                mode: 'cors',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token ? `Bearer ${token}`: ''
                    }
            })
             let personal_projects = await response.json();
                if (!isEqual(userState.personalProjects, personal_projects)) {
                    if (personal_projects.length !== 0) {
                        setUserState({
                            ...userState,
                            ["personalProjects"]: [ ...personal_projects],
                            ["displayAddition"]: false
                        })
                    }
                }
            token = "";
            
        } catch {
            token = ""
        }
    } 

    const addOne = async (input:any) => {
        let token = getToken()

        try {
            let addNewProjectResponse = await fetch(`${process.env.REACT_APP_API_URL}/personal_projects`, {
                method: 'post',
                mode: 'cors',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token ? `Bearer ${token}`: ''
                },
                body: JSON.stringify(input)
            })
            getUserInformation();
        } catch {
            console.log("request failed")
        }   

    }

    useEffect(()=>{
        $('.sortAble').sortable({
            revert: true
        });
        getUserInformation();
    },[userState.personalProjects,userState.personalProjects])
    return (
        <React.Fragment>
            <div>
    <div className="profileDashBoardCardContainer"><p>username: {userState.profileInformation.username} {userState.profileInformation.firstname}</p></div>
            </div>
            <div className="sortAble">
                Dashboard
                <button onClick={()=>{setUserState({
                    ...userState,
                    ["displayAddition"]: !userState.displayAddition
                })}}>Add new Personal Project</button>
                {(userState.displayAddition) ? <AddPersonalProjectDashboard addOne={addOne}/>:""}
                <PersonalProjectListDashboard personalProjects={userState.personalProjects} />
                <div className="groupProjectsCardContainer"><p>Group Projects |under construction|</p></div>
                <SignOutComponent/>
            </div>
        </React.Fragment>
    )
}

export default withRouter(PersonalDashboard);