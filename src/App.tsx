import React, { FC, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch,RouteComponentProps } from 'react-router-dom'

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import PersonalDashboard from './components/Dashboard/PersonalProjectsDashboard/index';
import Login from './components/Login/index';
import SignUp from './components/Signup/index';
import AuthenticatedRoute from './HigherOrderComponents/AuthenticatedRoute';

// one instance of all the stores

const App: FC = () => {
  
  return (
    <BrowserRouter>
        <div>
          <Switch>      
            <Route exact path ='/signup' component={SignUp}/>
            <Route path = '/login' component={Login}/>
            <AuthenticatedRoute path={'/'} component = {PersonalDashboard} />
            
          </Switch>
        </div>
    </BrowserRouter>
  )

}

export default App;
