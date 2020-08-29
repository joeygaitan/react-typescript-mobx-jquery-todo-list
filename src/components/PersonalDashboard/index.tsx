import React, {FC, useEffect, useState } from 'react';
import $ from "jquery";
import 'jqueryui';
import { isEqual } from 'lodash';

// components
import SignOutComponent from '../../HigherOrderComponents/SignOutComponent';
import PersonalTodoDashboard from './PersonalTodoDashboard/index';

interface PersonalUserRequest {
    username: string;
    first_name: string;
    last_name: string;
    gender: string;
    bio: string;
    email:string;
    id:number;
}

interface IntialPersonalTodo {
    id?:number;
    header:string;
}

const PersonalDashboard:FC = () => {
    let intialUserProfile:PersonalUserRequest = {username:"",first_name:"", last_name:"",gender:"",bio:"",email:"",id:0}
    let intialTodo={id:0, header:""}
    const [userState, setUserState] = useState({ profileInformation: {...intialUserProfile}, personalTodosCardContainer:[{...intialTodo}]});

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
            let response = await fetch(`${process.env.REACT_APP_API_URL}/personal_todos/dash/`, {
                method: 'get',
                mode: 'cors',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token ? `Bearer ${token}`: ''
                    }
            })
             let personal_todos = await response.json();
                if (!isEqual(userState.personalTodosCardContainer, personal_todos)) {
                    if (personal_todos.length != 0) {
                        setUserState({
                            ...userState,
                            ["personalTodosCardContainer"]: [ ...personal_todos]
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
    },[userState.profileInformation.id, userState.personalTodosCardContainer[0].id])

    return (
        <React.Fragment>
            <div>
            <div className="profileDashBoardCardContainer"><p>username: {userState.profileInformation.username}</p></div>
            </div>
            <div className="sortAble">
                Dashboard
                <PersonalTodoDashboard personalTodosArray={userState.personalTodosCardContainer} />
                <div className="personalNotesCardContainer"><p>Notes</p></div>
                <div className="groupProjectsCardContainer"><p>Group Projects</p></div>
                <SignOutComponent/>
            </div>
        </React.Fragment>
    )
}

export default PersonalDashboard;