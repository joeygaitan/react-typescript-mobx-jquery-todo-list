import React, { FC, useEffect, useState } from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom'; 

//authentication
import { tokenCheck } from '../utils/authentication';

interface AuthenticatedProps {
    component: React.ComponentType;
    path: string;
}

interface AppState {
    pending: boolean;
    username: string;
  }

const AuthenticatedRoute : FC<AuthenticatedProps> = (props:AuthenticatedProps) => {
    const [state, setState] = useState<AppState>({pending:true, username:''});

    const loginState = async () => {
      let login = await tokenCheck();
      setState({...login})
    } 
  
    useEffect(()=>{
      loginState();
    },[state.pending, state.username])

    const {
        path,
        component
    } = props;
    console.log("path", path)
    console.log(component.displayName)
    if (state.pending && !state.username) {
        return <div>loading....</div>
    } else if (state.username) {
        return <Route path={path} component={component} />
    } else {
        return <Redirect to='/login'/>
    }
}

//some kind of auth function that checks for user

export default AuthenticatedRoute;