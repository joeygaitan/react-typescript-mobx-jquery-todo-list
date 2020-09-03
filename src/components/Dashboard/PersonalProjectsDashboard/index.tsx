import React, {FC, useEffect, useState } from 'react';
import $ from "jquery";
import 'jqueryui';
import { isEqual } from 'lodash';

// components
import SignOutComponent from '../../../HigherOrderComponents/SignOutComponent';

import PersonalProjectListDashboad from './personal_project/PersonalProjectListDashboard/index'
import { profile } from 'console';

interface PersonalUserRequest {
    username: string;
    firstname: string;
    lastname: string;
    gender: string;
    bio: string;
    email:string;
    id:number;
}

const PersonalDashboard:FC = () => {
    // let intialUserProfile:PersonalUserRequest = {username:"",firstname:"", lastname:"",gender:"",bio:"",email:"",id:0}
    // let intialTodo={id:0, header:""}
    const [userState, setUserState] = useState<any>({ profileInformation: {}, personalProjects:[]});

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
                            ["personalProjects"]: [ ...personal_projects]
                        })
                    }
                }
            token = "";
        } catch {
            token = ""
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
                <PersonalProjectListDashboad personalProjects={userState.personalProjects}/>
                <div className="groupProjectsCardContainer"><p>Group Projects</p></div>
                <SignOutComponent/>
            </div>
        </React.Fragment>
    )
}

export default PersonalDashboard;