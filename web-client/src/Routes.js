import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Landing} from "./components/Landing";
import {Users} from "./components/Users";
import {Dogs} from "./components/Dogs";
import {User} from "./components/User";
import {Dog} from "./components/Dog";
import {Signup} from "./components/Signup";
import {Login} from "./components/Login";
import {AuthenticatedRoute} from "./hoc/AuthenticatedRoute";
import {AdminRoute} from "./hoc/AdminRoute";
import {Breeds} from "./components/Breed";

export const Routes = () =>
  <Switch>
    <AuthenticatedRoute exact path="/" component={Landing}/>
    <AdminRoute exact path="/users" component={Users}/>
    <AuthenticatedRoute path="/users/:id" component={User}/>
    <AuthenticatedRoute path="/dogs" component={Dogs}/>
    <AuthenticatedRoute path="/breeds" component={Breeds}/>
    <AuthenticatedRoute path="/dogs/:id" component={Dog}/>
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
  </Switch>;